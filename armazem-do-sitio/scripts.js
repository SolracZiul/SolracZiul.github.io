const produtos = [
  {
    nome: "Tomate Orgânico",
    preco: 5,
    imagem: "img/tomate.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg"]
  },
  {
    nome: "Alface Crespa",
    preco: 3,
    imagem: "img/alface.jpg",
    unidadePadrao: "unidade",
    opcoesUnidade: ["unidade"]
  },
  {
    nome: "Maçã Fuji",
    preco: 6,
    imagem: "img/maca.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "unidade"]
  },
  {
    nome: "Cenoura",
    preco: 4,
    imagem: "img/cenoura.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg"]
  },
  {
    nome: "Doce de Leite Artesanal",
    preco: 15,
    imagem: "img/doce.jpg",
    unidadePadrao: "litro",
    opcoesUnidade: ["litro", "pote"]
  },
  {
    nome: "Banana Prata",
    preco: 5,
    imagem: "img/banana.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "penca"]
  }
];

let carrinho = [];
let produtoSelecionado = null;

function carregarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  produtos.forEach((p, i) => {
    container.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}" alt="${p.nome}" />
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)} / ${p.unidadePadrao}</p>
        <button onclick="abrirPopup(${i})">Adicionar</button>
      </div>
    `;
  });
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

  document.getElementById("carrinho-count").innerText = carrinho.length;
  fecharPopup();
}

function toggleCarrinho() {
  const popup = document.getElementById("carrinho-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
  mostrarCarrinho();
}

function mostrarCarrinho() {
  const container = document.getElementById("carrinho-itens");
  const totalSpan = document.getElementById("total");
  let total = 0;
  container.innerHTML = "";
  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    container.innerHTML += `<p>${item.nome} - ${item.quantidade} ${item.unidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>`;
  });
  totalSpan.innerText = total.toFixed(2);
}

function finalizarPedido() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const entrega = document.querySelector('input[name="entrega"]:checked').value;

  let msg = "Olá! Quero fazer um pedido:\n\n";
  carrinho.forEach(item => {
    msg += `• ${item.nome} - ${item.quantidade} ${item.unidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  const total = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
  msg += `\nTotal: R$ ${total.toFixed(2)}\n`;

  if (entrega === "entrega") {
    msg += `Entregar para: ${nome}, CPF: ${cpf}, Tel: ${telefone}, Endereço: ${endereco}`;
  } else {
    msg += "Retirada na loja";
  }

  const link = "https://wa.me/5541999999999?text=" + encodeURIComponent(msg);
  window.open(link, "_blank");
}

window.onload = carregarProdutos;

/* Estilo geral do pop-up */
.popup {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Conteúdo do pop-up */
.popup-content {
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

/* Campos do formulário dentro do pop-up */
.popup-content input,
.popup-content select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 1rem;
}

/* Botões do pop-up */
.popup-content button {
  background: #f2c14e;
  border: none;
  border-radius: 12px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

.popup-content button:hover {
  background: #e0ac32;
}

