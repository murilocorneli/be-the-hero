import React, { useEffect, useState } from 'react';
import Logoimg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongID')
    const [incidents, setIncidents] = useState([])
    const history = useHistory();


    useEffect(() => {
        api.get('/profile', {
            headers: {
                autoriza: ongID
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongID])

    async function HandleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`, {
                headers: {
                    autoriza: ongID
                }
            })
            setIncidents(incidents.filter(incident=> incident.id!==id));
        }
        catch(erro){
            alert('erro ao deletar o caso.')
        }
    }
    function HandleLogout(){
        localStorage.removeItem('ongID');
        localStorage.removeItem('ongName');
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logoimg} alt="logo be the hero" />
                <span>Bem Vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={HandleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição</strong>
                        <p>{incident.description}</p>
                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={()=>HandleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}



            </ul>
        </div>
    )
}