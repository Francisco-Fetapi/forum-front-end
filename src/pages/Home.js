import React, { useEffect, useState } from 'react'
import UseUsuario from '../hooks/useUsuario';
import { useHistory } from 'react-router-dom'

import { HomeBox, HomeHeader, HomeMain,Text,Button,HomeContent ,HomeButton } from '../styles/components';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined'
import PostCard from '../components/PostCard';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Footer from '../components/Footer';
import ModalEditarPost from '../components/ModalEditarPost';
import UseModal from '../hooks/useModal';

import API from '../API';
import ModalApagarPost from '../components/ModalApagarPost';
import UseTitle from '../hooks/useTitle';
import UseLoading from '../hooks/useLoading';

function Home() {
    const { obterUsuario,apagarUsuario } = UseUsuario();
    const usuario = obterUsuario();
    const { replace,push } = useHistory();
    const {modal,abrirModal,fecharModal} = UseModal();
    const ModalApagar = UseModal();
    const [posts,setPosts] = useState([]);
    const { setarTitulo } = UseTitle();
    const {show,hide} = UseLoading();

    React.useEffect(()=>{
        setarTitulo('Home');
    }); 

    useEffect(()=>{
        if(!usuario.id){ //nao ha sessao!
            replace('/login');
        }
    },[usuario]);

    function irParaPerfil(){
        push('/perfil');
    }
    function irParaPosts(){
        push('/posts/todos');
    }
    function terminarSessao(){
        apagarUsuario();
    }
    async function obter_todos_os_posts(){
        show()
        let res = await API.obter_todos_os_posts(6);//ate 6
        setPosts(res.dados);
        hide();
    }
    console.log('TIPO',process.env.NODE_ENV);
    useEffect(()=>{
        obter_todos_os_posts();
    },[])
    return (
        <>
            <HomeBox>
                <HomeMain elevation={5}>
                    <HomeHeader>
                        <div>
                            <Text fontSize="25px">Seja bem vindo <b>{usuario.nome}</b></Text>
                            <br />
                            <Text fontSize="16px">
                                Este é um site para discussão de diversos assuntos,aqui você pode POSTAR e encontrar POSTs de outros integrantes da plataforma e dessa forma vocês podem interagir por meio de comentários. 
                            </Text>
                            <br />
                            <Button variant="contained" startIcon={<AccountIcon />} color="primary" onClick={irParaPerfil}>Ver perfil</Button>
                            <Button variant="outlined" style={{marginLeft:10,color:'white',borderColor:'currentColor'}} startIcon={<ExitToAppIcon />} color="primary" onClick={terminarSessao}> Logout </Button>
                        </div>
                    </HomeHeader>

                    {posts.length > 0 &&
                        <HomeContent className="pagina_home" container spacing={1}>
                            {posts.map(post=>(
                                <Grid key={post.id_post} item xs={12} md={6}>
                                    <PostCard atualizarPosts={obter_todos_os_posts} post={post} abrirModal={abrirModal} abrirModalApagar={ModalApagar.abrirModal}/>
                                </Grid>
                            ))}
                        </HomeContent>
                    }
                    {
                        posts.length === 0 &&
                        <Box height="70px" display="flex" alignItems="center" justifyContent="center">
                            <Text cor="#888" fontSize="18px" align="center">Carregando publicações...</Text>
                        </Box>
                    }

                    {posts.length > 0 &&
                        <HomeButton>
                            <Button color="primary" onClick={irParaPosts}>Ver todas</Button>
                        </HomeButton>
                    }
                </HomeMain>
            </HomeBox>
            <ModalEditarPost atualizarPosts={obter_todos_os_posts} aberto={modal} fecharModal={fecharModal}/>
            <ModalApagarPost atualizarPosts={obter_todos_os_posts} aberto={ModalApagar.modal} fecharModal={ModalApagar.fecharModal}/>
            <Footer />
        </>
    )
}

export default Home
