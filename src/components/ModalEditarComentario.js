import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'


import { Form, Button,Text } from '../styles/components';
import {Formik} from 'formik';
import UseSelectedPost from '../hooks/useSelectedPost'

import Mensagens from '../hooks/Mensagens';

import useLoading from '../hooks/useLoading';


import API from '../API';

function ModalEditarPost({aberto,fecharModal,atualizarComentarios}) {

    const { postSelecionado } = UseSelectedPost();
    const { Informar } = Mensagens();
    const post = postSelecionado || {};
    const {show,hide} = useLoading();

    async function salvar_alteracoes({conteudo}){
        show();
        let res = await API.editar_comentario(post.id,conteudo);
        Informar(res);
        fecharModal();
        atualizarComentarios();
        hide();
    }

    return (
        <div>
            <Dialog scroll="body" fullWidth open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Editar comentário
                  </Text>
                </DialogTitle>
              <DialogContent>
              <Formik 
                    onSubmit={salvar_alteracoes}
                    initialValues={{
                        conteudo:post.conteudo,
                    }}
                    render={({values,handleChange,handleSubmit})=>(
                        <Form autoComplete="off" largura="100%">
                            <div>
                                <TextField multiline rows={5} fullWidth name="conteudo" label="Seu comentário" InputLabelProps={{shrink:true}} value={values.conteudo} onChange={handleChange}/>
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
