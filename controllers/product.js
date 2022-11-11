const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Produit ajouté à la base de données!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
    Product.findOne({ id: req.params.id })
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }));
};

exports.getProductBySku = (req, res, next) => {
    Product.findOne({ sku: req.params.sku })
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    Product.updateOne({ id: req.body.id }, { ...req.body})
        .then(() => res.status(200).json({ message: 'Product modified!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Product deleted!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllProducts = (req, res, next) => {
    var query = req.query;

    Product.find(query)
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
};