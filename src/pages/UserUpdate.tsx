import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api'; // Axios configurado com baseURL

const UserUpdate: React.FC = () => {
    const [id, setId] = useState(''); // ID do usuário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null); // Mensagens de feedback
    const navigate = useNavigate();

    useEffect(() => {
        // Simula a recuperação de dados do usuário (localStorage ou API)
        const currentUser = {
            id: localStorage.getItem('id') || '', // Recupera o ID do localStorage
            name: localStorage.getItem('username') || '',
            email: localStorage.getItem('email') || ''
        };
        setId(currentUser.id);
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            setMessage('Nome e email não podem estar vazios.');
            return;
        }

        try {
            await api.put('/update-profile', { id, name, email });
            setMessage('Perfil atualizado com sucesso!');
            localStorage.setItem('username', name);
            localStorage.setItem('email', email);
        } catch (error) {
            setMessage('Erro ao atualizar o perfil. Tente novamente.');
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('Todos os campos de senha devem ser preenchidos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Nova senha e confirmação não coincidem.');
            return;
        }

        try {
            await api.put('/update-password', { id, currentPassword, newPassword });
            setMessage('Senha atualizada com sucesso! Faça login novamente.');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
        } catch (error) {
            setMessage('Erro ao atualizar a senha. Verifique sua senha atual.');
            console.error('Error updating password:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Atualizar Perfil</h2>
            {message && <div style={{ color: 'red', marginBottom: '10px' }}>{message}</div>}
            <form onSubmit={handleProfileUpdate} style={{ marginBottom: '20px' }}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Salvar
                </button>
            </form>

            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordUpdate}>
                <div>
                    <label>Senha Atual:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Nova Senha:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default UserUpdate;