import React from 'react'
import { HomeBox,HomeMain,Text} from '../styles/components';
import Box from '@material-ui/core/Box';
import Footer from '../components/Footer';
import UseTitle from '../hooks/useTitle';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

function Home() {  
    const { setarTitulo } = UseTitle();

    React.useEffect(()=>{
        setarTitulo('Página não encontrada');
    }); 

    return (
        <>
            <HomeBox>
                <HomeMain elevation={5}>
                    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
                        <Box>
                            <Box display="flex" justifyContent="center">
                                <SentimentVeryDissatisfiedIcon style={{color:'#888',fontSize:'50px'}} />
                            </Box>
                            <Box>
                                <Text cor="#888" fontSize="30px" align="center">Página não encontrada</Text>
                            </Box>
                        </Box>
                    </Box>
                </HomeMain>
            </HomeBox>
            <Footer />
        </>
    )
}

export default Home
