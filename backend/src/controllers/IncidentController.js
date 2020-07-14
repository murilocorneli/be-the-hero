
const connection = require('../database/connection');
const { List } = require('./OngController');

module.exports = {
    async Create(req, res){
            const {title, description, value} = req.body;
            const ong_id = req.headers.autoriza;
           const [id]=  await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            });
            res.json({id});
    },
    
    async List(req, res){

            const [count] = await connection('incidents').count()

            const { page =1 } = req.query;
            const incidents = await connection('incidents')
            .join('ongs', 'ongs.id','=', 'incidents.ong_id').limit(5).offset((page-1)*5).select(['incidents.*', 'ongs.name', 'ongs.email',
        'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
            res.header('X-Total-Count', count['count(*)']);
            return res.json(incidents);
    },

    async Obter (req, res){
        const id = req.params.id
        const incident = await connection('incidents').select('*').where('id', "=", id);
        return res.json(incident);
    },
  
    async Delete(req, res){
        const id = req.params.id;
        const ong_id = req.headers.autoriza;
        const incident = await connection('incidents').select('ong_id').where('id', '=', id).first();
        if(incident.ong_id!=ong_id){
            return res.status(401).json({error: "operacao nao permitida."});
        }
        await connection('incidents').delete('*').where('id', '=', id);

        return res.status(204).send();
    }
}