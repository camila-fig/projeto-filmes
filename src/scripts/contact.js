function save_form(){
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message")

    var dados = JSON.parse(localStorage.getItem("dados_user"))

    if(dados == null){
        localStorage.setItem("dados_user", "[]");
        dados = [];
    }

    var informacoes = {
        nome: name.value,
        email: email.value,
        menssagem: message.value
    }

    dados.push(informacoes);

    localStorage.setItem("dados_user", JSON.stringify(dados));

    alert("Sua mensagem foi enviada com sucesso! Em breve retornaremos seu contato.")
}

// localStorage.clear()
