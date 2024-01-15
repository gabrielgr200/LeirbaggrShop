document.addEventListener('DOMContentLoaded', function () {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    console.error('User token not found');
    alert('User token not found. Please log in.');
    return;
  }

  function fetchPayments() {
    fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/payments', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user payments');
        }
        return response.json();
      })
      .then(data => {
        updatePaymentSummary(data.pagamentos);
      })
      .catch(error => {
        console.error(error);
        alert('Error fetching user payments. Please try again later.');
      });
  }

  function updatePaymentSummary(payments) {
    const subtotalElement = document.getElementById('subtotal');
    const freightElement = document.getElementById('freight');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');

    let subtotal = 0;
    let freight = 0;
    let discount = 0;
    let total = 0;

    payments.forEach(payment => {
      subtotal += parseFloat(payment.subtotal);
      freight += parseFloat(payment.freight);
      discount += parseFloat(payment.discount);
      total += parseFloat(payment.total);
    });

    subtotalElement.textContent = 'SubTotal: R$ ' + subtotal.toFixed(2);
    freightElement.textContent = 'R$ ' + freight.toFixed(2);
    discountElement.textContent = 'R$ ' + discount.toFixed(2);
    totalElement.textContent = 'R$ ' + total.toFixed(2);
  }

  function showNotification() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Compra realizada com sucesso!', {
            body: 'Sua compra foi aprovada. Obrigado por comprar conosco!',
            icon: '/assets/success.png'
          });
        }
      });
    }
  }

  function redirectToHomePage() {
    window.location.href = '/pages/Home/Home.html';
  }

  document.getElementById('buyButton').addEventListener('click', function () {
    showNotification();
    setTimeout(redirectToHomePage, 3000);
  });

  fetchPayments();
});
