const passwordValidator = require('password-validator');
const { model } = require('../models/Sauce');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(5)            // Minimum 5 caractères
.is().max(10)           // Maximum 10 caractères
.has().uppercase()      // Contient au moins une lettre majuscule
.has().lowercase()      // Contient au moins une lettre minuscule
.has().digits(1)        // Contient au moins 1 chiffre
.has().not().spaces()   // Ne contient pas d'espace

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({error: `Le mot de passe n'est pas assez fort, il manque : ${passwordSchema.validate('req.body.password', { list : true })}`})
    }
}
