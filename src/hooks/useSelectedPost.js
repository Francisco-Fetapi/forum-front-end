import { useState,useContext,useEffect } from 'react'
import AllStates from '../context/AllStates';

function UseSelectedPost() {
    const {states,addOnStates} = useContext(AllStates);
    const postSelecionado = states.postSelected;
    const [postSelected,setPostSelected] = useState(postSelecionado)
    
    function selecionarPost(post){
        setPostSelected(post);
    }
    useEffect(()=>{
        addOnStates({postSelected})
    },[postSelected])

    return { postSelecionado,selecionarPost };
}

export default UseSelectedPost
