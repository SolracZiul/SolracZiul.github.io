const produtos = [
  {
    nome: "Alface Crespa",
    preco: 3,
    imagem: "https://images.unsplash.com/photo-1615484478091-8765c9c4a8c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    unidade: "unidade"
  },
  {
    nome: "Maçã Fuji",
    preco: 6,
    imagem: "https://images.unsplash.com/photo-1574672287239-7e8a5c99d8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    unidade: "kg"
  },
  {
    nome: "Cenoura",
    preco: 4,
    imagem: "https://images.unsplash.com/photo-1582515073490-39981397f1b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    unidade: "kg"
  },
  {
    nome: "Doce de Leite Artesanal",
    preco: 15,
    imagem: "https://images.unsplash.com/photo-1611406374085-1a3a1f465d87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    unidade: "litro"
  },
  {
    nome: "Banana Prata",
    preco: 5,
    imagem: "https://images.unsplash.com/photo-1574226516831-e1dff420e12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    unidade: "kg"
  }
];

let carrinho = [];

function carregarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  produtos.forEach((p, i) => {
    container.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}" alt="${p.nome}" />
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)} / ${p.unidade}</p>
        <input type="number" id="qtd-${i}" min="1" value="1" />
        <button onclick="adicionarAoCarrinho(${i})">Adicionar</button>
      </div>
    `;
  });
}

function adicionarAoCarrinho(index) {
  const qtd = parseInt(document.getElementById(`qtd-${index}`).value) || 1;
  const item = produtos[index];
  carrinho.push({ ...item, quantidade: qtd });
  document.getElementById("carrinho-count").innerText = carrinho.length;
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

  msg += `\nTotal: R$ ${carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0).toFixed(2)}\n`;

  if (entrega === "entrega") {
    msg += `Entregar para: ${nome}, CPF: ${cpf}, Tel: ${telefone}, Endereço: ${endereco}`;
  } else {
    msg += "Retirada na loja";
  }

  const link = "https://wa.me/5541999999999?text=" + encodeURIComponent(msg);
  window.open(link, "_blank");
}

window.onload = carregarProdutos;
