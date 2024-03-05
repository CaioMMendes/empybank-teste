Empybank teste

## 📌 Sobre

**Empybanck-teste** foi um projeto realizado para teste de avaliação para ingressar na vaga de desenvolvedor full stack na empresa empy bank.

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Backend

- [Typescript](https://www.typescriptlang.org/)
- [Nodejs](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Prisma](https://www.prisma.io/)
- [Tsup](https://tsup.egoist.dev/)
- [Tsx](https://github.com/privatenumber/tsx)
- [Cors](https://github.com/expressjs/cors)
- [Zod](https://zod.dev/)
  
### Frontend

- [Vite (React)](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Number Format](https://github.com/s-yadav/react-number-format)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [Tailwindcss](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Radix](https://www.radix-ui.com/)
- [Shadcn](https://ui.shadcn.com/)

//todo shadcn
  
## Colors

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#00BDFF](https://via.placeholder.com/10/00BDFF?text=+) #00BDFF |
| Layout Body Color | ![#eaedee](https://via.placeholder.com/10/eaedee?text=+) #eaedee |
| Layout Surface | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Content Title Color | ![#121929](https://via.placeholder.com/10/121929?text=+) #121929 |
| Content Base Color | ![#121929A3](https://via.placeholder.com/10/121929A3?text=+) #121929A3 |
| Content Placeholder Color | ![#1219297A](https://via.placeholder.com/10/1219297A?text=+) #1219297A |
| Interactive Secondary Color | ![#1219291F](https://via.placeholder.com/10/1219291F?text=+) #1219291F |
| Interactive Destructive Color | ![#ff4e3a](https://via.placeholder.com/10/ff4e3a?text=+) #ff4e3a |
| Interactive Alt Primary Color | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Button Secondary Color | ![#5e17f5](https://via.placeholder.com/10/5e17f5?text=+) #5e17f5 |
| Neutral White Color | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Overlay Color | ![#121929B8](https://via.placeholder.com/10/121929B8?text=+) #121929B8 |

## ✏ Para iniciar o projeto basta utilizar os seguintes comandos

- Clonar o repositório

    <pre><code>git clone https://github.com/CaioMMendes/empybank-teste</code></pre>

- Acessar a pasta do backend no terminal
    <pre><code>cd backend/</code></pre>

- Instalar as dependências
    <pre><code>npm i</code></pre>

- Criar um arquivo .env na pasta backend com o seguinte código

    ```md
    PORT=3333
    NODE_ENV='development'
    DATABASE_URL='postgresql://docker:docker@localhost:5679/empybank'
    ```

- Iniciar o banco de dados (docker)
    <pre><code>docker-compose up -d</code></pre>

- Executar o migrate
- //todo ver como faz essa parte aqui de gerar as tabelas no banco
    <pre><code>npx prisma generate</code></pre>

- Executar o backend
    <pre><code>npm run dev </code></pre>

- Divir o terminal ou abrir um novo

- Acessar a pasta do frontend no terminal
    <pre><code>cd backend/</code></pre>

- Instalar as dependências
    <pre><code>npm i</code></pre>

- Criar um arquivo .env na pasta backend com o seguinte código

    ```md
    VITE_API_URL=http://localhost:3333
    ```

- Executar o frontend
    <pre><code>npm run dev </code></pre>

- Abir o navegador na url [http://localhost:5173](http://localhost:5173)

> Esta é uma nota usando citação.

como não foram informados se os dados teriam de ser únicos foi adotado o código do cliente como sendo único, o nome,email,telefone do assistente também sendo unicos.
