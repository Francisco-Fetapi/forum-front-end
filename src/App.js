import React from 'react';
import AllStates from './context/AllStates';
import useAllStates from './hooks/useAllStates';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import Theme from './styles/Theme';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import GlobalStyles from './styles/GlobalStyles';
import Mensagens from './components/Mensagens';
import LoadingLinear from './components/LoadingLinear';

function App() {
  const [States,addOnStates] = useAllStates();

  const states = {
    mensagem:{
      msg:'',
      tempo:0,
      status:false,
      severity:''
    },
    loadingProgress:false,
    usuario:{},
    ...States
  };

  return (
    <AllStates.Provider value={{states,addOnStates}}>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <GlobalStyles />

            <LoadingLinear />
            
            <Routes />

            <Mensagens />

        </ThemeProvider>
      </BrowserRouter>
    </AllStates.Provider>
  );
}

export default App;
