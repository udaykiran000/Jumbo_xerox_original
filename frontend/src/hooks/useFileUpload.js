import { useState, useRef, useEffect } from "react";
import api from "../services/api";

export const useFileUpload = () => {
  const [progress, setProgress] = useState({});
  const [netHealth, setNetHealth] = useState({
    type: "Checking...",
    color: "text-gray-400",
  });
  const pauseRef = useRef(false);
  const wakeLock = useRef(null);

  useEffect(() => {
    const monitor = () => {
      const conn = navigator.connection || {};
      const type = (conn.effectiveType || "unknown").toUpperCase();
      const speed = conn.downlink || 0;
      let h = { type, color: "text-red-500" };
      if (speed > 5 || type === "WIFI") h.color = "text-green-500";
      else if (speed > 1.5) h.color = "text-yellow-500";
      setNetHealth(h);
    };
    monitor();
    if (navigator.connection) navigator.connection.onchange = monitor;
  }, []);

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator && !wakeLock.current) {
        wakeLock.current = await navigator.wakeLock.request("screen");
      }
    } catch (e) {
      console.warn("WakeLock failed");
    }
  };

  const uploadFile = async (
    file,
    { onAlert, onProgress, onEta, stats, onThresholdWarning },
  ) => {
    await requestWakeLock();

    const startTime = Date.now();
    let thresholdChecked = false;

    let uploadId = localStorage.getItem(`upId_${file.name}`);
    let offset = 0;
    let chunkIndex = 0;

    // --- 1. RESUME HANDSHAKE ---
    if (uploadId) {
      try {
        const { data } = await api.get(`/upload/status?uploadId=${uploadId}`);
        offset = data.uploadedBytes || 0;
        chunkIndex = data.nextIndex || 0;
      } catch (e) {
        uploadId = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      }
    } else {
      uploadId = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      localStorage.setItem(`upId_${file.name}`, uploadId);
    }

    // --- 2. CONFIG ---
    let currentChunkSize = 2 * 1024 * 1024; // Base 2MB
    const MAX_CONCURRENCY = 4;
    let activeUploads = 0;
    let failed = false;
    let internalOffset = offset;
    let lastReportedProgress = 0;

    const uploadChunkTask = async (idx, startByte, size) => {
      if (pauseRef.current || failed) return;
      activeUploads++;

      const chunk = file.slice(startByte, startByte + size);

      // CRITICAL: Append metadata BEFORE the file to avoid Busboy deadlock
      const fd = new FormData();
      fd.append("uploadId", uploadId);
      fd.append("chunkIndex", idx);
      fd.append("chunk", chunk);



      const t0 = performance.now();
      try {
        await api.post("/upload/chunk", fd);

        const duration = (performance.now() - t0) / 1000;

        // Adaptive scaling
        if (duration < 1.2)
          currentChunkSize = Math.min(currentChunkSize * 1.5, 20 * 1024 * 1024);
        else if (duration > 3.5)
          currentChunkSize = Math.max(currentChunkSize / 1.5, 1024 * 1024);

        // Update overall offset accurately
        lastReportedProgress += chunk.size;
        const fileP = Math.round((lastReportedProgress / file.size) * 100);

        setProgress((v) => ({ ...v, [file.name]: fileP }));
        if (onProgress) onProgress(fileP, lastReportedProgress);

        if (onEta && stats) {
          const speed = chunk.size / duration;
          const remaining = file.size - lastReportedProgress;
          const eta = Math.round(remaining / speed);
          onEta(new Date(eta * 1000).toISOString().substr(11, 8));
        }

        activeUploads--;
      } catch (err) {
        failed = true;
        activeUploads--;
        throw err;
      }
    };

    // --- 3. PARALLEL LOOP ---
    lastReportedProgress = offset;

    while (internalOffset < file.size && !failed) {
      if (pauseRef.current)
        return { paused: true, offset: lastReportedProgress };

      // 5-min rule
      const elapsed = (Date.now() - startTime) / 60000;
      if (
        !thresholdChecked &&
        elapsed >= 5 &&
        (lastReportedProgress / file.size) * 100 < 50
      ) {
        thresholdChecked = true;
        pauseRef.current = true;
        if (onThresholdWarning) onThresholdWarning();
        return { paused: true, offset: lastReportedProgress };
      }

      const tasks = [];
      while (activeUploads < MAX_CONCURRENCY && internalOffset < file.size) {
        const size = Math.min(currentChunkSize, file.size - internalOffset);
        tasks.push(uploadChunkTask(chunkIndex, internalOffset, size));
        internalOffset += size;
        chunkIndex++;
      }

      if (tasks.length > 0) {
        try {
          await Promise.all(tasks);
        } catch (e) {
          console.error("Batch failed", e);
          pauseRef.current = true;
          if (onAlert) onAlert("Upload connection lost. Paused.");
          return { paused: true, offset: lastReportedProgress };
        }
      }
    }

    if (failed) return { success: false };

    // --- 4. MERGE ---
    try {
      const res = await api.post("/upload/merge", {
        uploadId,
        fileName: file.name,
        totalChunks: chunkIndex,
      });
      localStorage.removeItem(`upId_${file.name}`);
      return { success: true, url: res.data.url, fileName: file.name };
    } catch (e) {
      return { success: false };
    }
  };

  return { uploadFile, progress, netHealth, pauseRef };
};
