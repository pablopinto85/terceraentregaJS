//creacion de constructor
class Joyeria {
  constructor(joya, cantidad) {
    this.id = joya.id;
    this.tipo = joya.tipo;
    this.precio = joya.precio;
    this.cantidad = cantidad;
    this.precioTotal = joya.precio;
  }

  sumarUnidad() {
    this.cantidad++;
    this.actualizarPrecioTotal();
  }

  restarUnidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.actualizarPrecioTotal();
    }
  }

  actualizarPrecioTotal() {
    this.precioTotal = this.precio * this.cantidad;
  }
}

// Constantes y variables
const joyas = [
  {
      id: 1,
      tipo: "Aros de Plata 925",
      descripcion: "Aros colgantes de plata 925, con piedra esmeralda pulida en el centro del aro, posee broche de seguridad para evitar caídas.",
      precio: 79000,
      img: "https://i.ibb.co/b3Z78cF/aros-plata.jpg",
      cantidad: 15,
    },
    {
      id: 2,
      tipo: "Cadena Acero Quirurgico",
      descripcion: "Cadena de acero quirurgico, grosor de 8 mm, largo 58 cm.",
      precio: 29900,
      img: "https://i.ibb.co/d0cJ4Xh/cadena-acero.jpg",
      cantidad: 100,
  },
  {
      id: 3,
      tipo: "Anillo Oro 18 Kilates",
      descripcion: "Anillo de oro 18 kilates, con diseño de corazón, peso 1.9 gramos.",
      precio: 99000,
      img: "https://i.ibb.co/v38VRSL/anillo-oro.jpg",
      cantidad: 5,
  },
  {
      id: 4,
      tipo: "Anillo plata 925",
      descripcion: "Anillo de plata 925, con incrustaciones de cristales, diseño elegante y finas terminaciones",
      precio: 49000,
      img: "https://i.ibb.co/zNn7gHQ/anillo-plata.jpg",
      cantidad: 10,
  },
  {
      id: 5,
      tipo: "Anillo Acero Quirurgico",
      descripcion: "Anillo de acero quirurgico, diseño elegante con finas terminaciones",
      precio: 9900,
      img: "https://i.ibb.co/M7cWsVt/anillo-aceroq.jpg",
      cantidad: 50,
  },
  {
      id: 6,
      tipo: "Argollas de Oro 18 Kilates",
      descripcion: "Argollas de Oro 18 kilates, con marco de plata 925, peso total 5.9 gramos, caja de almacenamiento y grabado de argollas incluido.",
      precio: 199000,
      img: "https://i.ibb.co/wpcmpht/argollas-oro.jpg",
      cantidad: 2,
  },
  {
      id: 7,
      tipo: "Aros de Oro 18 Kilates",
      descripcion: "Aros de Oro 18 kilates, tipo colgantes, con broche de seguridad para evitar caidas, peso 3 gramos el par.",
      precio: 149000,
      img: "https://i.ibb.co/MVPBrtC/arosargolla-oro.jpg",
      cantidad: 3,
  },
  {
      id: 8,
      tipo: "Cadena & Colgante plata 925",
      descripcion: "Hermosa y fina cadena y colgante de plata 925, longitud de cadena de 55 cm, peso 2.8 gramos, colgante de plata 925 forma de nudo de bruja.",
      precio: 79000,
      img: "https://i.ibb.co/JCcd8z5/colgante-cadena-plata.jpg",
      cantidad: 11,}
  ];

let carrito = [];

//Declaración de funciones  //

function chequearCarritoEnStorage() {
  const contenidoEnStorage = localStorage.getItem("carritoEnStorage");

  if (contenidoEnStorage) {
    const array = JSON.parse(contenidoEnStorage).map((objeto) => {
      const joya = new Joyeria(objeto, objeto.cantidad);
      joya.actualizarPrecioTotal();
      return joya;
    });

    imprimirTabla(array);

    return array;
  }

  return [];
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
}

