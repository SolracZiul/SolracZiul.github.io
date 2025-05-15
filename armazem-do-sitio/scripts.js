const produtos = [
  {
    nome: "Tomate Orgânico",
    preco: 5,
    imagem: "img/tomate.jpg",
    unidadePadrao: "kg",
    opcoesUnidade: ["kg", "unidade"]
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
    opcoesUnidade: ["kg", "unidade"]
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

// Fecha o pop-up com ESC ou clicando fora
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
  document.getElementById("carrinho-count").innerText = carrinho.length;
  mostrarCarrinho();
}

function atualizarCamposEntrega() {
  const entrega = document.querySelector('input[name="entrega"]:checked').value;
  const telefone = document.getElementById("telefone");
  const endereco = document.getElementById("endereco");

  if (entrega === "entrega") {
    telefone.style.display = "block";
    endereco.style.display = "block";
  } else {
    telefone.style.display = "none";
    endereco.style.display = "none";
  }
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
