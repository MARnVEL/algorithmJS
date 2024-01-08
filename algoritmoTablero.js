/* 
CONSIGNA/PROBLEMA:
Un muchacho se entretiene pintando su tablero de ajedrez. Planea cubrir cada espacio por completo en tonos rojos o azules. Para darle un toque personal, quiere contar con igual cantidad de espacios rojos y azules, evitando a su vez que dos filas o columnas presenten el mismo número de espacios rojos. ¿Podría pintar el tablero siguiendo estos criterios? ¿Qué pasaría si, en lugar de un tablero de ajedrez tradicional de 8x8, tuviera uno enorme de 1000x1000?

Es fundamental que incluyas y expliques el razonamiento y/o el código usado para encontrar la solución.

ANÁLISIS
Extracción de info:
  - tablero de ajedrez
  - IGUAL cantidad de espacios rojos y azules -> La cantidad total de casillas debe ser par
  - evitando a su vez que dos filas o columnas presenten el mismo número de espacios rojos
*/

// Creamos una variable para guardar los colores con los que se pintarán las casillas
const colores = ["A", "R"];

const inicializarTablero = (n) => {
  const tablero = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      // Inicializamos el tablero con todas las casillas con un string vacio.
      row.push("");
    }
    tablero.push(row);
  }

  return tablero;
}

const pintarTableroAjedrez = (n) => {
  // Si el número de filas (o columnas) no es par, no será posible resolver el problema.
  if (n % 2 !== 0) {
    const message = 'No se puede resolver el problema, la cantidad de filas debe ser par!'
    console.log(message);

    // Para mantener consistencia con lo que devuelve la fn, inicializamos el tablero
    //* Inicializamos el tablero con espacios (strings) en blanco.
    const tablero = inicializarTablero(n)
    return tablero
  }

  //* Inicializamos el tablero con espacios (strings) en blanco.
  const tablero = inicializarTablero(n)
  // console.log('El tablero inicializado: ', tablero);

  //* Asignamos el color rojo a los espacios de la primera fila.
  for (let i = 0; i < n; i++) {
    tablero[0][i] = colores[1];
  }
  // console.log('El tablero con 1 fila en rojo: ', tablero);

  //* Asignamos el color azul a los espacios de la primera columna.
  for (let i = 0; i < n; i++) {
    tablero[i][0] = colores[0];
  }
  // console.log('El tablero con primer columna en azul: ', tablero);

  //* Pintamos el resto del tablero alternando los colores.
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if ((i + j) % 2 === 0) {
        tablero[i][j] = colores[1];
      } else {
        tablero[i][j] = colores[0];
      }
    }
  }

  return tablero;
}


// *************** CÓDIGO PARA ANALIZAR Y VERIFICAR RESULTADOS **************
const verificarMatriz = (matriz) => {
  // Verificamos que la matriz tenga un tamaño mayor o igual a 2
  if (matriz.length <= 1) {
    return false;
  }

  let cantidadRojasFilaIMenosUno = 0
  let cantidadRojasColumnaJMenosUno = 0
  // Verificamos que las filas consecutivas tengan un número diferente de R y B
  for (let i = 0; i < matriz.length; i++) {
    let contadorR = 0;
    let contadorB = 0;
    for (let j = 0; j < matriz[0].length; j++) {
      if (matriz[i][j] === "R") {
        contadorR++;
      } else if (matriz[i][j] === "A") {
        contadorB++;
      }
    }

    if (i !== 0 && contadorR === cantidadRojasFilaIMenosUno) {
      console.log('No hay dos filas consecutivas con distinta cantidad de casillas rojas');
      console.log(`La condición no se cumple entre las filas ${i-1} y ${i}`);
      return false
    }
    cantidadRojasFilaIMenosUno = contadorR
  }

  // Verificamos que las columnas consecutivas tengan un número diferente de R
  for (let i = 0; i < matriz[0].length; i++) {
    let contadorR = 0;
    let contadorB = 0;
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[j][i] === "R") {
        contadorR++;
      } else if (matriz[j][i] === "A") {
        contadorB++;
      }
    }

    if (i !== 0 && contadorR === cantidadRojasColumnaJMenosUno) {
      console.log('No hay dos columnas consecutivas con distinta cantidad de casillas rojas');
      console.log(`La condición no se cumple entre las columnas ${i-1} y ${i}`);
      return false
      
    }
    cantidadRojasColumnaJMenosUno = contadorR
  }

  // Si llegamos a este punto, la matriz cumple la condición
  return true;
}


