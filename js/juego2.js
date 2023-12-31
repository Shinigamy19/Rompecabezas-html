var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var posicionVacia = {
  fila:2,
  columna:2
};

function chequearSiGano() {
  var contador=1;
    for (var i = 0; i < grilla.length; i++) {
      for (var j = 0; j < grilla[i].length; j++) {
        if (grilla[i][j]!=contador) {
          return false;
        }
      contador++;
    }
  }
  return true;
}

function mostrarCartelGanador(){
   var juego=document.getElementById("juego");
    juego.innerHTML='<img src="images/nivel2/another.jpg">';
    setTimeout(function(){ 
       if (confirm("Pasar a Nivel 3")) {
       window.location="juego3.html";
        }
     }, 1500);
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
var pieza1=grilla[fila1][columna1];
var pieza2=grilla[fila2][columna2];
grilla[fila1][columna1]=pieza2;
grilla[fila2][columna2]=pieza1;
var hijo1=document.getElementById('pieza'+ pieza1);
var hijo2=document.getElementById('pieza'+ pieza2);
var padre=hijo1.parentNode;
var clon1=hijo1.cloneNode(true);
var clon2=hijo2.cloneNode(true);
padre.replaceChild(clon1, hijo2);
padre.replaceChild(clon2, hijo1);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
posicionVacia.fila=nuevaFila;
posicionVacia.columna=nuevaColumna;
}

function posicionValida(fila, columna){
if ((fila >=0 && fila<=2) && (columna >=0 && columna <=2)){
      return true;
  } return false;
}

function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }

  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }

  else if (direccion == 39) {
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
    nuevaFilaPiezaVacia = posicionVacia.fila;

  }

  else if (direccion == 37) {
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function moverEnDireccionTactil(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  switch (direccion) {
    case 'abajo':
      nuevaFilaPiezaVacia = posicionVacia.fila + 1;
      nuevaColumnaPiezaVacia = posicionVacia.columna;
      break;
    case 'arriba':
      nuevaFilaPiezaVacia = posicionVacia.fila - 1;
      nuevaColumnaPiezaVacia = posicionVacia.columna;
      break;
    case 'izquierda':
      nuevaColumnaPiezaVacia = posicionVacia.columna - 1;
      nuevaFilaPiezaVacia = posicionVacia.fila;
      break;
    case 'derecha':
      nuevaColumnaPiezaVacia = posicionVacia.columna + 1;
      nuevaFilaPiezaVacia = posicionVacia.fila;
      break;
    default:
      return;
  }

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(
      posicionVacia.fila,
      posicionVacia.columna,
      nuevaFilaPiezaVacia,
      nuevaColumnaPiezaVacia
    );
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}

function capturarGestos() {
  var juego = document.getElementById('juego');

  var initialX;
  var initialY;

  juego.addEventListener('touchstart', function (evento) {
    initialX = evento.touches[0].clientX;
    initialY = evento.touches[0].clientY;
  });

  juego.addEventListener('touchend', function (evento) {
    var finalX = evento.changedTouches[0].clientX;
    var finalY = evento.changedTouches[0].clientY;

    var deltaX = finalX - initialX;
    var deltaY = finalY - initialY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        moverEnDireccionTactil('izquierda');
      } else {
        moverEnDireccionTactil('derecha');
      }
    } else {
      if (deltaY > 0) {
        moverEnDireccionTactil('arriba');
      } else {
        moverEnDireccionTactil('abajo');
      }
    }

    var gano = chequearSiGano();
    if (gano) {
      setTimeout(function () {
        mostrarCartelGanador();
      }, 500);
    }
    evento.preventDefault();
  });
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
  capturarGestos();
}
iniciar();
