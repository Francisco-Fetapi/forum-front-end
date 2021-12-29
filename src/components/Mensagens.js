import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import React from 'react'

import Mensagem from '../hooks/Mensagens';
function Mensagens() {
    const {mensagem,fechar} = Mensagem();
    return (
        <Snackbar style={{width:'100%'}} open={mensagem.status} onClose={fechar} autoHideDuration={mensagem.tempo*1000}>
            <Alert variant="filled" elevation={6} severity={mensagem.severity} onClose={fechar}>
                {mensagem.msg}
            </Alert>
        </Snackbar>
    )
}

export default Mensagens
