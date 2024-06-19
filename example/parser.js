// parser.js
const fs = require("fs");
const path = require("path");

const directoryPath = ".";
const outputDir = "generated";

// Remove the output directory if it exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

const EXPORT_STATEMENT = 'export { default as $1 } from "./$2"';

// Create the output director
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

  const exports = [];

  async function parser() {
    try {
      jsFiles.forEach(async (file) => {
        const inputFile = path.join(directoryPath, file);
        const fileName = file.replace(".js", "");
        const outputFile = path.join(outputDir, file.replace(".js", ".txt"));

        if (fileName == "index") {
          console.log("======Ignoring Index file=======");
          return;
        }

        const input = fs.readFileSync(inputFile, "utf8");
        const fileExport = EXPORT_STATEMENT.replace("$1", fileName).replace(
          "$2",
          outputFile
        );
        exports.push(fileExport);

        fs.writeFileSync(outputFile, input);
      });

      fs.writeFile("./index.js", exports.join("\n"), (err) => {
        if (err) {
          console.error(`Error writing file ${outputFile}:`, err);
          return;
        }
        console.log(`Successfully added exports.`);
      });
    } catch (err) {
      console.error(err);
    }
  }
  parser();
});
