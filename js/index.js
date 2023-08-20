// 1. Obtener datos de API

const JSON_API_URL = 'https://jsonplaceholder.typicode.com/posts'

async function getDataFromApi() {
    // Por defecto, el método utilizado por fetch es GET
    const response = await fetch(JSON_API_URL)

    // Obtenemos el cuerpo de la petición en forma de array
    const posts = await response.json()

    // Mostramos sólo los tres primeros
    
    console.group("Datos recibidos de API: ")
    console.log(
        posts.slice(0, 3)
    );
    console.groupEnd();
}

// 2. Enviar datos al servidor

const POST_TO_SEND = {
    title: 'Un título interesante para un post',
    body: 'Lorem ipsum dolor sit amet'
};

async function sendDataToServer() {

    const response = await fetch(JSON_API_URL, {
        // Esta vez, elegimos el método POST
        method: 'POST',
        // Dejamos al navegador inferir el tipo
        // de contenido como JSON pasándole un objeto
        body: POST_TO_SEND,
    });   
    
    console.group("Respuesta del servidor al enviar datos: ");
    console.log(response);
    console.log("Cuerpo de la respuesta: ");
    console.log(await response.json())
    console.groupEnd();
}

// 3. Descargar una imagen 

// Esta URL expone un servicio para permitir CORS...
const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"

// ...puesto que este dominio no admite tales peticiones
const IMAGE_URL = "https://via.placeholder.com/150";

const imageContainer = document.querySelector("#image");

const renderImage = (url) => `
    <img src=${url} class="p-3 m-5" alt="Imagen de muestra">
`

async function downloadImage() {
    const completeUrl = new URL(CORS_ANYWHERE + IMAGE_URL);
    const response = await fetch(completeUrl);
    // Obtenemos la imagen como un Blob,
    // que representa datos binarios crudos
    const blob = await response.blob();

    // Transformamos el blob en una URL de objeto
    const objectUrl = URL.createObjectURL(blob);

    imageContainer.innerHTML = renderImage(objectUrl);
}



// Configuración de manejadores de eventos

/**
 * Función que toma un callback a ejecutar que retorna una promesa
 * que puede ser rechazada, y muestra al usuario distintos mensajes
 * según el resultado de llamar tal función
 * 
 * @param {() => Promise<void>} callback - Función a ejecutar
 * @param {{ sucessTitle: string, successBody: string }} messages - 
 * Título y mensaje a mostrar en caso de éxito 
 */
async function reportToUser(callback, messages) {
    // Si no se proporciona un título, elegimos uno genérico
    const {
        successTitle = 'Operación finalizada con éxito',
        sucessBody = ''
    } = messages;
    try {
        await callback();
        Swal.fire({
            icon: 'success',
            title: successTitle,
            text: sucessBody
        });
    } catch(error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.message || String(error)
        });
    }
}

const ex1Btn = document.querySelector('#ex1-btn');
const ex2Btn = document.querySelector('#ex2-btn');
const ex3Btn = document.querySelector('#ex3-btn');

ex1Btn.addEventListener('click', () => {
    reportToUser(getDataFromApi, {
        sucessTitle: 'Datos encontrados con éxito',
        sucessBody: 'Revise la consola para ver los datos'
    });
});

ex2Btn.addEventListener('click', () => {
    reportToUser(sendDataToServer, {
        sucessTitle: 'Datos envíados correctamente',
        sucessBody: 'Abra la consola para ver la respuesta'
    });
})

ex3Btn.addEventListener('click', () => {
    reportToUser(downloadImage, {
        successTitle: 'Imagen descargada correctamente',
        successBody: 'Puede ver la imagen abajo...'
    });
})

