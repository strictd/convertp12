#! /usr/bin/env node

const fs = require("fs"),
      args = process.argv || [],
      gp12 = require('google-p12-pem');

let p12path = args[2] || '',
    p12save = args[3] || '';
      
      
if (!p12path) { showUsage(); process.exit(0); }
if (!p12save) { p12save = p12path.substr(0, p12path.lastIndexOf(".")) || p12path; p12save += ".pem"; }


if (fs.existsSync(p12path)) {
  console.log('Using p12 file: ', p12path);
  console.log('Saving pem file: ', p12save);
  gp12(p12path, (err, pem) => {
    if (err || !pem) {
      console.log('Conversion Error!', err);
      process.exit(1);
    } else {
      fs.writeFile(p12save, pem, () => {
        console.log('Saved!');
        process.exit(0);
      })
    }
  });
} else {
  console.log('Using p12 file: ', p12path, 'NOT FOUND!');
  showUsage();
  process.exit(1);
}

function showUsage() {
  console.log('Usage: ');
  console.log('convertp12 service_account.p12 [service_account.pem]')
}
