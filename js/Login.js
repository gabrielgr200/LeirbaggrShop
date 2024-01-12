document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch('https://web-production-bccd.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      const data = await response.json();

      showNotification(data.mensagem);

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        setTimeout(() => {
          window.location.href = '/pages/Home/Home.html';
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar a requisição.');
    }
  });

  function showNotification(message) {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          const notification = new Notification('Login', {
            body: message,
            icon: 'assets/notification.png', 
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      });
    }
  }