const cors = require('cors'); // Cross-origin resource sharing
const express = require('express'); 
const path = require('path');
const helmet = require('helmet'); // Permet de protéger certaines vulnérabilités grâce aux en-têtes HTTP

const app = express();

// sécurités
require('dotenv').config()

// configuration d'helmet
app.use(helmet())
app.use(cors())

app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Resource-Policy'); // Protège de certaines demandes d'autres origines telles que <script> ou <img>
  res.removeHeader('Cross-Origin-Embedder-Policy'); // Permet de demander que les sous ressources soient de la même origine
  next();
})

// import des routes
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// MongoDB
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eedfp.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS : système de sécurité qui bloque par défaut les appels http entre les servers
app.use((req, res, next) => {
    // accéder à notre API depuis n'importe où
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajouter les headers sur nos réponses
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // nous permet d'utiliser le CRUD
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;