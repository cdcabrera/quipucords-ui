const fs = require('fs');
const path = require('path');

console.log('>>>>>>>>>>>>>>>>>>> WORK');

const updateTsConfig = ({ filePath, addConfiguration, encoding = 'utf8' } = {}) => {
  const currentConfig = require(filePath);
  // const updatedContents = JSON.stringify({ ...currentConfig, ...addConfiguration }, null, 2);



  console.log('>>>>>>>>>>>>>>>>>>>>>>>');
  // console.log(JSON.parse(JSON.stringify(currentConfig)));
  // console.log();
  // console.log(updatedContents);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>');
  // console.log(undefined);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>');

  try {
    // const currentConfig = JSON.parse(fs.readFileSync(filePath, { encoding }));
    const updatedContents = JSON.stringify({ ...currentConfig, ...addConfiguration }, null, 2);
    fs.writeFileSync(filePath, updatedContents, { encoding });
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = ({ RELATIVE_DIRNAME } = {}) => {
  updateTsConfig({
    filePath: path.resolve(process.cwd(), 'tsconfig.json'),
    addConfiguration: {
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx'
      ]
    }
  });

  return {
    ignoreWarnings: [
      {
        message: /mini-css-extract-plugin/
      }
    ]
  };
}
