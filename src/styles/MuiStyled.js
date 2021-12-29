import withStyles from '@material-ui/core/styles/withStyles'
import MuiTextField from '@material-ui/core/TextField';
import MuiButton from '@material-ui/core/Button';


export const TextField = withStyles({
    root: {
        
        '& label':{
            color:'#d4d4d4',
        },
        '& .MuiInput-input':{
            color:'white',
            paddingTop:'12px'
        },
        '& .MuiInput-underline:before':{
            borderBottom:'1px solid #d4d4d4',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before':{
            borderBottom:'1px solid white',
        }
    },
  })(MuiTextField); 

  export const Button = withStyles(theme=>({

  }))(MuiButton);