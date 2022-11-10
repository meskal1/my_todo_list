module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  setupFilesAfterEnv: ['./setupTests.js'],
  testTimeout: 30000,
}
// Обновить старый снапшот на новый
// yarn run jest:integration --updateSnapshot
