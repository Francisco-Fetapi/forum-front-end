import API from '../API';

export function Validar(values){
    const erros = {};

    if(values.nome !== undefined){
        if(!values.nome) erros.nome = "Este campo nao pode estar vazio!";
        else if(!/[A-Z]\w{1,}\s[A-Z]\w{1,}/.test(values.nome)){
            erros.nome = "Digite o seu primeiro e último nome e certifique-se de iniciá-los com maiúsculas";
        }

    }

    if(!values.num_tel) erros.num_tel = "Este campo nao pode estar vazio!";
    else if(String(values.num_tel).length !== 9) erros.num_tel = "O seu numero de telefone tem de ter exatamente 9 digitos."
    else if(!values.senha) erros.senha = "Este campo nao pode estar vazio!";
    else if(values.senha.length < 6) erros.senha = "A senha tem de ter no minimo 6 digitos";

    return erros;
}
export function validarPost(v){
    const erros = {};

    if(!v.conteudo) erros.conteudo = "Este campo não pode estar vazio"
    else if(v.conteudo.trim().length < 5) erros.conteudo = "Conteudo demasiado curto";

    return erros;
}

export async function Criar_Conta({nome,genero,num_tel,senha}){
    let res = await API.cadastrar(nome,genero,num_tel,senha);
    
    return res;
}
export async function Logar({num_tel,senha}){
    let res = await API.logar(num_tel,senha);

    return res;
}