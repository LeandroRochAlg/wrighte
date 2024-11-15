import React, { useState } from 'react';
import TitleComponent from '../components/auth/TitleComponent';
import InputComponent from '../components/auth/InputComponent';
import SubmitButtonComponent from '../components/auth/SubmitButtonComponent';
import api from '../lib/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username); // Armazena o username
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            alert('Um erro ocorreu, tente novamente.');
        }
    };

    return (document.title = "Entrar • WrightE",
        <div className="flex flex-col my-5">
            <form onSubmit={handleSubmit} className='mx-auto p-5 rounded-xl border border-blue-500 flex flex-col'>
                <TitleComponent title="Login" />
                <InputComponent label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <InputComponent label="Senha:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <SubmitButtonComponent title="Login" />
                <div className="mt-4 text-center">
                    <p className='text-sm'>Não possui uma conta? <a href="/register" className="text-blue-500 hover:text-blue-200 underline">Registre-se aqui</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;