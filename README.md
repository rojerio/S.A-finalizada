# 🌟 **Projeto S.A.**  

O Projeto S.A. foi desenvolvido para solucionar problemas de gerenciamento de hospedagem e reservas na pousada **Quinta do Ypuã**. Com o uso de **React** no front-end e **Node.js** no back-end, oferecemos uma solução completa para otimizar a administração de hospedagens.

---

## 🚀 **Como Iniciar o Projeto**

Siga o passo a passo abaixo para configurar o ambiente:

### 1️⃣ **Configurar o Banco de Dados (PostgreSQL)**

1. **Abra o PGAdmin**  
   No canto superior esquerdo, clique em **Servers**.  
   ![PGAdmin Servers](https://github.com/user-attachments/assets/ca9ed934-5a7c-42e0-bb3d-60700a906b4d)

2. **Insira a senha**  
   Use a senha criada durante a instalação do PostgreSQL.  

3. **Crie um novo Login/Group Role:**  
   - Clique com o botão direito em **Login/Group Roles** e selecione **Create Login/Group Role**.  
   - Nomeie como `local`.  
   ![Criar Login](https://github.com/user-attachments/assets/7f4b1e4d-542e-46f4-8d5c-76ac167e0a25)
   - Vá na aba **Definition** e configure a senha como `12345`.  
     ![Definir Senha](https://github.com/user-attachments/assets/c0a9830b-0605-45ab-b118-bb85992e574e)
   - Na aba **Privileges**, marque todas as opções.  
     ![Definir Privilégios](https://github.com/user-attachments/assets/ddfcbdc1-2b6b-4f9e-8f12-fb19a17db2e9)
   - Salve.  

4. **Crie um Banco de Dados:**  
   - Clique com o botão direito em **Databases** e selecione **Create Database**.  
   - Nomeie como `hotel`.  
   - Configure o **Owner** como `local`.  
     ![Banco de Dados](https://github.com/user-attachments/assets/afc65923-965b-45d3-975b-3b1d420ffce6)

5. **Execute o Script SQL:**  
   - Clique com o botão direito em `hotel` e selecione **CREATE Script**.  
   - Apague o conteúdo e cole o seguinte código:
     ```sql
     CREATE TABLE clientes (
         id SERIAL PRIMARY KEY,
         nome VARCHAR(100) NOT NULL,
         email VARCHAR(100) NOT NULL,
         telefone VARCHAR(15),
         quarto VARCHAR(10) NOT NULL,
         dataEntrada DATE NOT NULL,
         dataSaida DATE NOT NULL
     );
     
     SELECT * FROM clientes;
     ```
   - O resultado deve ser similar a este:  
     ![Script SQL](https://github.com/user-attachments/assets/73a95db8-490f-44cd-b0ee-ee527ca5255c)

---

### 2️⃣ **Configurar o Back-End**

1. **Abra o projeto no VS Code**  
   Navegue até a pasta do backend no terminal.  

2. **Instale os pacotes necessários**  
   Execute o comando:  
   ```bash
   npm i

3. **Mande rodar o projeto**  
   Execute o comando:  
   ```bash
   node index.js

4. **Caso de ERROR**  
   caso algum erro apareça tente instalar o cors e o express nos componentes no node, que possivelmente não foi instalado com o outro comando.
   Execute o comando:  
   ```bash
   npm i cors, express

  - se estiver tudo funcionando no backend, ele já deve está rodando o nosso banco de dados.
  - O resultado deve ser similar a este:
    ![back](https://github.com/user-attachments/assets/c57528c5-472d-4831-8e7c-b9e7dec50908)

### 3️⃣ **Configurar o Front-End**

1. **Crie um novo terminal no VS code**
   Entre nas pasta `update-S.A-main` e depois na `src`.

2. **Instale os pacotes necessários**  
   Execute o comando:  
   ```bash
   npm i

3. **Rode o Front-End**  
   Execute o comando:  
   ```bash
   npm run dev

  - O resultado deve ser similar a este:
  ![front](https://github.com/user-attachments/assets/e701640c-250f-457e-98c1-5734f560e81a)

### **Projeto rodando !!!**  

Se apareceu essa tela:  
 ![teste](https://github.com/user-attachments/assets/1bedcde8-6021-4e0a-9fde-c156074ad47d)

 Parabéns, você fez tudo certinho !!!
