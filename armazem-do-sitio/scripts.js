window.onload = () => {
  document.getElementById("carrinho-popup").style.display = "none";  // garante carrinho oculto
  filtrarCategoria("todas");
  atualizarContadorCarrinho();
};

const produtos = [
  {
    nome: "Tomate Orgânico",
    preco: 5,
    imagem: "img/tomate.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "unidade"],
    categoria: "verduras"
  },
  {
    nome: "Alface Crespa",
    preco: 3,
    imagem: "img/alface.jpg",
    unidadePadrao: "unidade",
    opcoesUnidade: ["unidade"],
    categoria: "verduras"
  },
  {
    nome: "Maçã Fuji",
    preco: 6,
    imagem: "img/maca.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "unidade"],
    categoria: "frutas"
  },
  {
    nome: "Cenoura",
    preco: 4,
    imagem: "img/cenoura.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "unidade"],
    categoria: "legumes"
  },
  {
    nome: "Doce de Leite Artesanal",
    preco: 15,
    imagem: "img/doce.jpg",
    unidadePadrao: "litro",
    opcoesUnidade: ["litro", "pote"],
    categoria: "ofertas"
  },
  {
    nome: "Banana Prata",
    preco: 5,
    imagem: "img/banana.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "penca"],
    categoria: "frutas"
  }
];

let carrinho = [];
let produtoSelecionado = null;
let categoriaAtual = "todas";

function carregarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  const produtosFiltrados = categoriaAtual === "todas" ? produtos : produtos.filter(p => p.categoria === categoriaAtual);

  produtosFiltrados.forEach((p, i) => {
    container.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}" alt="${p.nome}" />
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)} / ${p.unidadePadrao}</p>
        <button onclick="abrirPopup(${produtos.indexOf(p)})">Adicionar</button>
      </div>
    `;
  });
}

function filtrarCategoria(categoria) {
  categoriaAtual = categoria;
  carregarProdutos();
}

function abrirPopup(index) {
  produtoSelecionado = produtos[index];
  document.getElementById("popup-nome").textContent = produtoSelecionado.nome;
  document.getElementById("popup-img").src = produtoSelecionado.imagem;
  document.getElementById("popup-quantidade").value = 1;

  const select = document.getElementById("popup-unidade");
  select.innerHTML = "";
  produtoSelecionado.opcoesUnidade.forEach(un => {
    const opt = document.createElement("option");
    opt.value = un;
    opt.textContent = un;
    select.appendChild(opt);
  });

  document.getElementById("popup-produto").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup-produto").style.display = "none";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharPopup();
});
window.addEventListener("click", (e) => {
  const popup = document.getElementById("popup-produto");
  if (e.target === popup) fecharPopup();
});

function adicionarAoCarrinhoFinal() {
  const quantidade = parseInt(document.getElementById("popup-quantidade").value);
  const unidadeEscolhida = document.getElementById("popup-unidade").value;

  if (!quantidade || quantidade < 1) {
    alert("Escolha uma quantidade válida.");
    return;
  }

  carrinho.push({
    nome: produtoSelecionado.nome,
    preco: produtoSelecionado.preco,
    quantidade: quantidade,
    unidade: unidadeEscolhida
  });

  atualizarContadorCarrinho();
  fecharPopup();
}

function atualizarContadorCarrinho() {
  document.getElementById("carrinho-count-flutuante").innerText = carrinho.length;
}

function mostrarCarrinho() {
  const container = document.getElementById("carrinho-itens");
  const totalSpan = document.getElementById("total");
  let total = 0;
  container.innerHTML = "";

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;
    const id = `item-${index}`;
    container.innerHTML += `
      <div class="carrinho-item">
        <div class="cabecalho" onclick="toggleDetalhes('${id}')">
          <span id="icone-${id}">🞃</span> <strong>${item.nome}</strong>
        </div>
        <div class="detalhes" id="${id}">
          <input type="number" min="1" value="${item.quantidade}" onchange="atualizarQuantidade(${index}, this.value)" />
          <select onchange="atualizarUnidade(${index}, this.value)">
            ${getUnidades(item.nome).map(u => `<option value="${u}" ${u === item.unidade ? "selected" : ""}>${u}</option>`).join("")}
          </select>
          <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
          <button onclick="removerItem(${index})">❌</button>
        </div>
      </div>
    `;
  });

  totalSpan.innerText = total.toFixed(2);
}

function toggleCarrinho() {
  const popup = document.getElementById("carrinho-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
  mostrarCarrinho();
}

function toggleDetalhes(id) {
  const el = document.getElementById(id);
  const icone = document.getElementById("icone-" + id);

  if (el.classList.contains("aberto")) {
    el.style.maxHeight = "0px";
    el.classList.remove("aberto");
    if (icone) icone.textContent = "🞃";
  } else {
    el.classList.add("aberto");
    el.style.maxHeight = el.scrollHeight + "px";
    if (icone) icone.textContent = "🞁";
  }
}

function getUnidades(nome) {
  const produto = produtos.find(p => p.nome === nome);
  return produto ? produto.opcoesUnidade : ["kg"];
}

function atualizarQuantidade(index, novaQtd) {
  carrinho[index].quantidade = parseInt(novaQtd);
  mostrarCarrinho();
}

function atualizarUnidade(index, novaUnidade) {
  carrinho[index].unidade = novaUnidade;
  mostrarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarContadorCarrinho();
  mostrarCarrinho();
}

function mostrarFormularioEntrega() {
  document.getElementById("carrinho-conteudo").style.display = "none";
  document.getElementById("formulario-entrega").style.display = "block";
}

function voltarParaCarrinho() {
  document.getElementById("formulario-entrega").style.display = "none";
  document.getElementById("carrinho-conteudo").style.display = "block";
}

function atualizarFormulario() {
  const tipo = document.querySelector('input[name="tipoEntrega"]:checked');
  const entrega = document.getElementById("campos-entrega");
  entrega.style.display = (tipo && tipo.value === "entrega") ? "block" : "none";
}

function enviarPedido() {
  const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked')?.value;
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const pagamento = document.getElementById("pagamento").value;
  const telefone = document.getElementById("telefone")?.value || "";
  const endereco = document.getElementById("endereco")?.value || "";

  let msg = `*Pedido do Armazém do Sítio*\n\n`;
  carrinho.forEach(item => {
    msg += `• ${item.nome} - ${item.quantidade} ${item.unidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  const total = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
  msg += `\n*Total:* R$ ${total.toFixed(2)}\n\n`;

  msg += `*Cliente:*\nNome: ${nome}\nCPF: ${cpf}\nPagamento: ${pagamento}\n`;

  if (tipoEntrega === "entrega") {
    msg += `Telefone: ${telefone}\nEndereço: ${endereco}\n`;
  } else {
    msg += "Tipo: Retirada na loja\n";
  }

  const link = "https://wa.me/5541997351454?text=" + encodeURIComponent(msg);
  window.open(link, "_blank");

  // Limpar carrinho e fechar
  carrinho = [];
  atualizarContadorCarrinho();
  document.getElementById("carrinho-popup").style.display = "none";
  document.getElementById("carrinho-conteudo").style.display = "block";
  document.getElementById("formulario-entrega").style.display = "none";
}


