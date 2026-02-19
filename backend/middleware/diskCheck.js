const checkDiskSpace = require("check-disk-space").default;
const path = require("path");

exports.checkStorage = async (req, res, next) => {
  try {
    const diskPath = path.resolve(process.cwd());
    const space = await checkDiskSpace(diskPath);
    const requiredSpace = 1.5 * 1024 * 1024 * 1024; // 1.5GB safe limit
    if (space.free < requiredSpace) {
      return res.status(507).json({
        success: false,
        message: "Server storage full! Admin needs to clear space.",
      });
    }
    next();
  } catch (e) {
    next();
  }
};
