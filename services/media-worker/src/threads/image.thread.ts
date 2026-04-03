import { parentPort, workerData } from "worker_threads";
import sharp from "sharp";
import path from "path";

(async () => {
  const inputPath = workerData.path;
  const fileName = path.basename(inputPath);
  const baseDir = path.dirname(path.dirname(inputPath));
  const outputPath = path.join(
    baseDir,
    "processed",
    fileName + "-processed.webp"
  );
  await sharp(inputPath)
    .resize(300)
    .webp()
    .toFile(outputPath);
  parentPort?.postMessage("done");
})();