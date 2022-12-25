const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const convert = require('heic-convert');

fs.readdir(path.join(__dirname, 'image'), function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(async function (file) {

        if (file.split('.')[1] === 'heic') {

            const inputBuffer = await promisify(fs.readFile)(`./image/${file}`);
            const outputBuffer = await convert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 1
            });

            await promisify(fs.writeFile)(`./converter-image/${file.split('.')[0]}.jpg`, outputBuffer, (test) => {
                console.log(test)
            });
        }

    });

});

//To Run < node index > in terminal

