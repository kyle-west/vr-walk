const https = require('https');
const fs = require('fs');

const { resolve } = require('path')
const pkg = require(resolve('.', 'package.json'))

const installDir = resolve('.', 'src/vendor')
fs.mkdirSync(installDir, { recursive:true })

pkg.client && Object.entries(pkg.client).forEach(([filename, url]) => {
  const file = fs.createWriteStream(resolve(installDir, filename + '.js'));
  https.get(url, res => res.pipe(file));
})