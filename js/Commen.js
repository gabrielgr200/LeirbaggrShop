async function enviarComentario() {
    const validation = document.getElementById("validation").value;
    const comment = document.getElementById("comment").value;

    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch("https://apiecommerce-316ae4f1fc8b.herokuapp.com/comentarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                comment,
                validation
            })
        });

        const data = await response.json();

        if (response.ok) {
            mostrarNotificacao("Comentário enviado com sucesso!", "success");
        } else {
            mostrarNotificacao(`Erro ao enviar o comentário: ${data.mensagem}`, "error");
        }
    } catch (error) {
        console.error(error);
        mostrarNotificacao("Erro ao enviar o comentário. Por favor, tente novamente.", "error");
    }
}

function mostrarNotificacao(mensagem, tipo) {
    const icones = {
        success: "assets/notification.png",
        error: "assets/erro.png"
    };

    const notificacao = new Notification("Notificação de Comentário", {
        body: mensagem,
        icon: icones[tipo],
    });
    notificacao.onclick = function () {
        console.log("Notificação clicada");
    };
}

if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission !== "granted") {
            console.warn("Permissão de notificação não concedida.");
        }
    });
}