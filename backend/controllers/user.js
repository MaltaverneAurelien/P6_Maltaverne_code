const bcrypt = require('bcrypt');
const User = require('../models/User');
// génère un token
const jwt = require('jsonwebtoken');

// enregistre un compte
exports.signup = (req, res, next) => {
    // crypte le mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // création de l'utilisation avec email + mot de passe
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // enregistre le nouveau utilisateur
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
// se connecter au compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // renvoi un message d'erreur si l'utilisateur n'existe pas
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur non trouvé !'});
            }
            // compare le mot de passe entré par l'utilisateur avec celui crypté
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ error : 'Mot de passe incorrect !'});
                    }
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};