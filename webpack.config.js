/*Added by ROHAN*/
/*Please don't delete or modifi this file*/
const JavaScriptObfuscator = require('webpack-obfuscator');
module.exports = (config, options) => {
  if (config.mode === 'production') {
    config.plugins.push(new JavaScriptObfuscator({
      disableConsoleOutput: true,
      numbersToExpressions:true,
      transformObjectKeys:true,
    }, ['exclude_bundle.js']));
  }
}