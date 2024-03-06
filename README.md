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

## 🎨 Colors

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#00BDFF](https://via.placeholder.com/10/00BDFF?text=+) #00BDFF |
| Layout Body Color | ![#eaedee](https://via.placeholder.com/10/eaedee?text=+) #eaedee |
| Layout Surface | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Content Title Color | ![#121929](https://via.placeholder.com/10/121929?text=+) #121929 |
| Content Base Color | ![#121929A3](https://via.placeholder.com/10/121929A3?text=+) #121929 A3 (64%) |
| Content Placeholder Color | ![#1219297A](https://via.placeholder.com/10/1219297A?text=+) #121929 7A (48%) |
| Interactive Secondary Color | ![#1219291F](https://via.placeholder.com/10/1219291F?text=+) #121929 1F (12%) |
| Interactive Destructive Color | ![#ff4e3a](https://via.placeholder.com/10/ff4e3a?text=+) #ff4e3a |
| Interactive Alt Primary Color | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Button Secondary Color | ![#5e17f5](https://via.placeholder.com/10/5e17f5?text=+) #5e17f5 |
| Neutral White Color | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Overlay Color | ![#121929B8](https://via.placeholder.com/10/121929B8?text=+) #121929 B8 (72%) |

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
    <pre><code>npx prisma migrate deploy</code></pre>

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
    <pre><code>npm run dev</code></pre>

- Abir o navegador na url [http://localhost:5173](http://localhost:5173)

## 💻 Exemplo do projeto

colocar o gif aqui

## 👀 O projeto pode ser vizualizado pelo seguinte link

<https://empybank-teste.vercel.app/>

## 📋 Notas

>O projeto foi feito conforme as dimensões passadas pelo protótipo do figma, com dimensões de 1440x1024, o que faz gerar uma barra de scroll na maioria dos monitores, porém, caso queira usar o projeto sem a barra de scroll é só configurar a tela para essas dimensões.

>Após a inclusão de assistentes, clientes, vinculações e desvinculações, optei por destacar as alterações mais recentes no início da tabela na primeira visualização. Acredito que isso proporciona uma melhor visualização das últimas atualizações. No entanto, após a recarregamento da página, os dados voltam a ser ordenados conforme o padrão.

>Considerando que os dados fornecidos não especificavam quais campos deveriam ser únicos, estabeleci que no model de clientes, o campo 'code' seria único, permitindo variações de maiúsculas e minúsculas. No model de assistentes, defini que os campos 'name', 'email' e 'phone' devem ser únicos, sem permitir variações de maiúsculas e minúsculas, pois são convertidos para minúsculas antes de serem salvos no banco de dados.

>A primeira renderização pode ser mais demorada pois o backend está sendo hospedado no plano gratuito do render, e ele tem um delay para startar o servidor, o projeto pode estar mais lento do que o normal por causa das limitações de CPU e memória que são disponibilizados nesse plano.
