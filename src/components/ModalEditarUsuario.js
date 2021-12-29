import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'


import { Form, Button,Text } from '../styles/components';
import {Formik} from 'formik';
import useUsuario from '../hooks/useUsuario';
import useLoading from '../hooks/useLoading';

import API from '../API';
import Mensagem from '../hooks/Mensagens';

function ModalEditarUsuario({aberto,fecharModal}) {
    const { obterUsuario,salvarUsuario } = useUsuario();
    const usuario = obterUsuario();
    const { Informar } = Mensagem();
    const { show, hide } = useLoading();

    function Validar(values){
        const erros = {};
    
        if(!values.nome) erros.nome = "Este campo não pode estar vazio!";
        else if(!/[A-Z]\w{1,}\s[A-Z]\w{1,}/.test(values.nome)){
            erros.nome = "Digite o seu primeiro e último nome e certifique-se de iniciá-los com maiúsculas";
        }
        else if(!values.num_tel) erros.num_tel = "Este campo não pode estar vazio!";
        else if(String(values.num_tel).length !== 9) erros.num_tel = "O seu número de telefone tem de ter exatamente 9 digitos."
        
        return erros;
    }

    async function Submit({nome,genero,num_tel}){
        show();
        let res = await API.alterarDadosUsuario(nome,genero,num_tel,usuario.id)
        Informar(res);

        res = await API.obterDadosUsuario(usuario.id);
        salvarUsuario(res.dados);
        fecharModal();
        hide();
    }

    return (
        <div>
            <Dialog scroll="body" fullWidth open={aberto} onClose={fecharModal}>
              <DialogTitle>
                  <Text fontFamily="Roboto-Thin" fontSize="28px" cor="#111">
                    Editar informações do usuário
                  </Text>
                </DialogTitle>
              <DialogContent>
              <Formik
                    validate={Validar}
                    onSubmit={Submit}
                    validateOnBlur
                    initialValues={{
                        num_tel:usuario.num_tel,
                        nome:usuario.nome,
                        genero:usuario.genero
                    }}
                    render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                        <Form autoComplete="off" largura="100%">
                            <div>
                                <TextField fullWidth error={touched.nome && !!errors.nome} helperText={touched.nome && errors.nome} name="nome" label="Seu nome" InputLabelProps={{shrink:true}} value={values.nome} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField select fullWidth name="genero" label="Seu genero" InputLabelProps={{shrink:true}} value={values.genero} onChange={handleChange}>
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Feminino</MenuItem>
                                </TextField>
                            </div>
                            <div>
                                <TextField fullWidth error={touched.num_tel && !!errors.num_tel} helperText={touched.num_tel && errors.num_tel} type="number" name="num_tel" label="Seu Numero de telefone" InputLabelProps={{shrink:true}} value={values.num_tel} onChange={handleChange} onBlur={handleBlur}/>
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
