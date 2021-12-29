import React from 'react'
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import useLoading from '../hooks/useLoading';

function LoadingLinear() {
    const { loadingProgress } = useLoading();
    return (
        <>
            {loadingProgress && 
                <Box position="fixed" bgcolor="rgba(0,0,0,.13)" height="100vh" width="100vw" style={{zIndex:99999}}>
                    <LinearProgress color="primary" variant="indeterminate"/>
                </Box>
            }
        </>
    )
}

export default LoadingLinear
