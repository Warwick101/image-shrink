const fs = require('fs-extra');

var dir = './dist/src';
var dir2 = './dist/src/assets';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
  fs.mkdirSync(dir2);
}

(async() => {

  const src = './src/assets';
  const copy = './dist/src/assets';

  await fs.remove(copy);
  await fs.copy(src, copy);

})();
