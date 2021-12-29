import React from 'react'

function UseModal() {
    const [modal,setModal] = React.useState(false);

    function fecharModal(){
        setModal(false);
    }
    function abrirModal(){
        setModal(true);
    }
    return {modal,fecharModal,abrirModal};
}

export default UseModal
