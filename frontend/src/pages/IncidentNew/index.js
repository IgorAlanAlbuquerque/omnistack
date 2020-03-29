import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';
import HeroImg from '../../assets/logo.svg';
import './styles.css';

export default function IncidentNew(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data ={
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {
                Authorization: ongId,
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar novo incidente');
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={HeroImg} alt="be the hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>cadastre o caso com detalhes e pau no seu cu</p>
                    <Link className="back-link" to="/Profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descriçao"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="valor necessario"
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}