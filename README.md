# Forum - Front-End

Este projeto foi desenvolvido com `React` e `Material-UI` em _2021_. Na época eu criei o máximo de projetos possiveis para consolidar os conhecimentos em `React` e este foi mais um desses projetos. Ele oferta as seguintes funcionalidades:

1. Sistema de Autenticação.
2. CRUD de postagens
3. CRUD de comentarios.
4. Gerenciamento do perfil do usuário

![1](https://user-images.githubusercontent.com/74926014/176378988-4e9df74e-d343-4a70-893d-484f3eba983a.PNG)
![2](https://user-images.githubusercontent.com/74926014/176379416-4b2421d9-b441-479d-8e9a-4c0b50a2bb05.PNG)


Este projeto consome uma _API_ criada com `PHP`. Siga os passos para rodar o _back-end localmente_ [clicando aqui](https://github.com/Francisco-Fetapi/forum-back-end)

## Como rodar localmente

O Projeto (apenas o front-end) está hospedado em [Forum](https://forumfetapi.vercel.app) - Mesmo na núvem, o projeto consome um back-end local, portanto ele deve ser configurado, siga os passos em [Forum - Back-end](https://github.com/Francisco-Fetapi/forum-back-end) para o configurar.<br />
Para acessar localmente em **ambiente de desenvolvimento** basta realizar as instruções que se seguem:

### Pré-Requisitos

Algumas ferramentas são necessárias para rodar o projeto localmente, tais como:

1. NodeJS
2. Chrome (ou qualquer outro navegador)

### Clonar o repositório

Com o terminal aberto, basta digitar/copiar a linha de código abaixo e clicar _ENTER_.

```
git clone https://github.com/Francisco-Fetapi/forum-front-end.git
```

### Instalar as dependencias

O projeto necessita de certas dependencias para ser executado, para instalá-las, abra o _terminal_, navegue até a pasta do projeto clonado no passo anterior e digite/copie a linha de código abaixo e clique **ENTER**, em seguida, aguarde o preocesso de instalação das ferramentas ser concluido.

```
npm install
```

### Iniciar o projeto
```
npm start
```
Rode a aplicação no modo de desenvolvimento com o comando `npm start`(executar o comando na raiz do projeto).
Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto no navegador.

##

`NOTA1:` Este projeto necessita de um back-end configurado localmente para funcionar devidamente, siga os passos para configurar o back-end [clicando aqui](https://github.com/Francisco-Fetapi/forum-back-end)

`NOTA2`: O back-end não está hospedado pelas seguintes razões:

1. O `heroku`, no modo gratuito tem um limite de projetos, eu já atingi o limite.😅
2. As outras plataformas similares têm politicas que me impossibilitam aderir ao  plano gratuito.(falo sobre ter que colocar os dados bancários ao criar a conta mesmo no plano gratuito, o Microsoft Azure é uma delas🙁)
3. Plataformas para _hospedagem de banco de dados_ também são outro problema, o próprio `heroku` e o `Microsoft Azure` são muito bons para hospedagem de _bancos de dados_, mas por causa da politica do ponto anterior, não consigo aderir a seus planos. (por enquanto😄)
