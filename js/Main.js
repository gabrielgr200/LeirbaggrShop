const shopIcon = document.getElementById('shop');
const addToCartIcons = document.querySelectorAll('.addToCart');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

// Função para abrir o modal quando o ícone for clicado
shopIcon.addEventListener('click', function () {
  modal.style.display = 'block';
});

// Função para fechar o modal quando o botão 'Fechar' for clicado
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Adicionando evento de clique para cada ícone addToCart
addToCartIcons.forEach(icon => {
  icon.addEventListener('click', function () {
    // Obtendo informações do produto
    const productImage = icon.closest('.pro').querySelector('img').src;
    const productName = icon.closest('.pro').querySelector('h5').innerText;
    const productPrice = parseFloat(icon.closest('.pro').querySelector('h4').innerText.replace(/[^\d.-]/g, ''));

    // Criando o conteúdo dinâmico do modal
    const content = `
      <img src="${productImage}" alt="${productName}">
      <h5>${productName}</h5>
      <label for="quantity">Quantidade:</label>
      <input type="number" id="quantity" value="1">
      <p id="totalPrice">Preço: R$ ${productPrice.toFixed(2)}</p>
    `;
    modalContent.innerHTML = content;

    // Abrindo o modal
    modal.style.display = 'block';

    // Selecionando o input de quantidade
    const quantityInput = document.getElementById('quantity');
    quantityInput.min = '0'; // Impedindo números negativos

    // Atualizando o total quando a quantidade é alterada
    quantityInput.addEventListener('input', function () {
      const totalPriceElement = document.getElementById('totalPrice');
      const totalPrice = productPrice * quantityInput.value;
      totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
    });
  });
});

// Função para fechar o modal quando o botão 'Fechar' é clicado
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});