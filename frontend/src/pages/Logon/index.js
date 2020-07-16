import React, {useState} from 'react';
import './styles.css'
import heroesimg from '../../assets/heroes.png'
import logoimg from '../../assets/logo.svg'
import { FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

const Logon = () => {

    const [id, setID] = useState('');
    const history = useHistory();
       async function HandleLogin(event){
            event.preventDefault();

            try{
                const response = await api.post('sessions', {id});
                localStorage.setItem('ongID', id);
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile');

            }catch(err){
                alert('falha no login');
            }

        }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoimg} alt="logo-hero" />
                <form onSubmit={HandleLogin} >
                    <h1>Faça seu logon</h1>
                    <input value={id} onChange={event => setID(event.target.value)} placeholder="Sua ID" />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-Link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesimg} alt="heroes" />
        </div>
    )
}

export default Logon;