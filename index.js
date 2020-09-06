const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, { useUnifiedTopology: true });

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: "Aalo Paratha",
        description: "Famous food in Delhi"
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.find({});
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close;
    })
    .catch(err => {
        console.log(err);
    });
})
.catch(err => {
    console.log(err);
});