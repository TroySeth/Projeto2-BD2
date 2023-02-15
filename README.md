# **Banco de Dados II - Projeto 3**

## **Motivação**
O presente projeto tem o intuito de colocar em prática os conhecimento acerca de bancos de dados NoSQL.

## **Escopo**
Consiste em uma aplicação web de anotações pessoais

## **Como iniciar**
1. Faça a clonagem ou download desse repositório.
2. Adicione o arquivo .env na pasta raiz com os seguintes parâmetros de configuração:

  ```
    DB_USER = Seu usuário no Atlas
    DB_PASSWORD = Sua senha no Atlas
    DB_NAME = Nome da sua base de dados no MongoDB
    DB_CODE = Código da sua base de dados no MongoDB
    SECRET = Código secreto para ser usado na autenticação e criptografia de senha (crie o seu, recomendamos que ele tenha pelo menos 15 caractes entre letras e números)
    NEO4J_URI = URI servida pelo Neo4j Aura
    NEO4J_USER = Usuário no Neo4j Aura
    NEO4J_PASSWORD = Senha da sua base de dados no Neo4j Aura
  ```
3. Digite ``npm i`` no terminal.
4. Digite ``npm start`` no terminal.
5. Inicie a aplicação na url ``localhost:3000`` no navegador.

## **Como utilizar**
A aplicação tem fácil uso e simples interface.

* Ao acessar a url você verá uma página com botões superiores à direita, **Entrar** e **Cadastrar**.
* Se você já se cadastrou então vá em **Entrar** e passe seus dados. Caso contrário vá em **Cadastrar**, se cadastre e depois entre com seus dados.
* Conectado com o seu usuário, com o botão central **Nova Anotação** adiciona-se um anotação.
* Com a barra central de pesquisa faz-se uma pesquisa entre suas notas.
* Acima de cada anotação adicionada há os ícones de **Editar** e **Excluir** a anotação.

## **Quem são os envolvidos**
[``Daniel Athur``](https://github.com/dxArtur) | [``Guilherme Costa``](https://github.com/TroySeth) | [``Leonardo Mendes``](https://github.com/leomendes18) 
