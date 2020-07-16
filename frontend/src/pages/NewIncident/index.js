import React, { useState } from 'react';
import './styles.css'
import { Link , useHistory} from 'react-router-dom';
import Logoimg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'


export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescriptiion] = useState('');
    const [value, setValue] = useState('');
    const ongID = localStorage.getItem('ongID');
    const history = useHistory();

    function HandleNewIncident(event) {
        event.preventDefault();

        if(title===''||description===''||value===''){
            return alert('Favor preencher todos os campos.');
        }

        const data = {
            title,
            description,
            value
        }
            try{
                api.post('incidents', data, {
                    headers: {
                        autoriza: ongID
                    }
                })
                alert('Cadastro realizado com suceso.');
                history.push('/profile');
            }
            catch(err){
                alert('Erro ao cadastrar caso.')
            }
           
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={Logoimg} alt="Logo-heroes" />
                    <h1>Cadastro novo caso</h1>
                    <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-Link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                   Voltar para Home</Link>
                </section>
                <form onSubmit={HandleNewIncident} >
                    <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Título do caso" />
                    <textarea value={description} onChange={(event) => setDescriptiion(event.target.value)} placeholder="Descrição" />
                    <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Valor em reais" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}