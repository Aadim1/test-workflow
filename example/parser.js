// parser.js
const fs = require("fs");
const path = require("path");

const directoryPath = ".";
const outputDir = "generated";

// Remove the output directory if it exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

// Create the output directory
fs.mkdirSync(outputDir);

// Read all files in the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter out the parser.js file
  const jsFiles = files.filter(
    (file) => file.endsWith(".js") && file !== "parser.js"
  );

  // Convert each JavaScript file to a text file
  jsFiles.forEach((file) => {
    const inputFile = path.join(directoryPath, file);
    const outputFile = path.join(outputDir, file.replace(".js", ".txt"));

    fs.readFile(inputFile, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${inputFile}:`, err);
        return;
      }

      fs.writeFile(outputFile, data, (err) => {
        if (err) {
          console.error(`Error writing file ${outputFile}:`, err);
          return;
        }
        console.log(`Successfully converted ${inputFile} to ${outputFile}`);
      });
    });
  });
});
