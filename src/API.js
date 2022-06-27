const API_ROOT = "http://localhost/forum/index.php";
const API_BASE = `${API_ROOT}/Controllers/`;

async function Fetch(dados, method = "POST") {
  const fm = new FormData();

  for (let prop in dados) {
    fm.append(prop, dados[prop]);
  }
  let res = await fetch(API_BASE, {
    method,
    body: fm,
  });
  res = await res.json();
  return res;
}

const API = {
  API_ROOT,
  async cadastrar(nome, genero, num_tel, senha) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "cadastrar",
      nome,
      genero,
      num_tel,
      senha,
    });

    return res;
  },
  async obterDadosUsuarioLogado() {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "verificar_se_ha_sessao",
    });
    return res;
  },
  async obterDadosUsuario(id_usuario) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "get_user_by_id",
      id_usuario,
    });
    return res;
  },
  async logar(num_tel, senha) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "logar",
      num_tel,
      senha,
    });
    return res;
  },
  async alterarDadosUsuario(nome, genero, num_tel, id_usuario) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "alterar_dados_usuario",
      nome,
      genero,
      num_tel,
      id_usuario,
    });
    return res;
  },
  async alterar_senha(senha, nova_senha, id_usuario) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "alterar_senha",
      senha,
      nova_senha,
      id_usuario,
    });

    return res;
  },
  async alterar_foto(foto, id_usuario) {
    let res = await Fetch({
      controller: "Usuario",
      funcao: "alterar_foto",
      id_usuario,
      foto,
    });

    return res;
  },
  async criar_post(titulo, conteudo, id_usuario) {
    let res = await Fetch({
      controller: "Post",
      funcao: "criar",
      id_usuario,
      titulo,
      conteudo,
    });

    return res;
  },
  async meus_ultimos_posts(id_usuario) {
    let res = await Fetch({
      controller: "Post",
      funcao: "ultimos_posts",
      id_usuario,
    });

    return res;
  },
  async meus_ultimos_comentarios(id_usuario) {
    let res = await Fetch({
      controller: "Post_Comentarios",
      funcao: "comentarios_recentes_de",
      id_usuario,
    });

    return res;
  },
  async buscar_dados_post(id_post) {
    let res = await Fetch({
      controller: "Post",
      funcao: "buscar_dados_post",
      id_post,
    });

    return res;
  },
  async buscar_comentarios_post(id_post) {
    let res = await Fetch({
      controller: "Post_Comentarios",
      funcao: "buscar_comentarios_post",
      id_post,
    });

    return res;
  },
  async obter_todos_os_posts(limite) {
    let res = await Fetch({
      controller: "Post",
      funcao: "obter_todos_os_posts",
      limite,
    });

    return res;
  },
  async editar_post(id, titulo, conteudo) {
    let res = await Fetch({
      controller: "Post",
      funcao: "editar",
      titulo,
      conteudo,
      id,
    });

    return res;
  },
  async eliminar_post(id_post) {
    let res = await Fetch({
      controller: "Post",
      funcao: "eliminar",
      id_post,
    });

    return res;
  },
  async gostar_post(id_usuario, id_post) {
    let res = await Fetch({
      controller: "Post_Gostos",
      funcao: "likar",
      id_post,
      id_usuario,
    });

    return res;
  },
  async ja_likou(id_usuario, id_post) {
    let res = await Fetch({
      controller: "Post_Gostos",
      funcao: "ja_likou",
      id_post,
      id_usuario,
    });

    return res;
  },
  async ja_likou_comentario(id_usuario, id_comentario) {
    let res = await Fetch({
      controller: "Post_Comentarios_Gostos",
      funcao: "ja_likou",
      id_comentario,
      id_usuario,
    });

    return res;
  },
  async gostar_comentario(id_usuario, id_comentario) {
    let res = await Fetch({
      controller: "Post_Comentarios_Gostos",
      funcao: "likar",
      id_comentario,
      id_usuario,
    });

    return res;
  },
  async eliminar_comentario(id_comentario) {
    let res = await Fetch({
      controller: "Post_Comentarios",
      funcao: "eliminar",
      id_comentario,
    });

    return res;
  },
  async comentar(id_usuario, id_post, conteudo) {
    let res = await Fetch({
      controller: "Post_Comentarios",
      funcao: "comentar",
      id_usuario,
      id_post,
      conteudo,
    });

    return res;
  },
  async editar_comentario(id_comentario, conteudo) {
    let res = await Fetch({
      controller: "Post_Comentarios",
      funcao: "editar",
      id_comentario,
      conteudo,
    });

    return res;
  },
  async filtrar_posts(query) {
    let res = await Fetch({
      controller: "Post",
      funcao: "filtrar_posts",
      query,
    });

    return res;
  },
};
export default API;
