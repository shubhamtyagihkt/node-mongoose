const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: "Aalo Paneer Paratha",
        description: "Famous food in Delhi"
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
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