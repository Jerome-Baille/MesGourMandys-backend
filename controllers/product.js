const Product = require('../models/product');
const sharp = require('sharp');
const fs = require('fs');

// Resize image using sharp to achive a thumbnail and reduce bandwidth usage when possible
async function resizeImage(input) {
    try {
      await sharp(input.path)
        .resize({
            width: 200,
            height: 200
        })
        .toFile('images/' +'thumbnails-' + input.filename);
    } catch (error) {
      console.log(error);
    }
  }

exports.createProduct = (req, res, next) => {
    resizeImage(req.file);
    const product = new Product({
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        thumbImage: `${req.protocol}://${req.get('host')}/images/thumbnails-${req.file.filename}`
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Produit ajouté à la base de données!', product }))
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
    if(req.file) {
        Product.findOne({ id: req.params.id })
            .then(product => {
                const filename = product.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    resizeImage(req.file);
                    const productObject = {
                        ...req.body,
                        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        thumbImage: `${req.protocol}://${req.get('host')}/images/thumbnails-${req.file.filename}`
                    };
                    Product.updateOne({ id: req.params.id }, { ...productObject })
                        .then(() => res.status(200).json({ message: 'Produit modifié!'}))
                        .catch(error => res.status(400).json({ error }));
                });
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        Product.updateOne({ id: req.body.id }, { ...req.body})
            .then(() => res.status(200).json({ message: 'Produit modifié !'}))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            const filename = product.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Product.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Produit supprimé!'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllProducts = (req, res, next) => {
    var query = req.query;

    Product.find(query)
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
};