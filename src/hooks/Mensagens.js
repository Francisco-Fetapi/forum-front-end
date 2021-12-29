import { useState,useContext, useEffect } from 'react'
import AllStates from '../context/AllStates';

function Mensagens() {
    const { states,addOnStates } = useContext(AllStates);
    const {mensagem} = states;
    const [msg,setMsg] = useState(mensagem);

    function Informar(info,severity){
        let estado;
        if(!severity){
            estado = info.falha?'error':'success';
        }else{
            estado = severity;
        }

        setMsg({
            msg:info.msg,
            tempo:info.tempo,
            status:true,
            severity:estado
        });
    }
    function informar(msg,tempo,severity){
        setMsg({
            msg,
            tempo,
            status:true,
            severity
        });
    }
    function fechar(){
        setMsg({...msg,status:false});
    }
    useEffect(()=>{
        addOnStates({mensagem:msg})
    },[msg]);

    return { mensagem,Informar,fechar,informar };
}

export default Mensagens
