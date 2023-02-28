## Juego de Memoria Rick and Morty

Para la resolución del code challenge decidí hacer uso de Context API para el manejo global del state de las cartas, junto con el puntaje y los turnos, esto me permitió saber en qué momento de la partida estoy y así poder implementar la lógica detrás de las cartas y el proceso de verificación de las mismas.

El razonamiento para atacar este reto se basó en el uso de un arreglo de objetos auxiliar, el cual me permite verificar las dos cartas que han sido seleccionadas previamente, cada vez que el usuario hace click en una carta volteada, los datos de la misma se agregan a este arreglo auxiliar y así, mediante un useEffect, puedo verificar ambas cartas y determinar si son o no iguales.

Para el manejo de la espera luego de seleccionar dos cartas, hice uso de un setTimeOut el cual me permitió consumir 1 segundo y luego ejecutar las acciones pertinentes, esta lógica aplica para el caso de ser iguales las cartas o ser diferentes. Cuando las cartas son iguales, filtro el arreglo original con todas las cartas eliminando las cartas seleccionadas, usando el nombre como key. Para el caso contrario, manejo un state local llamado wrongAnswer, el cual me permite avisarle al componente Card que debe voltear las cartas nuevamente a su estado original.

Decidí hacer uso de la API de GraphQL ya que me permite solicitar sólo los datos que necesito para la vista del cliente, así como también facilita el manejo de las excepciones del lado del cliente, ya que provee los estados en que puede estar la petición.

## Setup

```
$ cd ../project_folder
$ npm install
$ npm start
```
