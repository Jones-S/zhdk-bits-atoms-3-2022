const fs = require('fs');
const archiver = require('archiver');

const dir = 'public/downloads';

if (!fs.existsSync(dir)) {
  console.log('📂 Creating downloads folder...');
  fs.mkdirSync(dir);
}

fs.readdir('public/examples/', (err, files) => {
  files.forEach((file) => {
    if (file != '.DS_Store') {
      console.log('🗄  Archiving folder: ', file);
      archiveFolder(file);
    }
  });
});

function archiveFolder(folder) {
  const fileName = `public/downloads/${folder}.zip`;
  const output = fs.createWriteStream(fileName);

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  output.on('end', function () {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);
  archive.directory(`public/examples/${folder}`, false);
  archive.on('error', function (err) {
    throw err;
  });
  archive.finalize();
}
