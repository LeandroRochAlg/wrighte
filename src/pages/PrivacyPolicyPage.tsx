const PrivacyPolicyPage = () => {
    return (
        document.title = "Política de Privacidade • WrightE",
        <div className="w-[700px] mx-auto mt-5">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Política de Privacidade</h1>
            <p className="text-lg text-gray-800 leading-7 mb-4">
                A privacidade dos nossos usuários é uma prioridade para o <span className="font-bold">WrightE</span>. 
                Aqui explicamos como coletamos, utilizamos e protegemos suas informações.
            </p>
            <h2 className="text-2xl font-bold text-blue-50 mt-5">Informações Coletadas</h2>
            <ul className="list-disc ml-8 mt-2 text-gray-800">
                <li>Dados de cadastro: nome, e-mail e outras informações fornecidas voluntariamente.</li>
                <li>Dados de navegação: endereço IP, tipo de navegador, e páginas acessadas.</li>
            </ul>
            <h2 className="text-2xl font-bold text-blue-50 mt-5">Uso das Informações</h2>
            <ul className="list-disc ml-8 mt-2 text-gray-800">
                <li>Personalizar sua experiência na plataforma.</li>
                <li>Garantir a segurança e o bom funcionamento do sistema.</li>
                <li>Entrar em contato em caso de atualizações ou problemas técnicos.</li>
            </ul>
            <h2 className="text-2xl font-bold text-blue-50 mt-5">Proteção de Dados</h2>
            <p className="text-lg text-gray-800 leading-7">
                Adotamos medidas técnicas e organizacionais para proteger suas informações contra acessos não autorizados, 
                perda ou alteração. Entretanto, não podemos garantir segurança absoluta.
            </p>
            <p className="text-lg text-gray-800 mt-5">
                Ao continuar utilizando o WrightE, você concorda com esta política de privacidade.
            </p>
        </div>
    );
};

export default PrivacyPolicyPage;