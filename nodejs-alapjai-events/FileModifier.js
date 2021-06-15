/* eslint-disable class-methods-use-this */
const { createReadStream } = require('fs');
const { writeFile } = require('fs/promises');
const path = require('path');
const Logger = require('./Logger');

class FileModifier extends Logger {
  constructor() {
    super();
    this.fullContent = '';
    this.newContent = '';
    this.filePath = '';
    this.fileNameWithoutExtension = '';
    this.fileExtension = '';
  }

  getFileInfo() {
    this.fileNameWithoutExtension = `${path.basename(this.filePath, path.extname(this.filePath))}`;
    this.fileExtension = `${path.extname(this.filePath)}`;
  }

  reader(filePath) {
    this.filePath = filePath;
    const readableStream = createReadStream(filePath, {
      encoding: 'utf-8',
      highWaterMark: 10,
    });

    readableStream.on('data', (chunk) => {
      this.fullContent += chunk;
    });

    readableStream.on('end', () => {
      this.modifier();
    });
  }

  modifier() {
    this.getFileInfo();
    const lines = this.fullContent.split('\n');

    lines.map((line) => {
      const words = line.split(' ');
      const newWords = words.map((word) => {
        const firstCharUpperCase = word[0].toUpperCase();
        return `${firstCharUpperCase}${word.slice(1)}`;
      });
      this.newContent += `${newWords.join(' ')}\n`;
      return line;
    });
    this.writer();
  }

  async writer() {
    try {
      await writeFile(`./${this.fileNameWithoutExtension}Copy${this.fileExtension}`, this.newContent);
      this.success('File transform successful.');
    } catch (error) {
      this.error(error.message);
    }
  }
}

module.exports = FileModifier;
