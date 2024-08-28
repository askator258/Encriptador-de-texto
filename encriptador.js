const d = document;
const textArea = d.querySelector(".form_input");
const imagenMuneco = d.querySelector(".result_img");
const loaderBatman = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result_title");
const resultadoText = d.querySelector(".result_text");
const botonEncriptar = d.querySelector(".form_btn[value='Encriptar']");
const botonDesencriptar = d.querySelector(".form_btn[value='Desencriptar']");
const botonCopiar = d.querySelector(".form_btn.form_btn--secundary.hidden");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encriptarmensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Manejar el estado de la imagen según el contenido del textarea
function manejarImagenMuneco() {
    if (textArea.value.trim() === "") {
        imagenMuneco.style.display = "block";  // Muestra la imagen si no hay texto
    } else {
        imagenMuneco.style.display = "none";  // Oculta la imagen si hay texto
    }
}

textArea.addEventListener("input", (e) => {
    loaderBatman?.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando Mensaje";
    resultadoText.textContent = "";
    manejarImagenMuneco();  // Maneja la imagen al escribir
});

botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarmensaje(mensaje);
    resultadoText.textContent = mensajeEncriptado;
    botonCopiar?.classList.remove("hidden");
    manejarImagenMuneco();  // Vuelve a manejar la imagen
});

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    botonCopiar?.classList.remove("hidden");
    manejarImagenMuneco();  // Vuelve a manejar la imagen
});

botonCopiar.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(resultadoText.textContent).then(() => {
        alert("Texto copiado al portapapeles");
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    manejarImagenMuneco();  // Verifica el estado de la imagen al cargar la página
});
