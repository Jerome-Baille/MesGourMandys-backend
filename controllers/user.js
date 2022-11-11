const bcrypt = require('bcrypt'); // Encrypts the password sent to the database
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator'); // A library to simplify the rules of password validation, by taking away all the repeated parts and by providing a readable and maintainable API to use
const emailValidator = require("email-validator"); // Makes sure that the email address is valid
const User = require('../models/User');


// Create a schema for the passwords
var schemaPassword = new passwordValidator();

// Add properties to it
schemaPassword
.is().min(8)                    // Minimum length 8
.is().max(100)                  // Maximum length 100
.has().uppercase()              // Must have uppercase letters
.has().lowercase()              // Must have lowercase letters
.has().digits(1)                // Must have at least 1 digit


exports.register = (req, res, next) => {
  if(emailValidator.validate(req.body.email)) {
    if (schemaPassword.validate(req.body.password)) {
      bcrypt.hash(req.body.password, 10) // The password is encrypted with 10 salt rounds
        .then(hash => {
          const user = new User({
            ...req.body,
            password: hash,
            isAdmin: false
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
      return res.status(401).json({message : `Le mot de passe doit contenir au moins 8 caractères et être composé d'au moins 1 majuscule, 1 minuscule et 1 chiffre.`});
    }
  } else {
    return res.status(401).json({message : `L'adresse e-mail saisie est invalide. Veuillez entrer une adresse e-mail valide.`});
  }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error : `Nous n'avons pas trouvé de compte correspondant à l'adresse e-mail renseignée.` });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error : `Le mot de passe renseigné est incorrect.` });
            }
            res.status(200).json({
              userId: user._id,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.userProfile = (req, res, next) => {
    // decode token to get userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;

    User.findOne({ _id: userId })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};