import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import HeroImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            cidade,
            uf,
        };
        try{
            const response = await api.post('ongs' , data);
            alert(`O seu ID é: ${response.data.id}`);
            history.push('/');
        }catch(err){
           alert('Não foi possivel realizar seu cadastro');
        }
    }
    return(
        <div className="Register-conteiner">
            <div className="content">
                <section>
                    <img src={HeroImg} alt="Be the hero"/>
                    <h1>Cadastro</h1>
                    <p>faça seu cadastro e pau no seu cu</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Realizar Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    type="email" 
                    placeholder="Email da ONG"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="Whatsapp da ONG"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                        placeholder="UF" 
                        style={{width: 80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}