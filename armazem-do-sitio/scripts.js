let carrinho = [];

function filtrarCategoria(categoria) {
  // Sua implementação atual para filtrar produtos
}

function atualizarContadorCarrinho() {
  document.getElementById("carrinho-count-flutuante").textContent = carrinho.length;
}

function toggleCarrinho() {
  const popup = document.getElementById("carrinho-popup");
  if (popup.style.display === "flex") {
    popup.style.display = "none";
    voltarParaCarrinho(); // reseta o formulário
  } else {
    popup.style.display = "flex";
  }
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

  let msg = "📦 *Pedido do Armazém do Sítio*%0A%0A";
  carrinho.forEach(item => {
    msg += `• ${item.nome} - ${item.quantidade} ${item.unidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
  });

  const total = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
  msg += `%0ATotal: R$ ${total.toFixed(2)}%0A%0A`;
  msg += `👤 *Cliente:*%0ANome: ${nome}%0ACPF: ${cpf}%0APagamento: ${pagamento}%0A`;

  if (tipoEntrega === "entrega") {
    msg += `Telefone: ${telefone}%0AEndereço: ${endereco}%0A`;
  } else {
    msg += "Tipo: Retirada na loja%0A";
  }

  const link = "https://wa.me/5541999999999?text=" + encodeURIComponent(msg);
  window.open(link, "_blank");

  // Limpa e fecha o pop-up
  carrinho = [];
  atualizarContadorCarrinho();
  document.getElementById("carrinho-popup").style.display = "none";
  voltarParaCarrinho();
}

// Fecha o pop-up ao clicar fora do conteúdo
document.getElementById("carrinho-popup").onclick = function() {
  this.style.display = "none";
  voltarParaCarrinho();
};
document.querySelector(".popup-content").onclick = function(e) {
  e.stopPropagation();
};
