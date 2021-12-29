import React,{ useState,useEffect } from 'react'

import { HomeBox, HomeMain,Text,PerfilAvatar,PerfilHeader,PerfilContent,Form,Button } from '../styles/components';
import EditIcon from '@material-ui/icons/Edit'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

// import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MuiButton from '@material-ui/core/Button';
  

// import {TextField} from '../styles/MuiStyled';
import { Formik } from 'formik';
import ModalEditarUsuario from '../components/ModalEditarUsuario';
import ModalAlterarSenha from '../components/ModalAlterarSenha';
import useModal from '../hooks/useModal';
import useUsuario from '../hooks/useUsuario';
import API from '../API';
import ModalAlterarFoto from '../components/ModalAlterarFoto';
import Mensagens from '../hooks/Mensagens';
import { useHistory } from 'react-router-dom';

import {validarPost} from '../hooks/useForm';
import useLoading from '../hooks/useLoading';
import UseTitle from '../hooks/useTitle';

function Perfil() {
    const { show , hide} = useLoading();
    const { push,replace } = useHistory()
    const modalEditar = useModal();
    const modalAlterarSenha = useModal();
    const modalAlterarFoto = useModal();
    const { obterUsuario } = useUsuario();
    const usuario = obterUsuario();
    const {Informar} = Mensagens();
    const [postsRecentes,setPostsRecentes] = useState([]);
    const [comentariosRecentes,setComentariosRecentes] = useState([]);

    const { setarTitulo } = UseTitle();

    if(!usuario.id){ //
        replace('/login');
    }
    
    React.useEffect(()=>{
        setarTitulo(`Perfil - ${usuario.nome}`);
    }); 
    
    
    async function criarPost(values){
        show();
        const {titulo,conteudo} = values;
        let res = await API.criar_post(titulo,conteudo,usuario.id)
        Informar(res);
        buscar_ultimos_posts();
        values.titulo = '';
        values.conteudo = '';
        hide();
    }

    async function buscar_ultimos_posts(){
        show();
        let res = await API.meus_ultimos_posts(usuario.id);
        setPostsRecentes(res.dados);
        hide();
    }
    async function buscar_ultimos_comentarios(){
        show();
        let res = await API.meus_ultimos_comentarios(usuario.id);
        setComentariosRecentes(res.dados);
        hide();
    }

    useEffect(()=>{
        buscar_ultimos_posts();
    },[]);
    useEffect(()=>{
        buscar_ultimos_comentarios();
    },[]);

    return (
        <>
            <HomeBox>
                <HomeMain elevation={5}>
                    <PerfilHeader>
                        <PerfilAvatar>
                           <Avatar src={`${API.API_ROOT}/img/${usuario.foto}`}/>
                        </PerfilAvatar>
                    </PerfilHeader>
                    
                    <PerfilContent className="pagina_perfil">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Text fontSize="35px" style={{fontWeight:800}} align="center" cor="#111">Informações da conta</Text>
                                <List>
                                    <ListItem>
                                        <ListItemText 
                                            primary="Seu nome"
                                            secondary={usuario.nome}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText 
                                            primary="Seu gênero"
                                            secondary={usuario.genero==="M"?'Masculino':'Feminino'}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText 
                                            primary="Seu Número de telefone"
                                            secondary={usuario.num_tel}
                                        />
                                    </ListItem>
                                </List>
                                <ButtonGroup size="small" variant="contained" color="primary">
                                    <MuiButton startIcon={<EditIcon />} onClick={modalEditar.abrirModal}>Editar</MuiButton>
                                    <MuiButton startIcon={<InsertPhotoIcon />} onClick={modalAlterarFoto.abrirModal}>Alterar Foto</MuiButton>
                                    <MuiButton startIcon={<VpnKeyIcon />} onClick={modalAlterarSenha.abrirModal}>Alterar Senha</MuiButton>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Text fontSize="35px" style={{fontWeight:800}} align="center" cor="#111">Faça uma postagem</Text>
                                <Formik
                                    validate={validarPost}
                                    onSubmit={criarPost}
                                    validateOnBlur
                                    initialValues={{
                                        titulo:'',
                                        conteudo:''
                                    }}
                                    render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                                        <Form autoComplete="off" largura="100%">
                                            <div>
                                                <TextField fullWidth inputProps={{maxLength:40}} helperText="Este campo não é obrigatório" type="text" name="titulo" label="O titulo do post" InputLabelProps={{shrink:true}} value={values.titulo} onChange={handleChange} onBlur={handleBlur}/>
                                            </div>
                                            <div>
                                                <TextField fullWidth multiline rows={4} error={touched.conteudo && !!errors.conteudo} helperText={touched.conteudo && errors.conteudo} type="text" name="conteudo" label="O conteudo do post" InputLabelProps={{shrink:true}} value={values.conteudo} onChange={handleChange} onBlur={handleBlur}/>
                                            </div>
                                            <div className="botao">
                                                <Button onClick={handleSubmit} variant="contained" color="primary">Publicar</Button>
                                            </div>
                                        </Form>
                                    )}
                                />
                            </Grid>

                            {postsRecentes.length > 0 &&
                            <Grid item xs={12} md={6} className="posts">
                                <Text fontSize="35px" style={{fontWeight:800}} align="center" cor="#111">Publicações Recentes</Text>
                                    <List>
                                    {postsRecentes.map(post=>(
                                        <ListItem button key={post.id} onClick={()=>push(`/post/${post.id}`)}>
                                            <ListItemText 
                                                primary={post.titulo.trim()===''?".......":post.titulo}
                                                secondary={post.conteudo}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            }
                            {
                            comentariosRecentes.length > 0 &&
                            <Grid item xs={12} md={6} className="posts">
                                <Text fontSize="35px" style={{fontWeight:800}} align="center" cor="#111">Comentários Recentes</Text>
                                <List>
                                    {comentariosRecentes.map(coment=>(
                                        <ListItem key={coment.id_comentario} button onClick={()=>push(`/post/${coment.id_post}`)}>
                                        <ListItemText 
                                            primary={(coment.titulo_post.trim()===''?".......":coment.titulo_post)}
                                            secondary={coment.conteudo}
                                        />
                                    </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            }
                        </Grid>
                    </PerfilContent>
                </HomeMain>
            </HomeBox>

            <ModalEditarUsuario aberto={modalEditar.modal} fecharModal={modalEditar.fecharModal}/>
            <ModalAlterarSenha aberto={modalAlterarSenha.modal} fecharModal={modalAlterarSenha.fecharModal}/>
            <ModalAlterarFoto aberto={modalAlterarFoto.modal} fecharModal={modalAlterarFoto.fecharModal}/>
            <Footer />
        </>
    )
}

export default Perfil