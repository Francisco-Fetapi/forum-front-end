import React, { useEffect, useState } from 'react'
import UseUsuario from '../hooks/useUsuario';
import { useHistory } from 'react-router-dom'

import { HomeBox,PostsHeader,Form, HomeMain,Text,HomeContent } from '../styles/components';
import PostCard from '../components/PostCard';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Footer from '../components/Footer';
import ModalEditarPost from '../components/ModalEditarPost';
import UseModal from '../hooks/useModal';

import SearchIcon from '@material-ui/icons/Search';

import API from '../API';
import ModalApagarPost from '../components/ModalApagarPost';
import UseTitle from '../hooks/useTitle';
import useLoading from '../hooks/useLoading';

import { Formik } from 'formik';

function Home() {
    const { obterUsuario } = UseUsuario();
    const usuario = obterUsuario();
    const { replace } = useHistory();
    const {modal,abrirModal,fecharModal} = UseModal();
    const ModalApagar = UseModal();
    const [posts,setPosts] = useState([]);
    const { setarTitulo } = UseTitle();
    const { show, hide } = useLoading();
    const [termo,setTermo] = useState('');

    React.useEffect(()=>{
        setarTitulo('Posts');
    }); 

    useEffect(()=>{
        if(!usuario.id){ //nao ha sessao!
            replace('/login');
        }
    },[usuario]);

    async function obter_todos_os_posts(){
        show();
        let res = await API.obter_todos_os_posts('');
        setPosts(res.dados);
        hide();
    }
    useEffect(()=>{
        obter_todos_os_posts();
    },[]);
    
    function filtrar(values){
        setTermo(values.query);
    }
    useEffect(()=>{
        buscar_posts_filtrados();
    },[termo]);
    async function buscar_posts_filtrados(){
        show();
        let res = await API.filtrar_posts(termo);
        console.log(res);
        setPosts(res.dados);
        hide();
    }
    return (
        <>
            <HomeBox>
                <HomeMain elevation={5} className="pagina_home">
                    <PostsHeader>
                        <Grid container justify="center">
                            <Grid item xs={10}>
                            <Formik
                                onSubmit={filtrar}
                                initialValues={{
                                    query:''
                                }}
                                render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                                    <Form autoComplete="off" largura="100%">
                                        <div>
                                            <TextField fullWidth 
                                            type="text"
                                            InputProps ={{
                                                autoFocus:true,
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                        onClick={handleSubmit}
                                                        >
                                                            <SearchIcon style={{color:'rgba(255,255,255,.65)'}}/>
                                                        </IconButton>
                                                    </InputAdornment>
                                            }}
                                            color="secondary"
                                            error={touched.query && !!errors.query} 
                                            helperText={touched.query && errors.query} 
                                            name="query" 
                                            label="O termo de pesquisa" 
                                            InputLabelProps={{shrink:true}} 
                                            value={values.query} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur}/>
                                        </div>
                                    </Form>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </PostsHeader>

                    {posts.length > 0 &&
                        <HomeContent container spacing={1}>
                            {posts.map(post=>(
                                <Grid key={post.id_post} item xs={12} md={6}>
                                    <PostCard atualizarPosts={obter_todos_os_posts} post={post} abrirModal={abrirModal} abrirModalApagar={ModalApagar.abrirModal}/>
                                </Grid>
                            ))}
                        </HomeContent>
                    }
                    {
                        posts.length === 0 && termo !== '' &&
                        <>
                            <Box height="80vh" display="flex" alignItems="center" justifyContent="center">
                                <Text cor="white" style={{textShadow:'1px 1px 1px black'}} fontSize="30px" align="center">Nunhuma publicação encontrada</Text>
                            </Box>
                        </>
                    }
                    {
                        posts.length === 0 && termo === '' &&
                        <>
                            <Box height="80vh" display="flex" alignItems="center" justifyContent="center">
                                <Text cor="#D4D4D4" fontSize="25px" align="center">Carregando publicações...</Text>
                            </Box>
                        </>
                    }
                </HomeMain>
            </HomeBox>
            <ModalEditarPost atualizarPosts={buscar_posts_filtrados} aberto={modal} fecharModal={fecharModal}/>
            <ModalApagarPost atualizarPosts={buscar_posts_filtrados} aberto={ModalApagar.modal} fecharModal={ModalApagar.fecharModal}/>
            <Footer />
        </>
    )
}

export default Home
