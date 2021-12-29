import React from 'react'

import { Box, Paper,Form, Button,Link } from '../styles/components';
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/styles/useTheme'
import {Formik} from 'formik';

import {TextField} from '../styles/MuiStyled';

import { Validar,Logar } from '../hooks/useForm';
import useUsuario from '../hooks/useUsuario';
import Mensagem from '../hooks/Mensagens';
import {useHistory} from 'react-router-dom';
import useLoading from '../hooks//useLoading';
import UseTitle from '../hooks/useTitle';

function Login() {
    const { salvarUsuario } = useUsuario();
    const { Informar } = Mensagem();
    const { push } = useHistory();
    const { show, hide } = useLoading();
    const { setarTitulo } = UseTitle();

    console.log(useTheme());
    
    React.useEffect(()=>{
        setarTitulo('Login');
    }); 

    async function __Logar(values){
        show();
        let res = await Logar(values)
        salvarUsuario(res.dados);

        hide();
        Informar(res);
        if(!res.falha) push('/');
    }

    return (
        <Box back_image="5.jpg">
            <Paper irpara="baixo">
                <Typography variant="h4" color="inherit">
                    Login
                </Typography>
                
                <Formik 
                    onSubmit={__Logar}
                    validate={Validar}
                    validateOnBlur
                    initialValues={{
                        num_tel:'',
                        senha:''
                    }}
                    render={({values,errors,touched,handleChange,handleBlur,handleSubmit})=>(
                        <Form autoComplete="off">
                            <div>
                                <TextField color="secondary" fullWidth error={touched.num_tel && !!errors.num_tel} helperText={touched.num_tel && errors.num_tel} type="number" name="num_tel" label="Seu Número de telefone" InputLabelProps={{shrink:true}} value={values.num_tel} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div>
                                <TextField color="secondary" fullWidth error={touched.senha && !!errors.senha} helperText={touched.senha && errors.senha} type="password" name="senha" label="Sua senha" InputLabelProps={{shrink:true}} value={values.senha} onChange={handleChange} onBlur={handleBlur}/>
                            </div>
                            <div className="botao">
                                <Button onClick={handleSubmit} variant="contained" color="primary">Entrar</Button>
                            </div>
                        </Form>
                    )}
                />

                <footer>
                    <Typography variant="body2">Já tens uma conta? <Link to="/criar-conta"> Criar conta </Link></Typography>
                </footer>
            </Paper>
        </Box>
    )
}

export default Login
