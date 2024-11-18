const AboutPage = () => {
    return (
        document.title = "Sobre • WrightE",
        <div className="w-[700px] mx-auto mt-5">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Sobre o WrightE</h1>
            <p className="text-lg text-gray-800 leading-7 mb-4">
                O <span className="font-bold">WrightE</span> é uma plataforma inovadora desenvolvida para escritores e editores. 
                Nosso objetivo é proporcionar um espaço colaborativo e intuitivo para criação, revisão e gestão de textos, 
                otimizando o processo criativo e editorial.
            </p>
            <p className="text-lg text-gray-800 leading-7">
                Criado por entusiastas da escrita, o WrightE permite que escritores desenvolvam suas ideias e colaborem com editores, 
                garantindo uma experiência rica e eficiente.
            </p>
            <h2 className="text-2xl font-bold text-blue-50 mt-5">Funcionalidades</h2>
            <ul className="list-disc ml-8 mt-2 text-gray-800">
                <li>Criação e edição de textos com versões históricas.</li>
                <li>Comentários e sugestões diretamente no conteúdo.</li>
                <li>Compartilhamento e colaboração entre escritores e editores.</li>
                <li>Análise de versões e comparações rápidas.</li>
            </ul>
            <p className="text-lg text-gray-800 mt-5">
                Explore o WrightE e descubra como transformar ideias em palavras com eficiência e colaboração!
            </p>
        </div>
    );
};

export default AboutPage;