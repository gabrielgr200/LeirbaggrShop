const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


document.getElementById('registrationForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const response = await fetch('https://api-ecommerce-l0vi.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    });

    const data = await response.json();

    showNotification(data.mensagem);
    if (response.ok) {
      event.target.reset();
    }
  } catch (error) {
    console.error(error);
    showNotification('Erro ao processar a requisição.');
  }
});

function showNotification(message) {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        const notification = new Notification('Cadastro', {
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