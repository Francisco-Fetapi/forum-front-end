import { useState,useEffect } from 'react'

function UseTitle() {
    const [title,setTitle] = useState('React App');
    
    useEffect(()=>{
        document.title = title;
    },[title]);

    function setarTitulo(titulo){
        setTitle(titulo);
    }
    return { setarTitulo };
}

export default UseTitle
