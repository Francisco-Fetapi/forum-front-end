import React,{ useState } from 'react'

import { HomeBox } from '../styles/components';

import Footer from '../components/Footer';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { Text,Card,Form,Button,IconeTexto } from '../styles/components';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ModalEditarPost from '../components/ModalEditarPost';
import ModalApagarPost from '../components/ModalApagarPost';
import ModalEditarComentario from '../components/ModalEditarComentario';

import {Formik} from 'formik';

import UseLoading from '../hooks/useLoading';

import API from '../API';
import { useParams,useHistory } from 'react-router-dom';
import UseUsuario from '../hooks/useUsuario';
import UseModal from '../hooks/useModal';
import UseSelectedPost from '../hooks/useSelectedPost';
import ModalApagarComentario from '../components/ModalApagarComentario';
import UseTitle from '../hooks/useTitle';
import Mensagens from '../hooks/Mensagens';

function Post() {

    const { id } = useParams();
    const [post,setPost] = useState([]);
    const [comentarios,setComentarios] = useState([]);
    const { show,hide } = UseLoading();
    const { obterUsuario } = UseUsuario();
    const usuario = obterUsuario();
    const divRef = React.useRef();
    const inputComentario = React.useRef();
    const [likou,setLikou] = React.useState(0);
    const {modal,abrirModal,fecharModal} = UseModal();
    const ModalApagar = UseModal();
    const modalApagarComentario = UseModal();
    const modalEditarComentario = UseModal();
    const { selecionarPost } = UseSelectedPost();
    const [comentariosLikados,setComentariosLikados] = useState([]);
    const { replace } = useHistory();
    const { Informar } = Mensagens();

    const { setarTitulo } = UseTitle();
    if(!usuario.id){ //
        replace('/login');
    }
    React.useEffect(()=>{
        setarTitulo(`Ver post`);
    })
    
    async function ja_likou(){
        let res = await API.ja_likou(usuario.id,post.id_post);
        setLikou(res.dados);
    }
    async function gostar(post){
        show();
        await API.gostar_post(usuario.id,post.id_post)
        buscar_dados_post();
        hide();
    }

    async function buscar_dados_post(){
        let res = await API.buscar_dados_post(id)
        setPost(res.dados);
    }
    async function buscar_comentarios_post(){
        let res = await API.buscar_comentarios_post(id)
        setComentarios(res.dados);
        hide();
    }
    React.useEffect(()=>{
        divRef.current.scrollIntoView();
        show();
    },[]);
    React.useEffect(()=>{
        buscar_dados_post();
    },[comentarios])
    React.useEffect(()=>{
        buscar_comentarios_post();
    },[]);

    function gotoComentar(){
        inputComentario.current.scrollIntoView();
        inputComentario.current.focus();
    }
    function editar(post){
        selecionarPost(post);
        abrirModal();
    }
    function apagar(post){
        selecionarPost(post);
        ModalApagar.abrirModal();
    }
    async function comentarios_likados(){
        let res = await API.ja_likou_comentario(usuario.id);
        let id_comentarios_gostados = [];
        res.dados.gostados.forEach(gostado=>{
            id_comentarios_gostados.push(gostado.id_comentario);
        });
        setComentariosLikados(id_comentarios_gostados);
    }
    React.useEffect(()=>{
        ja_likou();
    },[post]);
    React.useEffect(()=>{
        comentarios_likados()
    },[comentarios]);

    async function gostarComentario(id_usuario,id_comentario){
        show();
        await API.gostar_comentario(id_usuario,id_comentario);
        buscar_comentarios_post();
        hide();
    }

    function apagarComentario(comentario){
        selecionarPost(comentario);
        modalApagarComentario.abrirModal();
    }
    function editarComentario(comentario){
        selecionarPost(comentario);
        modalEditarComentario.abrirModal();
    }
    function ehODonoDoComentario(comentario,usuario){
        if(comentario.id_usuario === usuario.id) return true;
        return false;
    }
    async function comentar(values){
        show();
        let res = await API.comentar(usuario.id,post.id_post,values.comentario)
        Informar(res);
        buscar_comentarios_post();
        hide();
        values.comentario = '';
    }
    return (
        <>
        <div ref={divRef}/>
        <HomeBox className="post pagina_post">
            {post.id_post && 
            <Card variant="outlined" square>
                <CardHeader 
                    avatar={<Avatar src={`${API.API_ROOT}/img/${post.foto}`}/>} 
                    title={post.nome}
                    subheader={<Box display="flex">
                        <IconeTexto>
                            <AccessTimeIcon />
                            <Text cor="#888"> {post.data}</Text>
                        </IconeTexto>
                        <IconeTexto style={{paddingLeft:12}}>
                            <ThumbUpIcon />
                            <Text cor="#888">{post.gostos}</Text>
                        </IconeTexto>
                        <IconeTexto style={{paddingLeft:12}}>
                            <CommentIcon />
                            <Text cor="#888"> {post.comentarios} </Text>
                        </IconeTexto>
                    </Box>}
                />
                <Divider />
                <CardContent>
                    <Text className="titulo" cor="#010101">
                        {post.titulo}
                    </Text>
                    <Text fontSize="14px" cor="rgba(0,0,0,.8)" fontFamily="Roboto">{post.conteudo}</Text>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <Tooltip title={`${likou?'Gostado':'Gostar'}`} arrow>
                        <IconButton onClick={()=>gostar(post)}>
                            <ThumbUpIcon className={`${likou?'likou':''}`}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Comentar" arrow>
                        <IconButton onClick={gotoComentar}>
                            <CommentIcon />
                        </IconButton>
                    </Tooltip>

                    {usuario.id === post.id_usuario &&
                        <>
                            <div style={{flexGrow:1}} />
                            <Tooltip title="Apagar" arrow>
                                <IconButton onClick={()=>apagar(post)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" arrow>
                                <IconButton onClick={()=>editar(post)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </CardActions>

                <Divider />
                <CardContent className="comentarios">
                    <Text fontSize="28px" align="center" cor="#010101">Comentários</Text>
                    
                    <Grid container>
                        {comentarios.map(comentario=>(
                            <Grid key={comentario.id} item xs={12} md={6}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar title="Imagem do usuario" src={`${API.API_ROOT}/img/${comentario.foto}`} />
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={comentario.nome}
                                            secondary={comentario.conteudo}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar />
                                        <ListItemText>
                                            <Box display="flex" alignItems="center" marginTop="-15px">
                                                <IconeTexto>
                                                    <AccessTimeIcon />
                                                    <Text cor="#888"> {comentario.data}</Text>
                                                </IconeTexto>
                                                <IconeTexto style={{paddingLeft:12}}>
                                                    <ThumbUpIcon/>
                                                    <Text cor="#888"> {comentario.gostos}</Text>
                                                </IconeTexto>

                                                <div style={{flexGrow:1}}/>
                                                <div className="acoes-comentarios">
                                                    {ehODonoDoComentario(comentario,usuario) &&
                                                        <>
                                                            <IconButton onClick={()=>apagarComentario(comentario)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <IconButton onClick={()=>editarComentario(comentario)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </>
                                                    }

                                                    <IconButton onClick={()=>gostarComentario(usuario.id,comentario.id)}>
                                                        <ThumbUpIcon className={`${comentariosLikados.includes(comentario.id)?'likou':''}`}/>
                                                    </IconButton>
                                                </div>
                                            </Box>
                                            <Divider />
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Grid>
                        ))}
                    </Grid>

                    <Box marginTop="10px">
                        <Formik
                            onSubmit={comentar}
                            validateOnBlur
                            initialValues={{
                                comentario:''
                            }}
                            render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                                <Form autoComplete="off" largura="100%">
                                    <div>
                                        <TextField inputProps={{ref:inputComentario}} fullWidth multiline rows={4} error={touched.comentario && !!errors.comentario} helperText={touched.comentario && errors.comentario} type="text" name="comentario" label="Escreva um comentario" InputLabelProps={{shrink:true}} value={values.comentario} onChange={handleChange} onBlur={handleBlur}/>
                                    </div>
                                    <div className="botao">
                                        <Button onClick={handleSubmit} variant="contained" color="primary">Comentar</Button>
                                    </div>
                                </Form>
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>
            }
        </HomeBox>
        <ModalEditarPost atualizarPosts={buscar_dados_post} aberto={modal} fecharModal={fecharModal}/>
        <ModalApagarPost atualizarPosts={buscar_dados_post} aberto={ModalApagar.modal} fecharModal={ModalApagar.fecharModal}/>
        <ModalApagarComentario atualizarComentarios={buscar_comentarios_post} aberto={modalApagarComentario.modal} fecharModal={modalApagarComentario.fecharModal}/>
        <ModalEditarComentario atualizarComentarios={buscar_comentarios_post} aberto={modalEditarComentario.modal} fecharModal={modalEditarComentario.fecharModal}/>

        <Footer />
    </>

    )
}

export default Post
