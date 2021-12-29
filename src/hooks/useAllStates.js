import { useState } from 'react'

function useStates() {
    
    const [allStates,setAllStates] = useState({});

    function addOnStates(obj){
        let new_states = allStates;
        for(let prop in obj){
            new_states = {...new_states,[prop]:obj[prop]};
        }
        setAllStates(new_states);
    }

    return [allStates,addOnStates];
}

export default useStates;
