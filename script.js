// Agregar clase 'active' al enlace seleccionado en la navegación
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('nav ul li a');

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            links.forEach(function(otherLink) {
                otherLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) { // Cambiar 50 por la distancia que desees antes de cambiar el estilo
    document.getElementById("myHeader").classList.add("scrolled");
  } else {
    document.getElementById("myHeader").classList.remove("scrolled");
  }
}



// SKILLS

var deepLearningSkills = ['Tensorflow', 'Keras', 'PyTorch'];
var frontBackSkills = ['CSS', 'HTML5', 'JavaScript', 'C++', 'Java', 'Python', 'Spring'];
var MLSkills = ['Jupyter', 'Scikit_Learn', 'Pandas', 'Matlab', 'Matplotlib', 'Numpy', 'Seaborn', 'Scipy'];


function modificarLista(listaOriginal, path){
  return listaModificada = listaOriginal.map(elemento => path + elemento + ".png");
}

deepLearningSkills = modificarLista(deepLearningSkills, "images/skills/DeepL/")
frontBackSkills = modificarLista(frontBackSkills, "images/skills/front&back/")
MLSkills = modificarLista(MLSkills, "images/skills/ML/")

console.log(deepLearningSkills);
console.log(frontBackSkills);
console.log(MLSkills);



function generarListaHTML(lista) {
  var listaHTML = '';
  var elementName = '';
  if( lista.length >= 5){
    const mitad = Math.ceil(lista.length / 2);
    const primeraMitad = lista.slice(0, mitad);
    const segundaMitad = lista.slice(mitad);

    listaHTML += '<ul>';
      primeraMitad.forEach(elemento => {
        elementArray = elemento.split("/");
        elementName = elementArray[elementArray.length-1].split(".")[0].replace(/_/g, " ");
        listaHTML += `<li><div><img src=${elemento}></div><p>${elementName}</p></li>`;
      });
    listaHTML += '</ul>';
    lista = segundaMitad;
  }
  listaHTML += '<ul>';
    lista.forEach(elemento => {
      elementArray = elemento.split("/");
      elementName = elementArray[elementArray.length-1].split(".")[0].replace(/_/g, " ");
      listaHTML += `<li><div><img src=${elemento}></div><p>${elementName}</p></li>`;
    });
  listaHTML += '</ul>';
  
  return listaHTML;
}

function insertarListaEnElemento(categoria, selector) {
  var lista;
  switch(categoria){
    case "Frontend":
      lista = frontBackSkills
      break
    case "Data":
      lista = MLSkills
      break
    case "Deep":
      lista = deepLearningSkills
      break
  }
  const elemento = document.querySelector(selector);
  if (elemento) {
    elemento.innerHTML = generarListaHTML(lista);
  } else {
    console.error(`No se encontró ningún elemento con el selector "${selector}".`);
  }
}


const items = document.querySelectorAll('#skills-section .categories li');
let c = "Data";
insertarListaEnElemento(c, '.items');

items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(item => {
            item.classList.remove('selected');
        });
        item.classList.add('selected');
        c = item.textContent.split(' ')[0];
        console.log(c);
        insertarListaEnElemento(c, '.items');
    });
});


// CONTACT

(function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
