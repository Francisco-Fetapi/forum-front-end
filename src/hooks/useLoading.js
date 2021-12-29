import React, { useState } from 'react'
import AllStates from '../context/AllStates';

function UseLoading() {
    const { states ,addOnStates } = React.useContext(AllStates)
    const { loadingProgress } = states;
    const [loading,setLoadingProgress] = useState(loadingProgress)
    
    function show(){
        setLoadingProgress(true);
    }
    function hide(){
        setLoadingProgress(false);
    }

    React.useEffect(()=>{
        addOnStates({loadingProgress:loading})
    },[loading])

    return { loadingProgress, show,hide };
}

export default UseLoading
