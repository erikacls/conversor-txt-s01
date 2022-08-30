
const inputTexto = document.querySelector(".input-texto");
const resultado = document.querySelector(".resultado");

const contErros = document.querySelector(".cont-erros");

document.querySelector('#btnEncriptar').onclick = btnEncriptar;
document.querySelector('#btnDesencriptar').onclick = btnDesencriptar;

document.querySelector('#btnCopiar').onclick = copiar;
document.querySelector('#btnOuvir').onclick = ouvir;

document.querySelector('.botoes').onclick = somClick;

//Funções

function validarMensagem() {
    //Limpa erros prévios
    let errosPrevios = contErros.querySelectorAll(".erro");
    
    for (let err of errosPrevios) {
        contErros.removeChild(err);
    }

    var mensagem = inputTexto.value;
    let letrasValidas = "abcdefghijklmnopqrstuvxwyz ";
    let mensagemErro = document.createDocumentFragment();

    for (let letra of mensagem) {
        if (!letrasValidas.includes(letra)) {
            let p = document.createElement("p");
            p.setAttribute("class", "erro");
            //p.textContent = 'O caracter ' + "'" + letra + "'" + " não é válido";
            p.textContent = `Caracter "${letra}" inválido`;
            mensagemErro.appendChild(p);
        }
    }
    
    contErros.appendChild(mensagemErro);

        if (contErros.children.length === 0) {
        return true;
    }
        return false;
}

function btnEncriptar() {

    if (!validarMensagem()) return;
    
    const textoEncriptado = encriptar(inputTexto.value)
    
    if(textoEncriptado == "") {
        //SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que algo deu errado!',
            footer: 'Digite algo para encriptar!'
          })
        return textoEncriptado
    }

    resultado.value = textoEncriptado
}

function encriptar(stringEncriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringEncriptada = stringEncriptada.toLowerCase();

    for(let i= 0; i < matrizCodigo.length; i++) {
        if(stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
        return stringEncriptada;
}

function btnDesencriptar() {

    if (!validarMensagem()) return;

    const textoDesencriptado = desencriptar(inputTexto.value)

    if(textoDesencriptado == "") {
        Swal.fire({ //alert("")
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que algo deu errado!',
            footer: 'Tente encriptar um texto!'
          })
        return textoDesencriptado
    }

    resultado.value = textoDesencriptado
}

function desencriptar(stringDesencriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for(let i=0; i < matrizCodigo.length; i++) {
        if(stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
        return stringDesencriptada;
}

function copiar() {

    let stringEncriptada = resultado.value;
    
    navigator.clipboard.writeText(stringEncriptada);
    inputTexto.value = "";
    inputTexto.focus();

    if (stringEncriptada == "") {
        //SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que algo deu errado!',
            footer: 'O campo está vazio'
          })

        return false;

    } else {
        Swal.fire(
        'Copiado com sucesso! :)',
        'Guarde sua chave com segurança.',
        'success'
        )

        return true;
    }
}

function ouvir() {
    let stringEncriptada = resultado.value;
    let msg = new SpeechSynthesisUtterance();
    msg.text = stringEncriptada;
    msg.lang = "pt-Br";
    window.speechSynthesis.speak(msg);
}

function somClick() {
    document.querySelector('#click').play();
}