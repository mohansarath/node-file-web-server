var express = require('express')
const bodyParser = require('body-parser');

const user = require('./user/user');

var router = express.Router()
var jsonParser = bodyParser.json()


router.get('/users', (req, res) => {
    const data = user.fetchData();
    res.json(data);
});
router.post('/users', jsonParser, (req, res) => {
    const users = user.fetchData();
    const name = req.body;
    console.log(req.body);
    name.forEach(element => {
        users.push(element);
    });
    console.log(name);
    console.log('users:::', users);

    user.writeData(users, (err) => {
        if (err) throw new Error('Something wrong with write');

        res.send('New item added');
    })
});

module.exports = router