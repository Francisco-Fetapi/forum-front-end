import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'


import { Text } from '../styles/components';
import UseSelectedPost from '../hooks/useSelectedPost'

import useLoading from '../hooks/useLoading';

import Mensagens from '../hooks/Mensagens';

import API from '../API';

function ModalApagarComentario({aberto,fecharModal,atualizarComentarios}) {

    const { postSelecionado } = UseSelectedPost();
    const { Informar } = Mensagens();
    const comentario = postSelecionado || {};
    const {show,hide} = useLoading();

    async function apagar(){
        show();
        let res = await API.eliminar_comentario(comentario.id);
        Informar(res);
        console.log(res);
        fecharModal();
        hide();
        atualizarComentarios();
    }

    return (
        <div>
            <Dialog scroll="body" open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Apagar comentario
                  </Text>
                </DialogTitle>
              <DialogContent>
                <DialogContentText>Tem certeza que deseja apagar este comentario ?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={apagar}>Sim</Button>
                <Button color="primary" onClick={fecharModal}>Nao</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalApagarComentario
