import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'


import { Form, Button,Text } from '../styles/components';
import {Formik} from 'formik';
import useUsuario from '../hooks/useUsuario';
import useLoading from '../hooks/useLoading';
import API from '../API';
import Mensagem from '../hooks/Mensagens';

function ModalEditarUsuario({aberto,fecharModal}) {
    const { obterUsuario } = useUsuario();
    const usuario = obterUsuario();
    const { informar } = Mensagem();
    const { show, hide } = useLoading();

    function Validar(values){
        const erros = {};

        if(!values.senha) erros.senha = "Este campo nao pode estar vazio!";
        else if(values.senha.length < 6) erros.senha = "A senha tem de ter no minimo 6 digitos";
        else if(!values.novaSenha) erros.novaSenha = "Este campo nao pode estar vazio!";
        else if(values.novaSenha.length < 6) erros.novaSenha = "A senha tem de ter no minimo 6 digitos";
        else if(!values.confNovaSenha) erros.confNovaSenha = "Este campo nao pode estar vazio!";
        else if(values.confNovaSenha.length < 6) erros.confNovaSenha = "A senha tem de ter no minimo 6 digitos";
    
        
        return erros;
    }

    async function Submit(values){
        if(values.novaSenha !== values.confNovaSenha){
            informar('Nova senha e confirmar nova senha devem ser iguais!',5,'error');
            return false;
        }
        show();
        let res = await API.alterar_senha(values.senha,values.novaSenha,usuario.id)
        if(res.dados === true){ //a senha dele esta certa --> eh o usuario certo
            informar('Senha alterada.',3,'success');
            fecharModal();
        }else{
            informar('A sua senha esta errada.',4,'error');
        }
        hide();
    }

    return (
        <div>
            <Dialog scroll="body" fullWidth open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Alterar Senha
                  </Text>
                </DialogTitle>
              <DialogContent>
              <Formik
                    validate={Validar}
                    onSubmit={Submit}
                    validateOnBlur
                    initialValues={{
                        senha:'',
                        novaSenha:'',
                        confNovaSenha:'',
                    }}
                    render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                        <Form autoComplete="off" largura="100%">
                            <div>
                                <TextField type="password" fullWidth error={touched.senha && !!errors.senha} helperText={touched.senha && errors.senha} name="senha" label="Senha atual" InputLabelProps={{shrink:true}} value={values.senha} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField type="password" fullWidth error={touched.novaSenha && !!errors.novaSenha} helperText={touched.novaSenha && errors.novaSenha} name="novaSenha" label="Nova senha" InputLabelProps={{shrink:true}} value={values.novaSenha} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField type="password" fullWidth error={touched.confNovaSenha && !!errors.confNovaSenha} helperText={touched.confNovaSenha && errors.confNovaSenha} name="confNovaSenha" label="Confirme a nova senha" InputLabelProps={{shrink:true}} value={values.confNovaSenha} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div className="botao">
                                <Button onClick={handleSubmit} variant="contained" color="primary">Alterar</Button>
                            </div>
                        </Form>
                    )}
                />
              </DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalEditarUsuario
