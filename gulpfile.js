const { join } = require('path');
const pathToPackage  = join(process.env.INIT_CWD, 'package.json');
const { gulpConfig } = require(pathToPackage);

console.log(gulpConfig);