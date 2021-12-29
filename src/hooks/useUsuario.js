import { useContext, useEffect, useState } from 'react'
import AllStates from '../context/AllStates';

function UseUsuario() {
    const { states,addOnStates } = useContext(AllStates);
    const { usuario } = states;
    const [Usuario,setUsuario] = useState(usuario);

    function salvarUsuario(dados){
        let dados_string = JSON.stringify(dados);
        localStorage.setItem('usuario',dados_string);

        setUsuario(dados);
    }
    function obterUsuario(){
        let dados_string = localStorage.getItem('usuario')
        let dados_parseados = JSON.parse(dados_string);

        return dados_parseados || {};
    }
    function apagarUsuario(){
        localStorage.removeItem('usuario');
        setUsuario({});
    }

    useEffect(()=>{
        addOnStates({usuario:Usuario});
    },[Usuario]);
    
    return {usuario,salvarUsuario,obterUsuario,apagarUsuario};
}

export default UseUsuario
