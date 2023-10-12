/* importacion de archivo json con los datos. assert es una palabra reservada de js que sirve para declarar el tipo del archivo que estamos importando  */
import datos from "../data/data.json" assert { type: "json" };
/* importando el archivo Clases  */
import { Gift } from "./clases.js";

const cuerpoTabla = document.getElementById("cuerpo-tabla");
let idGiftupdate = null;

/* MODAL BOOTSTRAP: al importar esto nos permitira hacer uso de sus metodos como show, o hide entre otros. */
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

/* Este metodo lo creamos para mostrar el modal. Este modal se debe mostrar cuando hagamos clic en el boton de editar. Lo convertimos a un metodo global con window*/
window.mostrarModal = (id) => {
  idGiftupdate = id;
  /* le pasamos como paramtro el id para capturar el id del elemento que queremos modificar, junto con la variable index vamos a capturar la posicion del elemento en el arreglo  */
  let index = datos.findIndex((item) => item.id == idGiftupdate);
  /* ahora lo que haremos el que cuando abramos el modal es que aparescan los datos que vienen del objeto que vamos a modificar, osea al modal le asiganmos el valor que tenia la giftcard    */
  document.getElementById("giftModal").value = datos[index].gift;
  document.getElementById("tipoModal").value = datos[index].tipo;
  document.getElementById("tiempoModal").value = datos[index].tiempo;
  document.getElementById("imagenModal").value = datos[index].imagen;
  document.getElementById("precioModal").value = datos[index].precio;

  myModal.show();
};

const cargarTabla = () => {
  /* antes de hacer el map limpiamos la tabla con la propiedad innerHTML y le damos el valor de string vacio.  */
  cuerpoTabla.innerHTML = "";

  datos.map((item) => {
    /* Le pasamos la funcion al boton con la propiedad onclick mas el items en la propiedad id   */
    const fila = document.createElement("tr");
    const celdas = `<th>${item.gift}<th/>
        <td>${item.tipo}<td/>
        <td>${item.tiempo}<td/>
        <td>$${item.precio}<td/>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})">
        <i class="fa fa-pencil" aria-hidden="true"></i></button>
   
        <button onclick="borrarGift(${item.id})" class="btn btn-outline-danger">
        <i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        </td>`;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};
const agregarGift = (e) => {
  e.preventDefault();
  /* Conocimientos de arregle de js: 
  Declaramos una variable id, llamamos el arreglo 'datos2' y en su metodo at le agregamos el valor -1, lo que va hacer esto es posicionarse en la ultima posicion del arreglo datos y en su propiedad id le vamos a sumar 1 y lo almacenamos en la variable id. */
  let id = datos.at(-1).id + 1;
  let gift = document.getElementById("gift").value;
  let tipo = document.getElementById("tipo").value;
  let tiempo = document.getElementById("tiempo").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;
  /* con los nuevos datos obtenidos del campo vamos a agregar una nueva Gift a la tabla y le pasamos como parametros los valores */
  datos.push(new Gift(id, precio, tiempo, gift, imagen, tipo));
  /* reseteamos los campos del formulario con reset */
  document.getElementById("formGift").reset();
  /* hacemos llamdo al la funcion cargarTabla() para reenderizar los datos nuevos en la tabla  */
  cargarTabla();
};
/*Esta funcion le hacemos el llamado desde el boton eliminar. Para que esta funcion realice su objetivo debemos agregarla al browser object model, osea tiene que ser parte de los metodos globales que tiene el browser. para hacer referencia a metodos globales del browser debemos acceder atraves de window    */
window.borrarGift = (id) => {
  /* para poder borrar una gift debemos recibir un dato que sea unico de cada giftcard ese dato unico siemepre es el id.
    Luego para saber que posicion dentro del arreglo tiene esta gift card con el id podemos obtener la posicion dentro del arreglo y usar un metodo para eliminar elementos de un arrglo.  Declaramos la variable index lo igualamos al arreglo datos con el id que recibimos vamos a obtener la posicion del items que queremos eliminar con el metodo findindex   */
  let index = datos.findIndex((item) => item.id == id);
  /* la propiedad confirm devuelve un booleano true o false, creamos la variable validar para asegurarse si el usuario quiere borrar un elemento  */
  let validar = confirm(
    `Estas seguro/a de que quieres eliminar la Gift Card ${datos[index].gift} ?`
  );
  if (validar) {
    datos.splice(index, 1);
    cargarTabla();
  }
};
const editarModal = (e) => {
  e.preventDefault();
  let index = datos.findIndex((item) => item.id == idGiftupdate);
  datos[index].gift = document.getElementById("giftModal").value;
  datos[index].tipo = document.getElementById("tipoModal").value;
  datos[index].tiempo = document.getElementById("tiempoModal").value;
  datos[index].precio = document.getElementById("precioModal").value;
  datos[index].imagen = document.getElementById("imagenModal").value;
  cargarTabla()
};

cargarTabla();

document.getElementById("formGift").addEventListener("submit", agregarGift);
document.getElementById("formModal").addEventListener("submit", editarModal);
