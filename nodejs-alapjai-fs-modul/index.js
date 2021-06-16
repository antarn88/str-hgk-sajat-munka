const { mkdir, writeFile } = require('fs').promises;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const { createGzip } = require('zlib');
const path = require('path');

let newFileName = '';

const createFileStructure = async () => {
  await mkdir('controllers');
  await mkdir('routers');
  await mkdir('views');
  await writeFile('./controllers/site.controller.js', '');
  await writeFile('./routers/site.router.js', '');
  await writeFile('./views/index.html', '');
  await writeFile('./app.js', '');
};

const ready = () => {
  const packageName = `${newFileName}.gz`;

  fs.unlink(newFileName, (error) => {
    if (error) throw error;
  });

  fs.unlink(packageName, (error) => {
    if (error) throw error;
  });
};

const compressFile = (filename) => {
  const compress = createGzip();
  const input = fs.createReadStream(filename);
  const output = fs.createWriteStream(`${filename}.gz`);

  input.pipe(compress).pipe(output);
  ready();
};

const filePacker = (filepath) => {
  newFileName = `${path.basename(filepath, path.extname(filepath))}.bak`;

  const readableStream = fs.createReadStream(filepath, {
    encoding: 'utf-8',
    highWaterMark: 10,
  });

  const writeableStream = fs.createWriteStream(`./${newFileName}`);

  readableStream.pipe(writeableStream);
  readableStream.on('end', () => compressFile(newFileName));
};

const init = () => {
  createFileStructure();
  filePacker('./text.txt');
};

init();
