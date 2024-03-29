document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
});

async function fetchUserData() {
    try {
        const response = await fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/user', {
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
        alert('Token não encontrado ou expirado. Por favor entre.');
        window.location.href = '/index.html';
    }
}

async function deleteAccount() {
    try {
        const response = await fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/user', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            const modalMessage = document.getElementById('modalMessage');
            modalMessage.innerText = 'Conta excluída com sucesso.';

            const modal = document.getElementById('myModal');
            modal.style.display = 'block';

            setTimeout(() => {
                window.location.href = '/index.html';
            }, 3000);
        } else {
            const data = await response.json();
            alert(data.mensagem);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir a conta.');
    }
}

function openChangePasswordModal() {
    const modal = document.getElementById('test');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('test');
    modal.style.display = 'none';
}

async function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    try {
        const response = await fetch('https://apiecommerce-316ae4f1fc8b.herokuapp.com/user/password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({ newPassword })
        });

        if (response.ok) {
            closeModal();
            alert('Senha alterada com sucesso!');
        } else {
            const data = await response.json();
            alert(data.mensagem);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao alterar a senha.');
    }
}