// Fecha o carrinho ao clicar fora
window.addEventListener("click", (e) => {
  const carrinhoPopup = document.getElementById("carrinho-popup");
  const carrinhoInterno = carrinhoPopup.querySelector("div");

  if (e.target === carrinhoPopup && carrinhoPopup.style.display === "flex") {
    carrinhoPopup.style.display = "none";
  }
});

function toggleMenuAdmin() {
  const menu = document.getElementById("menu-admin");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function solicitarSenhaAdmin() {
  document.getElementById("senha-admin").value = "";
  document.getElementById("popup-login").style.display = "flex";
}

function fecharPopupLogin() {
  document.getElementById("popup-login").style.display = "none";
}

function verificarSenhaAdmin() {
  const senha = document.getElementById("senha-admin").value;
  if (senha === "donaLurdes123") {
    document.getElementById("popup-login").style.display = "none";
    document.getElementById("menu-admin").classList.add("ativo");
  } else {
    alert("Senha incorreta.");
  }
}

// Fecha pop-up ao clicar fora dele
window.addEventListener("click", (e) => {
  const loginPopup = document.getElementById("popup-login");
  const content = loginPopup.querySelector(".popup-content");
  if (e.target === loginPopup) fecharPopupLogin();

  const menu = document.getElementById("menu-admin");
  const engrenagem = document.getElementById("botao-admin");
  if (
    menu.style.display === "flex" &&
    !menu.contains(e.target) &&
    e.target !== engrenagem
  ) {
    menu.style.display = "none";
  }
});

function abrirGerenciarProdutos() {
  alert("Abrindo Gerenciamento de Produtos (em desenvolvimento).");
}

function abrirHistoricoPedidos() {
  alert("Abrindo Histórico de Pedidos (em desenvolvimento).");
}

// Fecha menu admin ao clicar fora
window.addEventListener("click", (e) => {
  const menu = document.getElementById("menu-admin");
  const engrenagem = document.getElementById("botao-admin");

  if (
    menu.style.display === "flex" &&
    !menu.contains(e.target) &&
    e.target !== engrenagem
  ) {
    menu.style.display = "none";
  }
});

let produtosGerenciados = [];  // lista simulada

function abrirGerenciarProdutos() {
  document.getElementById("popup-gerenciar").style.display = "flex";
  atualizarListaProdutos();
}

function fecharGerenciarProdutos() {
  document.getElementById("popup-gerenciar").style.display = "none";
}

function atualizarListaProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  produtosGerenciados.forEach((p, i) => {
    lista.innerHTML += `
      <div class="item-produto">
        <span>${p.nome} - R$ ${p.preco.toFixed(2)} - ${p.categoria}</span>
        <button onclick="excluirProduto(${i})">Excluir</button>
      </div>
    `;
  });
}

document.getElementById("form-produto").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome-produto").value;
  const preco = parseFloat(document.getElementById("preco-produto").value);
  const imagem = document.getElementById("imagem-produto").value;
  const categoria = document.getElementById("categoria-produto").value;
  const unidades = document.getElementById("unidades-produto").value.split(",").map(u => u.trim());

  produtosGerenciados.push({
    nome,
    preco,
    imagem,
    categoria,
    unidadePadrao: unidades[0],
    opcoesUnidade: unidades
  });

  document.getElementById("form-produto").reset();
  atualizarListaProdutos();
});

function excluirProduto(index) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    produtosGerenciados.splice(index, 1);
    atualizarListaProdutos();
  }
}



