const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { tempDir, finalPath, totalChunks } = workerData;

async function mergeChunks() {
  const writeStream = fs.createWriteStream(finalPath);
  const hash = crypto.createHash("sha256");

  try {
    // totalChunks total count (0, 1, 2, 3...)
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(tempDir, `part_${i}`);

      if (!fs.existsSync(chunkPath)) {
        throw new Error(
          `Critical Error: Chunk part_${i} is missing. Merge aborted.`
        );
      }

      const chunkBuffer = fs.readFileSync(chunkPath);

      // Binary data ni direct hash and write 
      hash.update(chunkBuffer);
      writeStream.write(chunkBuffer);

      // Memory free  chunk ni delete 
      fs.unlinkSync(chunkPath);
    }

    writeStream.end();

    writeStream.on("finish", () => {
      parentPort.postMessage({ success: true, hash: hash.digest("hex") });
    });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
}

mergeChunks();
