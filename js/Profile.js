document.addEventListener('DOMContentLoaded', () => {
  fetchUserData();
});

async function fetchUserData() {
  try {
      const response = await fetch('https://web-production-bccd.up.railway.app/user', {
          headers: {
              Authorization: `Bearer ${getToken()}`
          }
      });

      const data = await response.json();

      if (response.ok) {
          displayUserData(data.user);
      } else {
          alert(data.mensagem);
      }
  } catch (error) {
      console.error(error);
      alert('Erro ao buscar dados do usuário.');
  }
}

function displayUserData(user) {
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
}

function getToken() {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
      return userToken;
  } else {
      alert('Token not found or expired. Please log in.');
      window.location.href = '/index.html';
  }
}

async function deleteAccount() {
  try {
      const response = await fetch('https://web-production-bccd.up.railway.app/user', {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${getToken()}`
          }
      });

      if (response.ok) {
          alert('Conta excluída com sucesso.');
      } else {
          const data = await response.json();
          alert(data.mensagem);
      }
  } catch (error) {
      console.error(error);
      alert('Erro ao excluir a conta.');
  }
}