import React from 'react'

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

import { Text,Card,IconeTexto,Link } from '../styles/components';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import API from '../API';
import UseLoading from '../hooks/useLoading';
import { useHistory } from 'react-router-dom';
import UseUsuario from '../hooks/useUsuario';
import UseSelectedPost from '../hooks/useSelectedPost';

function PostCard({abrirModal,post,abrirModalApagar,atualizarPosts}) {

    const { push } = useHistory();
    const { obterUsuario } = UseUsuario();
    const usuario = obterUsuario();
    const { selecionarPost } = UseSelectedPost();
    const [likou,setLikou] = React.useState(0);
    const { show,hide } = UseLoading();
    
    React.useEffect(()=>{
        ja_likou(); //ver se o usuario tem like neste post
    },[]);

    async function ja_likou(){
        let res = await API.ja_likou(usuario.id,post.id_post);
        setLikou(res.dados);
    }
    
    function editar(post){
        selecionarPost(post);
        abrirModal();
    }
    function apagar(post){
        selecionarPost(post);
        abrirModalApagar();
    }
    async function gostar(post){
        show();
        await API.gostar_post(usuario.id,post.id_post)
        atualizarPosts();
        ja_likou();
        hide();
    }

    return (
        <Card elevation={4}>
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
                        <Text cor="#888"> {post.gostos}</Text>
                    </IconeTexto>
                    <IconeTexto style={{paddingLeft:12}}>
                        <CommentIcon />
                        <Text cor="#888"> {post.comentarios} </Text>
                    </IconeTexto>
                </Box>}
            />
            <Divider />
            <CardContent className="card-content">                    
                <Text className="titulo" cor="#010101">
                    {post.titulo}
                </Text>
                <Text fontSize="14px" cor="rgba(0,0,0,.8)" fontFamily="Roboto">
                    {post.conteudo.length > 100 ? post.conteudo.substring(0,100):post.conteudo}
                    {post.conteudo.length > 100 &&
                        <>
                            ...
                            <Link to={`/post/${post.id_post}`}>Ver mais</Link>
                        </>
                    }
                </Text>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <Tooltip title={`${likou?'Gostado':'Gostar'}`} arrow>
                    <IconButton onClick={()=>gostar(post)}>
                        <ThumbUpIcon className={`${likou?'likou':''}`}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Comentar" arrow>
                    <IconButton onClick={()=>push(`/post/${post.id_post}`)}>
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
        </Card>
    )
}

export default PostCard
