const fs = require('fs');
const logger = fs.createWriteStream('markdown/examples.md', {
  flags: 'w', // old data will not be preserved
});

logger.write(`# Examples/Downloads\n`); // append string to your file

fs.readdir('public/examples/', (err, examples) => {
  examples.forEach((folder) => {
    if (folder != '.DS_Store') {
      listFolder(folder);
    }
  });
});

function listFolder(folder) {
  logger.write(
    `- [Example: **"${folder}"**](/examples/${folder}), 
    <br>[→ Download example as ZIP **"${folder}"**](/downloads/${folder}.zip)\n`
  ); // append string to your file
}
