import React, {useState} from 'react';
import './styles.css';
import api from '../../services/api'
import Logoimg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';



export default function Register (){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');   

    const history = useHistory();

    async function HandleRegister(event){
        event.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('/ongs', data);
            alert(response.data.id)
            history.push('/');
        }
        catch(err){
            alert('Erro: Ong não cadastrada.');
        }
       
    }


    return(
        
        <div className="register-conteiner">
            <div className="content">
                <section>
                    <img src={Logoimg} alt="Logo-heroes"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-Link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já possuo cadastro</Link>
                </section>
                <form onSubmit={HandleRegister} >
                    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome da ONG"/>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="E-mail"/>
                    <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="Whatsapp"/>
                    <div className="input-group">
                        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Cidade"/>
                        <input value={uf} onChange={e=>setUf(e.target.value)} placeholder="UF" style={{width: 80}}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}