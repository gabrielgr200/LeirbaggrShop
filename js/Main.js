const shopIcon = document.getElementById('shop');
const addToCartIcons = document.querySelectorAll('.addToCart');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

shopIcon.addEventListener('click', function () {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

addToCartIcons.forEach(icon => {
  icon.addEventListener('click', function () {
    const productImage = icon.closest('.pro').querySelector('img').src;
    const productName = icon.closest('.pro').querySelector('h5').innerText;
    const productPrice = parseFloat(icon.closest('.pro').querySelector('h4').innerText.replace(/[^\d.-]/g, ''));
    const content = `
      <img src="${productImage}" alt="${productName}">
      <h5>${productName}</h5>
      <label for="quantity">Quantidade:</label>
      <input type="number" id="quantity" value="1">
      <p id="totalPrice">Preço: R$ ${productPrice.toFixed(2)}</p>
    `;
    modalContent.innerHTML = content;

    modal.style.display = 'block';

    const quantityInput = document.getElementById('quantity');
    quantityInput.min = '0';

    quantityInput.addEventListener('input', function () {
      const totalPriceElement = document.getElementById('totalPrice');
      const totalPrice = productPrice * quantityInput.value;
      totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
    });
  });
});

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});