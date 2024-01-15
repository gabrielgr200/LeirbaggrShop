var userToken;

document.addEventListener('DOMContentLoaded', function () {
  userToken = localStorage.getItem('userToken');

  if (!userToken) {
    console.error('User token not found');
    alert('User token not found. Please log in.');
    return;
  }

  function fetchProductsAndUpdateTable() {
    fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user-selected products');
        }
        return response.json();
      })
      .then(data => {
        const userProductsTableBody = document.querySelector('#userProductsTable tbody');
        userProductsTableBody.innerHTML = '';

        let subtotal = 0;

        data.produtos.forEach(product => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td><i class="fa-solid fa-trash" id="remove" onclick="removeProduct(${product.id})"></i></td>
            <td><img src="${product.image || ''}" id="image" alt=""></td>
            <td id="name">${product.name || 'N/A'}</td>
            <td id="price">${formatCurrency(product.price)}</td>
            <td><input type="number" name="quantity" id="quantity" readonly min="0" value="${product.quantity || 0}" onChange="updateSubtotal(this)"></td>
            <td class="subtotal">${calculateSubtotal(product.price, product.quantity)}</td>
          `;
          userProductsTableBody.appendChild(newRow);

          subtotal += parseFloat(product.price) * parseInt(product.quantity);
        });

        document.getElementById('subtotalAmount').textContent = formatCurrency(subtotal);
        document.getElementById('totalAmount').textContent = formatCurrency(subtotal);
      })
      .catch(error => {
        console.error(error);
        // alert('Error fetching user-selected products. Please try again later.');
      });
  }

  window.removeProduct = function(productId) {
    if (confirm('Você realmente deseja remover este produto do carrinho?')) {
      fetch(`https://apiecommerce-316ae4f1fc8b.herokuapp.com/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error deleting the product');
          }
          return response.json();
        })
        .then(data => {
          fetchProductsAndUpdateTable();
          showNotification('Produto removido com sucesso!');
        })
        .catch(error => {
          console.error(error);
          alert('Error deleting the product. Please try again later.');
        });
    }
  };

  function formatCurrency(value) {
    return value ? 'R$ ' + parseFloat(value).toFixed(2) : 'N/A';
  }

  function calculateSubtotal(price, quantity) {
    return (price && quantity) ? 'R$ ' + (price * quantity).toFixed(2) : 'N/A';
  }

  function applyCoupon() {
    const cupomInput = document.querySelector('#cupom');
    const cupomValue = cupomInput.value.trim().toLowerCase();

    const subtotalAmountElement = document.getElementById('subtotalAmount');
    const subtotal = parseFloat(subtotalAmountElement.textContent.replace('R$', '').trim());

    if (cupomValue) {
      const discount = subtotal * 0.10;
      const discountedTotal = subtotal - discount;

      document.getElementById('discountAmount').textContent = formatCurrency(discount);
      document.getElementById('totalAmount').textContent = formatCurrency(discountedTotal);

      cupomInput.value = '';

      showNotification('Cupom aplicado com sucesso! Desconto de 10% aplicado.');
    } else {
      alert('Cupom inválido. Por favor, tente novamente.');
    }
  }

  function finalizePurchase() {
    const subtotal = parseFloat(document.getElementById('subtotalAmount').textContent.replace('R$', '').trim());
    const freight = parseFloat(document.getElementById('freight').textContent.replace('R$', '').trim());
    const discount = parseFloat(document.getElementById('discountAmount').textContent.replace('R$', '').trim());
    const total = parseFloat(document.getElementById('totalAmount').textContent.replace('R$', '').trim());

    const pagamentoData = {
      subtotal,
      freight,
      discount,
      total,
    };

    fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      body: JSON.stringify(pagamentoData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error finalizing the purchase');
        }
        return response.json();
      })
      .then(data => {
        document.querySelector('#userProductsTable tbody').innerHTML = '';
        fetchProductsAndUpdateTable();
        document.getElementById('subtotalAmount').textContent = 'R$ 0.00';
        document.getElementById('freight').textContent = 'R$ 0.00';
        document.getElementById('discountAmount').textContent = 'R$ 0.00';
        document.getElementById('totalAmount').textContent = 'R$ 0.00';
        window.location.href = '/pages/Payment/Payment.html';
      })
      .catch(error => {
        console.error(error);
        alert('Error finalizing the purchase. Please try again later.');
      });
  }

  function showNotification(message) {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Cupom aplicado', {
            body: message,
            icon: '/assets/cupom.webp'
          });
        }
      });
    }
  }

  fetchProductsAndUpdateTable();

  document.querySelector('#coupon button').addEventListener('click', applyCoupon);
  document.querySelector('#ckeckount').addEventListener('click', finalizePurchase);
});
