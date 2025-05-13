
function adicionarAoCarrinho(produto, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ produto, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(produto + " adicionado ao carrinho!");
}

function mostrarCarrinho() {
  const container = document.getElementById('carrinho');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    container.innerHTML = "<p>O carrinho está vazio.</p>";
    return;
  }
  let html = "<ul>";
  let total = 0;
  carrinho.forEach(item => {
    html += `<li>${item.produto} - R$ ${item.preco.toFixed(2)}</li>`;
    total += item.preco;
  });
  html += "</ul>";
  html += `<p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>`;
  container.innerHTML = html;
}

function finalizarPedido() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert("O carrinho está vazio.");
    return;
  }
  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";
  carrinho.forEach(item => {
    mensagem += `- ${item.produto} (R$ ${item.preco.toFixed(2)})%0A`;
  });
  let total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  window.open("https://wa.me/5541999999999?text=" + mensagem, "_blank");
}

if (window.location.pathname.includes("carrinho.html")) {
  window.onload = mostrarCarrinho;
}
