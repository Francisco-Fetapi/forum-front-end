import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        /* src: url('/fontes/Roboto-Regular.ttf'); */
        src: url('/fontes/Roboto-Regular.ttf');
    }
    @font-face {
        font-family: 'Roboto-thin';
        /* src: url('/fontes/Roboto-Thin.ttf'); */
        src: url('/fontes/Roboto-Thin.ttf');
    }

    *{
        font-family:'Roboto',sans-serif;
    }
    body{
        overflow-x:hidden;
    }

    .likou{
        color:#88acfd !important;
    }

    .acoes-comentarios{
        .MuiIconButton-root{
            padding:9px;
        }
        svg {
            font-size:18px !important;
        }
    }
    .pagina_home{
        /* background:url('/img/fundo1.1.svg'); */
        background:url('/img/fundo1.1.svg');
        background-position:center;
        background-size:cover;
        background-attachment:fixed;
    }
    .pagina_post{
        /* background:url('/img/fundo3.svg'); */
        background:url('/img/fundo3.svg');
        background-position:center;
        background-size:cover;
        background-attachment:fixed;
    }
    .pagina_perfil{
        
    }

`;

export default GlobalStyles;
