const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const file = 'name.json';
const router = express.Router();


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
var jsonParser = bodyParser.json()


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

app.get('/users',(req, res) => {
    const data = fetchData();
        res.json(data);
})

app.post('/users', jsonParser,(req, res) => {
    const users = fetchData();
    const name=req.body;
    console.log(req.body);
    name.forEach(element => {
        users.push(element);
    });
    console.log(name);
    console.log('users:::',users);
  
    writeData(users, (err) => {
        if (err) throw new Error('Something wrong with write');
    
        res.send('New items added');
    })
})

// router('/users')
//     .get((req, res) => {
//         const data = fetchData();
//         res.json(data);
//     })
    // .post((req, res) => {

    // })

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});