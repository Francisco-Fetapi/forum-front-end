import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'


import { Form, Button,Text } from '../styles/components';
import {Formik} from 'formik';
import UseSelectedPost from '../hooks/useSelectedPost'

import { validarPost } from '../hooks/useForm';
import Mensagens from '../hooks/Mensagens';

import useLoading from '../hooks/useLoading';

import API from '../API';

function ModalEditarPost({aberto,fecharModal,atualizarPosts}) {

    const { postSelecionado } = UseSelectedPost();
    const { Informar } = Mensagens();
    const post = postSelecionado || {};
    const {show,hide} = useLoading();

    async function salvar_alteracoes({titulo,conteudo}){
        show();
        let res = await API.editar_post(post.id_post,titulo,conteudo);
        Informar(res);
        fecharModal();
        atualizarPosts();
        hide();
    }

    return (
        <div>
            <Dialog scroll="body" fullWidth open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Editar Post
                  </Text>
                </DialogTitle>
              <DialogContent>
              <Formik 
                    validate={validarPost}
                    onSubmit={salvar_alteracoes}
                    validateOnBlur
                    initialValues={{
                        titulo:post.titulo,
                        conteudo:post.conteudo,
                    }}
                    render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                        <Form autoComplete="off" largura="100%">
                            <div>
                                <TextField fullWidth inputProps={{maxLength:40}} helperText="Este campo não é obrigatório" name="titulo" label="Seu titulo" InputLabelProps={{shrink:true}} value={values.titulo} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField multiline rows={5} fullWidth error={touched.conteudo && !!errors.conteudo} helperText={touched.conteudo && errors.conteudo} name="conteudo" label="Seu conteudo" InputLabelProps={{shrink:true}} value={values.conteudo} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div className="botao">
                                <Button onClick={handleSubmit} variant="contained" color="primary">Salvar</Button>
                            </div>
                        </Form>
                    )}
                />
              </DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalEditarPost
