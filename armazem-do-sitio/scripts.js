
const produtosData = [
  { nome: 'Tomate Orgânico', preco: 5, imagem: 'https://via.placeholder.com/200', categoria: 'legumes', unidade: 'kg' },
  { nome: 'Alface Crespa', preco: 3, imagem: 'https://via.placeholder.com/200', categoria: 'verduras', unidade: 'unidade' },
  { nome: 'Maçã Fuji', preco: 6, imagem: 'https://via.placeholder.com/200', categoria: 'frutas', unidade: 'kg' },
  { nome: 'Cenoura', preco: 4, imagem: 'https://via.placeholder.com/200', categoria: 'legumes', unidade: 'kg' },
  { nome: 'Doce de Leite Artesanal', preco: 15, imagem: 'https://via.placeholder.com/200', categoria: 'ofertas', unidade: 'litro' },
  { nome: 'Banana Prata', preco: 5, imagem: 'https://via.placeholder.com/200', categoria: 'frutas', unidade: 'kg' }
];

let carrinho = [];

function carregarProdutos(categoria = 'todas') {
  const container = document.getElementById('produtos');
  if (!container) return;
  container.innerHTML = '';
  produtosData.forEach((produto, index) => {
    if (categoria === 'todas' || produto.categoria === categoria) {
      container.innerHTML += `
        <div class="produto">
          <img src="${produto.imagem}" alt="${produto.nome}" />
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)} / ${produto.unidade}</p>
          <input type="number" id="qtd-${index}" value="1" min="1" style="width: 60px;" />
          <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
        </div>
      `;
    }
  });
}

function filtrarCategoria(cat) {
  carregarProdutos(cat);
}

function toggleCarrinho() {
  const carrinhoPopup = document.getElementById('carrinho-popup');
  if (carrinhoPopup) carrinhoPopup.style.display = carrinhoPopup.style.display === 'flex' ? 'none' : 'flex';
  mostrarCarrinho();
}

function adicionarAoCarrinho(index) {
  const qtd = parseInt(document.getElementById(`qtd-${index}`).value) || 1;
  const produto = produtosData[index];
  carrinho.push({ ...produto, quantidade: qtd });
  document.getElementById('carrinho-count').innerText = carrinho.length;
}

function mostrarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  const totalSpan = document.getElementById('total');
  let total = 0;
  container.innerHTML = '';
  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    container.innerHTML += `<p>${item.nome} - ${item.quantidade} ${item.unidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>`;
  });
  totalSpan.innerText = total.toFixed(2);
}

function abrirWhatsApp() {
  window.open('https://wa.me/5541999999999', '_blank');
}

function finalizarPedido() {
  const entrega = document.querySelector('input[name="entrega"]:checked').value;
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;

  if (entrega === 'entrega' && (!nome || !cpf || !telefone || !endereco)) {
    alert('Preencha os dados de entrega.');
    return;
  }

  const pedido = {
    cliente: { nome, cpf, telefone, endereco },
    entrega,
    produtos: carrinho,
    data: new Date().toLocaleString()
  };

  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.push(pedido);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  let msg = 'Olá! Quero fazer um pedido:%0A';
  carrinho.forEach(p => {
    msg += `• ${p.nome} - ${p.quantidade} ${p.unidade} - R$ ${(p.preco * p.quantidade).toFixed(2)}%0A`;
  });
  msg += `%0ATotal: R$ ${pedido.produtos.reduce((s, p) => s + (p.preco * p.quantidade), 0).toFixed(2)}`;
  if (entrega === 'entrega') {
    msg += `%0AEntregar para: ${nome}, CPF: ${cpf}, Tel: ${telefone}, Endereço: ${endereco}`;
  } else {
    msg += `%0ARetirada na loja`;
  }

  window.open('https://wa.me/5541999999999?text=' + msg, '_blank');
}

function mostrarClientes() {
  const div = document.getElementById('clientes');
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  if (!div) return;
  div.innerHTML = '<h3>Pedidos Salvos</h3>';
  clientes.forEach((c, i) => {
    div.innerHTML += `<p><strong>${c.cliente.nome}</strong> (${c.entrega}) - ${c.data}<br/>${c.cliente.telefone} - ${c.cliente.endereco}</p><hr>`;
  });
}

function limparClientes() {
  localStorage.removeItem('clientes');
  alert('Dados apagados!');
  mostrarClientes();
}

window.onload = () => {
  if (document.getElementById('produtos')) carregarProdutos();
  if (document.getElementById('clientes')) mostrarClientes();
};
