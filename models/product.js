const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id:             { type: String, required: true },
    image:          { type: String, required: true },
    thumbImage:     { type: String, required: true },
    title:          { type: String, required: true },
    price:          { type: Number, required: true },
    sku:            { type: String, required: true },
    description:    { type: String, required: true },
    allergens:      { type: String, required: true },
    isActive:       { type: Boolean, required: true, default: true },
    popular:        { type: Boolean, required: true, default: false },
    highlight:      { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Product', productSchema);