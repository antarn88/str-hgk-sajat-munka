const { mkdir, writeFile } = require('fs').promises;

const createFileStructure = async () => {
  await mkdir('controllers');
  await mkdir('routers');
  await mkdir('views');
  await writeFile('./controllers/site.controller.js', '');
  await writeFile('./routers/site.router.js', '');
  await writeFile('./views/index.html', '');
  await writeFile('./app.js', '');
};

createFileStructure();
