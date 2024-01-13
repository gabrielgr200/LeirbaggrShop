document.addEventListener('DOMContentLoaded', function () {
    var userToken = localStorage.getItem('userToken');
  
    if (!userToken) {
      console.error('User token not found');
      alert('User token not found. Please log in.');
      return;
    }

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

      data.produtos.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><i class="fa-regular fa-circle-xmark" id="remove"></i></td>
          <td><img src="${product.image || ''}" id="image" alt=""></td>
          <td id="name">${product.name || 'N/A'}</td>
          <td id="price">${formatCurrency(product.price)}</td>
          <td><input type="number" name="quantity" id="quantity" readonly min="0" value="${product.quantity || 0}" onChange="updateSubtotal(this)"></td>
          <td class="subtotal">${calculateSubtotal(product.price, product.quantity)}</td>
        `;
        userProductsTableBody.appendChild(newRow);
      });
    })
    .catch(error => {
      console.error(error);
      // alert('Error fetching user-selected products. Please try again later.');
    });
  
    function formatCurrency(value) {
      return value ? 'R$ ' + parseFloat(value).toFixed(2) : 'N/A';
    }

    function calculateSubtotal(price, quantity) {
      return (price && quantity) ? 'R$ ' + (price * quantity).toFixed(2) : 'N/A';
    }
  });

  function updateSubtotal(input) {
    const row = input.closest('tr');
    const price = parseFloat(row.querySelector('#price').textContent.replace('R$', '').trim());
    const quantity = parseInt(input.value);
    const subtotalCell = row.querySelector('.subtotal');
    subtotalCell.textContent = calculateSubtotal(price, quantity);
  }
  