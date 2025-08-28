import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "public/images"; // Source of original images
const outputDir = "public/optimized"; // Destination for optimized images

async function optimizeImages() {
  console.log("Starting image optimization...");
  try {
    // Removed redundant check for 'sharp' as it's a required dependency.

    if (!fs.existsSync(inputDir)) {
      console.log(`Input directory not found: ${inputDir}. Skipping optimization.`);
      return; // Exit if no images to process
    }

    if (!fs.existsSync(outputDir)) {
      console.log(`Creating output directory: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    } else {
      console.log(`Output directory already exists: ${outputDir}`);
    }

    const files = fs.readdirSync(inputDir);
    if (files.length === 0) {
      console.log(`No images found in ${inputDir}. Skipping optimization.`);
      return;
    }
    console.log(`Found ${files.length} files in ${inputDir}`);

    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }

      console.log(`🔄 Optimizing: ${file}`);
      try {
        const image = sharp(filePath);

        // Define paths for optimized versions
        const optimizedJpgPath = path.join(outputDir, `${baseName}.jpg`);
        const webpPath = path.join(outputDir, `${baseName}.webp`);
        const avifPath = path.join(outputDir, `${baseName}.avif`);

        // Resize to 1200px width (if larger) and save as JPG in optimized folder
        await image
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 85 }) // Ensure it's saved as JPG with good quality
          .toFile(optimizedJpgPath);
        console.log(`   Resized and saved as JPG to: ${optimizedJpgPath}`);

        // Convert to WebP from the resized JPG
        await sharp(optimizedJpgPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`   Converted to WebP: ${webpPath}`);

        // Convert to AVIF from the resized JPG
        await sharp(optimizedJpgPath)
          .avif({ quality: 70 })
          .toFile(avifPath);
        console.log(`   Converted to AVIF: ${avifPath}`);

      } catch (fileError) {
        console.error(`❌ Error optimizing ${file}:`, fileError);
        // Don't re-throw here, allow other images to process, but log the error
      }
    }

    // COMMENTED OUT: Do NOT delete the original input directory for now.
    // This allows for a fallback if optimized images are not found or fail to load.
    // console.log(`Cleaning up original images directory: ${inputDir}`);
    // fs.rmSync(inputDir, { recursive: true, force: true });
    // console.log(`Original images directory ${inputDir} removed.`);

    console.log("✅ All images optimized!");
  } catch (mainError) {
    console.error("💥 An error occurred during image optimization:", mainError);
    process.exit(1);
  }
}

optimizeImages().catch(error => {
  console.error("Unhandled error in optimizeImages:", error);
  process.exit(1);
});