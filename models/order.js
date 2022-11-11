const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:         { type: String, required: true },
    firstName:      { type: String, required: true },
    lastName:       { type: String, required: true },
    email:          { type: String, required: true },
    phone:          { type: String, required: false },
    address:        { type: String, required: false },
    zipcode:        { type: String, required: false },
    city:           { type: String, required: false },
    products:       { type: Array,  required: true },
    totalQuantity:  { type: Number, required: true },
    totalPrice:     { type: Number, required: true },
    status:         { type: String, required: true, default: 'Commande enregistrée' },
    date:           { type: Date,   required: true, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);