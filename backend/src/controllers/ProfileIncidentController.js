const connection = require('../database/connection');

module.exports = {

    async ListIncident(req, res){
        const ong_id = req.headers.autoriza;

        const incidents = await connection('incidents').select('*').where('ong_id', ong_id);
        return res.json(incidents);
    }

}