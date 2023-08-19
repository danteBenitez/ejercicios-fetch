# Ejercicios utilizando la función `fetch()` del navegador

Parte práctica de trabajo de investigación del método `fetch()` en JavaScript.

Los ejercicios propuestos fueron los siguientes:
1. Realiza una solicitud `GET` a la siguiente API de muestra y muestra por consola los
primeros tres elementos del array obtenido: [https://jsonplaceholder.typicode.com/posts](`https://jsonplaceholder.typicode.com/posts`).

2. Crea una solicitud `POST` a la misma API de muestra, enviando un objeto JSON con un
título y un cuerpo de contenido. Muestra por consola la respuesta obtenida.

3. Realiza una solicitud `GET` para obtener una imagen de muestra desde esta URL:
[https://via.placeholder.com/150](`https://via.placeholder.com/150). Luego, muestra la imagen en una etiqueta `<img>` en tu
página.

## Aclaraciones

La URL especificada en la tercera de las actividades falla al intentar realizar una petición CORS, puesto que la respuesta no coloca los encabezados adecuados. Para sortear este obstáculo, se usó el servicio prestado por [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com/), que permite la solicitud correspondiente con el encabezado correcto.