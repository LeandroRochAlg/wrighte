import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import "../styles/UserUpdate.css";

const UserUpdate: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }else{
            setName(localStorage.getItem('username') || '');
            setEmail(localStorage.getItem('email') || '');
        }
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Usuário não autenticado');
            return;
        }

        try {
            const response = await api.put(
                '/users/update-profile',
                { name, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('Perfil atualizado com sucesso');
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                navigate('/login');
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil');
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Usuário não autenticado');
            return;
        }

        const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement).value;
        const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (newPassword !== confirmPassword) {
            alert('A nova senha e a confirmação não coincidem');
            return;
        }

        try {
            const response = await api.put(
                '/users/update-password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('Senha atualizada com sucesso');
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                navigate('/login');
            }
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            alert('Erro ao atualizar senha');
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Atualizar Perfil</h2>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Atualizar</button>
                </form>
            </div>
    
            <div className="form-box">
                <h2>Alterar Senha</h2>
                <form onSubmit={handlePasswordUpdate}>
                    <div>
                        <label>Senha atual:</label>
                        <input type="password" id="currentPassword" />
                    </div>
                    <div>
                        <label>Nova senha:</label>
                        <input type="password" id="newPassword" />
                    </div>
                    <div>
                        <label>Confirmar nova senha:</label>
                        <input type="password" id="confirmPassword" />
                    </div>
                    <button type="submit">Atualizar senha</button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;