document.addEventListener('DOMContentLoaded', function () {
  var addToCartBtn = document.getElementById('addToCartBtn');

  addToCartBtn.addEventListener('click', function () {

    var name = document.querySelector('.title').textContent.trim();
    var price = parseFloat(document.querySelector('.value').textContent.replace('R$', '').trim());
    var quantity = parseInt(document.getElementById('valor').value);
    var image = document.getElementById('slide').src;

    if (quantity < 1 || isNaN(quantity)) {
      console.error('Invalid quantity');
      showNotification('Quantidade inválida', 'Por favor, insira uma quantidade válida.');
      return;
    }

    var userToken = localStorage.getItem('userToken');

    if (!userToken) {
      console.error('User token not found');

      return;
    }

    var productData = {
      name: name,
      price: price,
      quantity: quantity,
      image: image
    };

    fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      showNotification('Compra bem-sucedida', 'Produto adicionado ao carrinho com sucesso.');
    })
    .catch(error => {
      console.error(error);
      showNotification('Erro na compra', 'Ocorreu um erro ao adicionar o produto ao carrinho.');
    });
  });

  function showNotification(title, message) {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          var options = {
            body: message
          };
          var notification = new Notification(title, options);
        }
      });
    }
  }
});