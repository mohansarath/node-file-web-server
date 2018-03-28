const fs = require('fs');

const file = 'name.json';

const fetchData = () => {
    if (!fs.existsSync(file)) {
        throw new Error('File not found');
    }
    return JSON.parse(fs.readFileSync(file).toString());
};

const writeData = (data, cb) => {
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) cb(err);
        cb(null);
    });
};

module.exports ={ fetchData , writeData}