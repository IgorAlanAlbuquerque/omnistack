import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import imgHero from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

export default function Profile(){
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);
    async function handleDeleteincident(id){
        try{
            await api.delete(`incidents/${id}`, {
                Authorization: ongId,
            });
            setIncidents(incidents.filter(incidents.id !== id));
        }catch(err){
            alert('Nao foi posseil deletar');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="Profile-content">
            <header>
                <img src={imgHero} alt="be the hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick ={() => handleDeleteincident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}