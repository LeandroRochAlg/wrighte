const TermsPage = () => {
    return (
        document.title = "Termos de Uso • WrightE",
        <div className="w-[700px] mx-auto mt-5">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Termos de Uso</h1>
            <p className="text-lg text-gray-800 leading-7 mb-4">
                Bem-vindo ao <span className="font-bold">WrightE</span>. Ao utilizar nossa plataforma, você concorda com os seguintes termos de uso:
            </p>
            <ul className="list-disc ml-8 mt-2 text-gray-800">
                <li>Os textos criados pelos usuários são de sua inteira responsabilidade.</li>
                <li>É proibido publicar conteúdo ofensivo, discriminatório ou ilegal.</li>
                <li>Respeite os direitos autorais e a privacidade dos demais usuários.</li>
                <li>A plataforma pode ser atualizada a qualquer momento, com ou sem aviso prévio.</li>
                <li>O WrightE não se responsabiliza por perdas de dados causadas por falhas externas.</li>
            </ul>
            <p className="text-lg text-gray-800 mt-5">
                Para mais informações, entre em contato com nossa equipe de suporte.
            </p>
        </div>
    );
};

export default TermsPage;