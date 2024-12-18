# WrightE

[PT] Front-end da aplicação web WrightE, conectando escritores amadores a editores e leitores apaixonados.

**[Backend](https://github.com/LeandroRochAlg/wrighte-api)**

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre

WrightE é uma plataforma web que tem como objetivo conectar escritores amadores com editores e leitores apaixonados pela leitura. A aplicação permite que escritores publiquem suas obras, recebam feedback de editores e construam uma base de leitores. 

Além disso, o sistema possui gamificação para incentivar os usuários, como atribuição de pontos de escrita para autores e níveis de experiência para editores.

Acesse o sistema online: **[WrightE](https://wrighte.vercel.app)**.

---

## Funcionalidades

- **Cadastro e autenticação de usuários (escritores e editores).**
- **Publicação de textos com controle de versões.**
- **Feedback detalhado em trechos específicos do texto.**
- **Gamificação:**
  - Escritores acumulam pontos ao criar textos.
  - Editores ganham experiência ao revisar textos e dar feedback.
  - Escritores podem definir o nível mínimo de editores que podem comentar em seus textos.
- **Página inicial personalizada para escritores e editores.**
- **Interface reativa e acessível.**

---

## Tecnologias Utilizadas

- **TypeScript**: Utilizado para tipagem segura e manutenção do código.
- **ReactJS**: Framework principal para construção da interface.
- **Axios**: Para comunicação com a API.
- **TinyMCE**: Editor de texto avançado utilizado na criação e edição de obras.
- **Tailwind CSS**: Framework CSS para estilização e responsividade.

---

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento local:

1. Clone o repositório:
    ```bash
    git clone https://github.com/LeandroRochAlg/wrighte.git
    cd wrighte-frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
    ```
    VITE_API_URL=<URL da API do WrightE>
    VITE_TINYMCE_API_KEY=<Sua API Key do TinyMCE>
    ```

4. Inicie a aplicação:
    ```bash
    npm run dev
    ```

5. Acesse o sistema em: `http://localhost:5173`.

---

## Uso

Após iniciar a aplicação, o WrightE estará disponível em `http://localhost:5173`.  

**Principais páginas:**
- **Página Inicial**: Lista de textos publicados pelos usuários.
- **Editor**: Ferramenta para criar ou editar textos.
- **Perfil do Usuário**: Gerenciamento de conta, como atualização de e-mail e senha.

---

## Screenshots

### Login e registro

![Login](https://github.com/user-attachments/assets/8c8731d4-143e-4b7e-ad71-dd7250aba286)

![Registro](https://github.com/user-attachments/assets/2ba04983-2c69-4636-93e7-39a3d69e7abf)

### Página Inicial
Página inicial para o modo editor

![Modo editor](https://github.com/user-attachments/assets/9f73828d-1d9a-4f70-96ba-c0f327d8f850)

Página inicial para o modo escritor

![Modo escritor](https://github.com/user-attachments/assets/89ba285e-ba38-4bed-bf66-58ada79ec96d)


### Editor de Textos
Crie um novo texto

![Editor de textos](https://github.com/user-attachments/assets/42eeef0e-f953-4e73-852d-f328645b8d31)


### Feedbacks e Comentários
Leia o texto e interaja com o escritor e outros editores

![Comentários](https://github.com/user-attachments/assets/38968252-0fe4-484b-ad71-bb6a7eb23bb6)


### Versionamento
Todas as versões ficam salvas e os comentários são associados à elas

![Versões de um texto](https://github.com/user-attachments/assets/7aa4b595-bf33-4b8a-b92f-51d708cfe11f)


---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para colaborar com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para a sua contribuição:
    ```bash
    git checkout -b feature/sua-contribuicao
    ```
3. Faça suas alterações e commit:
    ```bash
    git commit -m 'Descrição da sua contribuição'
    ```
4. Envie para o seu repositório remoto:
    ```bash
    git push origin feature/sua-contribuicao
    ```
5. Abra um Pull Request no repositório original.

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---
