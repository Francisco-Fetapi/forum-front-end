import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import DoneIcon from '@material-ui/icons/Done'

import { Text,FotoUser } from '../styles/components';
import useUsuario from '../hooks/useUsuario';
import useLoading from '../hooks/useLoading';
import API from '../API';
import Mensagem from '../hooks/Mensagens';

function ModalAlterarFoto({aberto,fecharModal}) {
    const { obterUsuario,salvarUsuario } = useUsuario();
    const usuario = obterUsuario();
    const { informar } = Mensagem();
    const inputFile = React.useRef();
    const [preview,setPreview] = useState(null);
    const { show, hide } = useLoading();

    function escolherFoto(){
        const file = inputFile.current;
        file.click();

        file.addEventListener('change',function(){
            let ficheiro = file.files[0];
            let reader = new FileReader()
            reader.readAsDataURL(ficheiro);

            reader.onload = function(e){
                setPreview(e.target.result);
            }
        })

    }
    async function alterarFoto(){
        const file = inputFile.current.files[0]
        if(file){
            if(!file.type.includes('image')){
                informar('O arquivo escolhido não é uma imagem!!',3,'error');    
            }else if((file.size/1024)>1024){
                informar('Tamanho da foto demasiado grande. 1MB é o limite!',3,'error');    
            }else{
                show();
                let res = await API.alterar_foto(file,usuario.id);
                
                res = await API.obterDadosUsuario(usuario.id);
                salvarUsuario(res.dados);
                fecharModal();
                hide();
            }
        }else{
            informar('Nenhuma foto escolhida!',3,'error');
        }
    }


    return (
        <div>
            <Dialog scroll="body" open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text align="center" fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Alterar Foto
                  </Text>
                </DialogTitle>
              <DialogContent>
                  <Box marginX='30px' marginBottom="20px" display="flex" alignItems="center" justifyContent="center">
                    <FotoUser src={preview ? preview :`${API.API_ROOT}/img/${usuario.foto}`} onClick={escolherFoto}/>
                  </Box>
                <input type="file" ref={inputFile} hidden={true}/>
                <Box display="flex" justifyContent="center">
                    <Button color="primary" variant="contained" startIcon={<DoneIcon />} onClick={alterarFoto}>Alterar</Button>
                </Box>
              </DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalAlterarFoto
