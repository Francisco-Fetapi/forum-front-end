import React from 'react'
import { Box, Paper,Form, Button,Link } from '../styles/components';
import Typography from '@material-ui/core/Typography'
import {Formik} from 'formik';

import {TextField} from '../styles/MuiStyled';

import { Validar,Criar_Conta } from '../hooks/useForm';


import MenuItem from '@material-ui/core/MenuItem';
import Mensagens from '../hooks/Mensagens';
import { useHistory } from 'react-router-dom';
import UseUsuario from '../hooks/useUsuario';
import useLoading from '../hooks//useLoading';
import useTitle from '../hooks//useTitle';

function CriarConta() {
    const {Informar} = Mensagens();
    const H = useHistory();
    const { salvarUsuario } = UseUsuario();
    const { show, hide } = useLoading();
    const { setarTitulo } = useTitle();
    
    React.useEffect(()=>{
        setarTitulo('Criar conta');
    });

    async function __Criar_Conta(values){
        show();
        let res = await Criar_Conta(values);

        salvarUsuario(res.dados);
        Informar(res);
        hide();
        if(!res.falha) H.push('/');
    }
    return (
        <Box back_image="7.jpg">
            <Paper irpara="cima">
                <Typography variant="h4" color="inherit">
                    Criar conta
                </Typography>
                
                <Formik 
                    onSubmit={__Criar_Conta}
                    validate={Validar}
                    validateOnBlur
                    initialValues={{
                        nome:'',
                        genero:'M',
                        num_tel:'',
                        senha:''
                    }}
                    render={({values,errors,touched,isValidate,handleChange,handleBlur,handleSubmit})=>(
                        <Form autoComplete="off">
                            <div>
                                <TextField color="secondary" fullWidth error={touched.nome && !!errors.nome} helperText={touched.nome && errors.nome} name="nome" label="Seu nome" InputLabelProps={{shrink:true}} value={values.nome} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField color="secondary" select fullWidth name="genero" label="Seu genero" InputLabelProps={{shrink:true}} value={values.genero} onChange={handleChange}>
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Feminino</MenuItem>
                                </TextField>
                            </div>
                            <div>
                                <TextField color="secondary" fullWidth error={touched.num_tel && !!errors.num_tel} helperText={touched.num_tel && errors.num_tel} type="number" name="num_tel" label="Seu Numero de telefone" InputLabelProps={{shrink:true}} value={values.num_tel} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField color="secondary" fullWidth error={touched.senha && !!errors.senha} helperText={touched.senha && errors.senha} type="password" name="senha" label="Sua senha" InputLabelProps={{shrink:true}} value={values.senha} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div className="botao">
                                <Button onClick={handleSubmit} variant="contained" color="primary">Criar conta</Button>
                            </div>
                        </Form>
                    )}
                />

                <footer>
                    <Typography variant="body2">Ja tens uma conta? <Link to="/login"> iniciar sessao </Link></Typography>
                </footer>
            </Paper>
        </Box>
    )
}

export default CriarConta
