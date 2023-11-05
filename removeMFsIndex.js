const fs = require('fs');
const path = require('path');

const startDir = 'dist';

function removeIndexFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) throw err;

                if (stats.isDirectory()) {
                    removeIndexFiles(filePath);
                } else if (file === 'index.html' && dir !== startDir) {
                    fs.unlink(filePath, err => {
                        if (err) throw err;
                        console.log(`Removed ${filePath}`);
                    });
                }
            });
        });
    });
}

removeIndexFiles(startDir);
