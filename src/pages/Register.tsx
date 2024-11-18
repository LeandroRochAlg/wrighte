import React, { useState } from 'react';
import TitleComponent from '../components/auth/TitleComponent';
import InputComponent from '../components/auth/InputComponent';
import SubmitButtonComponent from '../components/auth/SubmitButtonComponent';
import api from '../lib/api';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        api.post('/users/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        .then(response => {
            console.log("Registro bem-sucedido:", response.data);
            window.location.href = "/login";
        })
        .catch(error => {
            console.error("Erro no registro:", error);
            alert("Um erro ocorreu, tente novamente.");
        });
    };

    return (document.title = "Registrar • WrightE",
        <div className="flex flex-col my-5">
            <form onSubmit={handleSubmit} className='mx-auto border border-blue-500 p-5 rounded-xl flex flex-col'>
                <TitleComponent title="Registro" />
                <InputComponent label="Nome de Usuário:" type="text" name="username" value={formData.username} onChange={handleChange} required />
                <InputComponent label="Email:" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <InputComponent label="Senha:" type="password" name="password" value={formData.password} onChange={handleChange} required />
                <InputComponent label="Confirmar Senha:" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                <SubmitButtonComponent title="Registrar" />
                <div className="mt-4 text-center">
                    <p className='text-sm'>Já possui uma conta? <a href="/login" className="text-blue-500 hover:text-blue-200 underline">Faça login aqui</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;