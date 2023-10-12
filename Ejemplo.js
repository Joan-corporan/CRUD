/* DEFINIENDO UNA CONSTANTE "btnREst", OBTENIENDO SU ID "submit",
 AÑADIENDO UN addEventListener al evento "click" con el nombre de la funcion */
 const btnRest = document.getElementById("submit")
 btnRest.addEventListener("click", create)
 let tareas = []
 const actuliInfor = document.getElementById('edit')
 actuliInfor.addEventListener('click', edInfN)
 let ideditando = null
 
 function create(event) {
     console.log(event)
     event.preventDefault()
     const tarea = leerFormulario()
     tareas.push(tarea)
     console.log(tareas)
     createCard(tarea)
 
 
     limpiarForm()
 
     guardardatosLS()
 
 }
 
 const nameinput = document.getElementById("nombre")
 const lastnameinput = document.getElementById("apellido")
 const rutinput = document.getElementById("rut")
 const cargoinput = document.getElementById("cargo")
 
 
 function leerFormulario() {
 
     let id = Date.now()
     if (ideditando != null) {
         id = ideditando
     }
 
     const tarea = {
         nombre: nameinput.value,
         apellido: lastnameinput.value,
         rut: rutinput.value,
         cargo: cargoinput.value,
         id: id
     }
 
     return (tarea)
 }
 function createCard(tarea) {
     const cardlist = document.getElementById("list-container")
     cardlist.innerHTML += `
                         
 
                     <div id="box-b4">
                             <p> ${tarea.nombre}</p>
                             <p>${tarea.apellido}</p>
                             <p>${tarea.rut}</p>
                             <p>${tarea.cargo}</p> 
                         <div>
                             <button onclick="editarForm('${tarea.id}')" class="btn-edit">Editar</button>
                             <button onclick="eliminarForm('${tarea.id}')" class="btn-elim">Eliminar</button>
                         </div>
                     </div>
                     <hr>`
 }
 function editarForm(id) {
     btnRest.classList.add('oculto')
     actuliInfor.classList.remove('oculto')
     const indice = tareas.findIndex(tarea => tarea.id == id)
     const tareaeditada = tareas[indice]
 
     nameinput.value = tareaeditada.nombre
     lastnameinput.value = tareaeditada.apellido
     cargoinput.value = tareaeditada.cargo
     rutinput.value = tareaeditada.rut
     ideditando = id
 }
 function eliminarForm(id) {
     const index = tareas.findIndex((tarea) => tarea.id == id)
     tareas.splice(index, 1)
 
     guardardatosLS()
     leerfromLS()
     const card = document.getElementById('list-container')
     card.innerHTML = ''
     tareas.forEach((tarea) => createCard(tarea))
 }
 function edInfN(e) {
     e.preventDefault()
     const elemento = leerFormulario()
     const indice = tareas.findIndex(el => el.id == elemento.id)
     tareas[indice] = elemento
     guardardatosLS()
     limpiarForm()
     actuliInfor.classList.add('oculto')
     btnRest.classList.remove('oculto')
     ideditando = null
 
     const card = document.getElementById('list-container')
     card.innerHTML = ''
     leerfromLS()
 
 
 
 
 }
 
 
 function limpiarForm() {
     const formconst = document.getElementById("boxSF")
     formconst.reset()
 
 }
 function guardardatosLS() {
 
     localStorage.setItem("tareas", JSON.stringify(tareas))
 }
 function leerfromLS() {
     const tareasls = JSON.parse(localStorage.getItem('tareas'))
     console.log(tareasls)
     if (tareasls) {
         tareas = tareasls
         tareas.forEach((el) => createCard(el))
     }
     else {
         tareas = []
     }
 
 
 
 }
 leerfromLS()
 console.log(tareas)