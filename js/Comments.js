document.addEventListener("DOMContentLoaded", function () {
    fetch("https://apiecommerce-316ae4f1fc8b.herokuapp.com/listar-comentarios")
        .then(response => response.json())
        .then(data => {
            var container = document.getElementById("testimonials-container");

            if (container && data.comentarios && data.comentarios.length > 0) {
                data.comentarios.forEach(function (comentario) {
                    var testimonialBox = `
                        <div class="testimonials-box">
                            <div class="box-top">
                                <div class="profile">
                                    <div class="name-user">
                                        <strong>${comentario.cadastro.name}</strong>
                                    </div>
                                </div>
                                <div class="reviews">
                                    <label class="validation">Nota:</label>
                                    <input type="number" name="validation" value="${comentario.validation}" readonly>
                                </div>
                            </div>
                            <div class="client-comment">
                                <p>${comentario.comment}</p>
                            </div>
                        </div>
                    `;

                    container.insertAdjacentHTML('beforeend', testimonialBox);
                });
            } else {
                console.error("Sem comentários disponíveis ou contêiner não encontrado.");
                console.log("Container:", container);
                console.log("Data:", data);
            }
        })
        .catch(error => {
            console.error(error);
            var container = document.getElementById("testimonials-container");
            if (container) {
                container.innerHTML = "<p>Erro ao obter comentários.</p>";
            } else {
                console.error("Contêiner não encontrado para exibir mensagem de erro.");
            }
        });
});