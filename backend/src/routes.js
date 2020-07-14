const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileIncidentsController = require('./controllers/ProfileIncidentController');
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.Create)

routes.get('/ongs', OngController.List)
routes.post('/ongs',OngController.Create )

routes.post('/incidents', IncidentsController.Create)
routes.get('/incidents', IncidentsController.List);
routes.get('/incidents/:id', IncidentsController.Obter);
routes.delete('/incidents/:id', IncidentsController.Delete)

routes.get('/profile', ProfileIncidentsController.ListIncident);
module.exports = routes;