const express = require('express') ;
const routes = require('./routes');
const cors = require('cors');

const App = express();
App.use(cors());  
App.use(express.json());
App.use(routes);

App.listen(3333);