function imprimirProductosEnHTML(array) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
//inyeccion de html mediante JS
  for (const joya of array) {
    const card = document.createElement("div");
    card.innerHTML = `<br>
         
    <div class="col">
    <div class="card h-100">
    <img src="${joya.img}" class="card-img-top grow" alt="joyamagnolia">
    <div class="card-body">
    <h2 class="card-title">${joya.tipo}</h2>
    <h5 class="card-subtitle mb-2 text-muted">${joya.descripcion}</h5>
    <p class="card-text"> CLP $${joya.precio}</p>
  </div>
  <button id="agregar${joya.id}" type="button" class="btn btn-dark">Agregar</button>
</div>
  </div>
  `;

    contenedor.appendChild(card);

    const boton = document.getElementById(`agregar${joya.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(joya.id));
  }
}
//mas funciones//
function agregarAlCarrito(idProducto) {
  const joyaCarrito = carrito.find((elemento) => elemento.id === idProducto);

  if (joyaCarrito) {
    const index = carrito.findIndex((elemento) => elemento.id === joyaCarrito.id);
    carrito[index].sumarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {
    carrito.push(new Joyeria(joyas.find((joya) => joya.id === idProducto), 1));
  }

  guardarCarritoEnStorage();
  imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex((joya) => joya.id === id);

  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].restarUnidad();
      carrito[index].actualizarPrecioTotal();
    } else {
      carrito.splice(index, 1);
    }

    guardarCarritoEnStorage();
    imprimirTabla(carrito);
  }
}

function eliminarCarrito() {
  carrito = [];
  localStorage.removeItem("carritoEnStorage");

  document.getElementById("carrito").innerHTML = "";
  document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
  return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function imprimirTabla(array) {
  const precioTotal = obtenerPrecioTotal(array);
    const contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "";

   // Creación de la tabla
const tabla = document.createElement("div");

tabla.innerHTML = `
<table id="tablaCarrito" class="table table-striped">
  <thead>
    <tr>
      <th>Item</th>
      <th>Cantidad</th>
      <th>Precio (CLP)</th>
      <th>Acción</th>
    </tr>
  </thead>
  <tbody id="bodyTabla">
  </tbody>
</table>
`;

const bodyTabla = tabla.querySelector("#bodyTabla");

for (const joya of array) {
const datos = document.createElement("tr");
datos.innerHTML = `
  <td>${joya.tipo}</td>
  <td>${joya.cantidad}</td>
  <td>$${joya.precioTotal}</td>
  <td><button id="eliminar${joya.id}" class="btn btn-dark">Eliminar</button></td>
  <h5>Precio Total: CLP $${precioTotal}</h5>
  <button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
  <button id="pagarCarrito" onclick="mostrarMensaje()" class="btn btn-dark">Pagar Carrito</button>
`;

bodyTabla.appendChild(datos);

const botonEliminar = datos.querySelector(`#eliminar${joya.id}`);
botonEliminar.addEventListener("click", () => eliminarDelCarrito(joya.id));
}
// Construir el modal de SweetAlert
Swal.fire({
title: 'Carrito de compras',
html: tabla.innerHTML,
icon: 'info',
confirmButtonText: 'Cerrar'
});
const botonPagarCarrito = document.getElementById("pagarCarrito");
botonPagarCarrito.addEventListener("click", mostrarMensaje);

function mostrarMensaje() {
Swal({
  title: '¿Confirmar Compra?',
  text: "¿Desea confirmar su compra?",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Comprar'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Felicitaciones',
      'Seras dirigido a la pagina de compra',
      'success'
    )
  }
})
}
}


//busqueda y filtrado
function filtrarBusqueda(e) {
  e.preventDefault();

  const ingreso = document.getElementById("busqueda").value.toLowerCase();
  const arrayFiltrado = joyas.filter((elemento) => elemento.tipo.toLowerCase().includes(ingreso));

  imprimirProductosEnHTML(arrayFiltrado);
}

// Eventos
const btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

imprimirProductosEnHTML(joyas);

carrito = chequearCarritoEnStorage();
