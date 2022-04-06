// import du package http de node
const http = require('http');
// import de l'application
const app = require('./app');
// import du package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// écoute le port par défaut ou le port 3000
const PORT = process.env.PORT || '3000';
// configure le port
app.set('port', PORT);
// création du serveur
const server = http.createServer(app);

// écoute le port
server.listen(PORT, (error) => {
	if (error) {
		console.log('Quelque chose ne va pas', error)
	} else {
		console.log('Le serveur écoute sur le port ' + PORT)
	}
})