const analizarTablero = (array) => {
  const cantidadFilas = array.length
  const cantidadColumnas = array[0].length
  const cantidadCasillas = cantidadFilas * cantidadColumnas
  const cantidadRojasObjetivo = cantidadCasillas / 2
  // const cantidadAzulesObjetivo = cantidadCasillas - cantidadRojasObjetivo
  let cantidadRojas = 0
  let cantidadAzules = 0

  for (let i = 0; i < cantidadFilas; i++) {
    // let contadorRojas = 0;
    // let contadorAzules = 0;
    for (let j = 0; j < cantidadColumnas; j++) {

      if (array[i][j] === colores[0]) {
        cantidadAzules++
      } else if (array[i][j] === colores[1]) {
        cantidadRojas++
      }
    }
  }

  const verificaCondicion = verificarMatriz(array)

  return [cantidadAzules, cantidadRojas, verificaCondicion]
}

// *************** FIN CÓDIGO PARA ANALIZAR Y VERIFICAR RESULTADOS **************

//! ************ PREBAS Y RESULTADOS ******************************
const min = 8
const max = 12
for (let index = min; index <= max; index++) {

  console.log('');
  console.log(`      ************ n = ${index} ************      `);
  const tablero = pintarTableroAjedrez(index)
  const checkCondition = analizarTablero(tablero)

  console.log(
    `El tablero de ${index}x${index} analizado queda de la siguiente manera: `,
    tablero
  );
  if (checkCondition[2]) {
    console.log(
      `El tablero de ${index}x${index} analizado cumple la condición de tener filas y/o columnas consecutivas con diferente cantidad de casillas rojas.`
    );
    console.log(
      `La cantidad de casillas rojas es: ${checkCondition[1]}`
    );
    console.log(
      `La cantidad de casillas azules es: ${checkCondition[0]}`
    );
  } else {
    console.log(
      `El tablero de ${index}x${index} analizado **NO CUMPLE** la condición de tener filas y/o columnas consecutivas con diferente cantidad de casillas rojas.`
    );
    console.log(
      `La cantidad de casillas rojas es: ${checkCondition[1]}`
    );
    console.log(
      `La cantidad de casillas azules es: ${checkCondition[0]}`
    );
  }
}

// Prueba con matríz cuadrada de filas pares pero que no cumple la condición de filas consecutivas con distinta cantidad de casillas rojas
const tablero = [
  ["A", "A", "R", "R", "A", "A", "R", "R"],
  ["A", "R", "R", "R", "A", "A", "R", "R"],
  ["R", "A", "A", "R", "R", "A", "R", "R"],
  ["R", "A", "A", "R", "A", "A", "R", "R"],
  ["R", "A", "A", "R", "A", "A", "R", "R"],
  ["R", "A", "A", "R", "A", "A", "R", "R"],
  ["R", "A", "A", "R", "A", "A", "R", "R"],
  ["R", "A", "A", "R", "A", "A", "R", "R"],
]
console.log('');
console.log(`      ************ n = 8 ************      `);
const checkCondition = analizarTablero(tablero)

console.log(`El tablero de 8x8 analizado queda de la siguiente manera: `, tablero);
if (checkCondition[2]) {
  console.log(
    `El tablero de 8x8 analizado cumple la condición.`
  );
  console.log(
    `La cantidad de casillas rojas es: ${checkCondition[1]}`
  );
  console.log(
    `La cantidad de casillas azules es: ${checkCondition[0]}`
  );
} else {
  console.log(
    `El tablero de 8x8 analizado *NO* cumple la condición.`
  );
  console.log(
    `La cantidad de casillas rojas es: ${checkCondition[1]}`
  );
  console.log(
    `La cantidad de casillas azules es: ${checkCondition[0]}`
  );
}

