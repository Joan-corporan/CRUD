import datos from "./data/data.json" assert { type: "json" };
import { Gift } from "./js/clases.js";
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));
let idGiftupdate = null
const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";
  datos.map((item) => {
    const fila = document.createElement("tr");
    const celdas = `<th>${item.gift}</th>
        <td>${item.tipo}</td>
        <td>${item.tiempo}</td>
        <td>${item.precio}</td>
        <td>
        <div class="d-flex">
        <button onclick="mostrarModal(${item.id})" class="btn btn-outline-warning" ><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button onclick="borrarGift(${item.id})" class="btn btn-outline-danger" ><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        </td>
        `;
    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};
const agregarGift = (e) => {
  e.preventDefault();

  let id = datos.at(-1).id + 1;
  let gift = document.getElementById("gift").value;
  let precio = document.getElementById("precio").value;
  let tipo = document.getElementById("tipo").value;
  let tiempo = document.getElementById("tiempo").value;
  let imagen = document.getElementById("imagen").value;

  datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
  document.getElementById("formGift").reset();
  cargarTabla();
};
window.borrarGift = (id) => {
  const index = datos.findIndex((item) => item.id == id);
  let validar = confirm(
    `Estas seguro/a que deseas eliminar la Gift card ${datos[index].gift}`
  );
  if (validar) {
    datos.splice(index, 1);
    cargarTabla();
  }
};
window.mostrarModal = (id) => {
    idGiftupdate= id
    let index = datos.findIndex((item)=>item.id==idGiftupdate)
    document.getElementById('giftModal').value=datos[index].gift
    document.getElementById('tipoModal').value=datos[index].tipo
    document.getElementById('tiempoModal').value=datos[index].tiempo
    document.getElementById('precioModal').value=datos[index].precio
    document.getElementById('imagenModal').value=datos[index].imagen
  myModal.show();
};
const editarModal = (e)=>{
    e.preventDefault()
    
    let index = datos.findIndex((item)=> item.id==idGiftupdate)
    datos[index].gift=document.getElementById('giftModal').value
    datos[index].tipo=document.getElementById('tipoModal').value
    datos[index].tiempo=document.getElementById('tiempoModal').value
    datos[index].precio=document.getElementById('precioModal').value
    datos[index].imagen=document.getElementById('imagenModal').value
    cargarTabla()

}

cargarTabla();
document.getElementById("formGift").addEventListener("submit", agregarGift);
document.getElementById('formModal').addEventListener('submit',editarModal)
