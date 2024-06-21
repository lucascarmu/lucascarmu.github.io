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


    // PROJECT
    const imagesProjects = document.querySelectorAll(".clickable-image");
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");
    const header = document.getElementById('myHeader');
    let startX = 0;

    modal.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
    });

    modal.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const diffX = touch.clientX - startX;

        if (diffX > 50) {
          closeModal();
        }
    });

    imagesProjects.forEach(function(image) {
      image.addEventListener("click", function() {
        overlay.classList.add("show");
        insertarListaEnElemento("none", '.items');
        if (window.innerWidth <= 768) {
          header.classList.add('hidden');
        }
        modal.classList.remove('hidden');
        modal.classList.add('show');
        modal.innerHTML = generarModal(image.id);
      });
    });


    // También cerramos el modal si se hace clic fuera del bloque modal
    overlay.addEventListener("click", function(event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    if (window.innerWidth <= 768) {
      let lastScrollY = window.scrollY;
    
      window.addEventListener('scroll', () => {
          if(!modal.classList.contains('show') && (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)){
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
          }
        });
    }

    document.addEventListener("click", function(event) {
      if (!header.contains(event.target) && header.classList.contains("visible")) {
          header.classList.remove("visible");
      }
  });
});

function navFunction(key){
  const header = document.getElementById('myHeader');

  switch (key) {
    case 'show':
      header.classList.add('visible');
      break;
    default:
      header.classList.remove('visible');
      break;
  }
}

function closeToggleMenu(){
  if (window.innerWidth <= 768) {
    const header = document.getElementById('myHeader');
    toggleMenu();
    setTimeout(function() {
      header.classList.remove('hidden');
    }, 400);
  }
}
// MENU HAMBURGUESA
function toggleMenu() {
  var topLine = document.getElementById("top-line");
  var bottomLine = document.getElementById("bottom-line");
  var targetX2Top, targetX1Bottom;
  if (topLine.getAttribute("x2") === "13.75") {
      navFunction("show");
      targetX2Top = 19;
      targetX1Bottom = 5;
  } else {
      navFunction("hidde");
      targetX2Top = 13.75;
      targetX1Bottom = 10.25;
  }
  animateLine(topLine, parseFloat(topLine.getAttribute("x2")), targetX2Top);
  animateLine(bottomLine, parseFloat(bottomLine.getAttribute("x1")), targetX1Bottom, 'bottom');
}
function animateLine(line, currentX, targetX, position) {
  var startTime = null;
  function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      var newX = currentX + (targetX - currentX) * progress / 200; // 200ms para la animación
      if (position === 'bottom') {
          line.setAttribute("x1", newX);
      } else {
          line.setAttribute("x2", newX);
      }
      if (progress < 200) {
          requestAnimationFrame(step);
      } else {
          if (position === 'bottom') {
              line.setAttribute("x1", targetX);
          } else {
              line.setAttribute("x2", targetX);
          }
      }
  }
  requestAnimationFrame(step);
}



function closeModal() {
  setTimeout(function() {
    overlay.classList.remove("show");
  }, 400);
  modal.classList.remove('show');
  modal.classList.add('hidden');
  document.getElementById('myHeader').classList.remove('hidden');
  setTimeout(function() {
    insertarListaEnElemento(c, '.items');
  }, 400);
}
function generarModal(idImage){
  var htmlModal = '';
  switch (idImage) {
    case "TensorflowPractice":
      htmlModal += '<div onclick="closeModal()"><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/></svg></div>';
      htmlModal += '<h1>TensorFlow Practice</h1>';
      htmlModal += '<h2>Learn about TensorFlow</h2>';
      htmlModal += '<div>This repository provides different sections for training neural networks using TensorFlow such as Regression, Classification, Convolutional Neural Networks (Computer Vision), Transfer Learning and Natural Language Processing.</div>';
      htmlModal += '<img src="images/projects/tensorflowlogo.png">'
      htmlModal += '<p>View this project on GitHub: <a href="https://github.com/lucascarmu/TensorFlow-Practice">https://github.com/lucascarmu/TensorFlow-Practice</a></p>';
      break;
    case "PubMed":
      htmlModal += '<div onclick="closeModal()"><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/></svg></div>';
      htmlModal += '<h1>PubMed - Sequential Sentence Classification</h1>';
      htmlModal += '<h2>Implemented a research paper PubMed 200k RCT</h2>';
      htmlModal += '<div>The research paper presents a Dataset for Sequenctial Sentence Classification in Medical Abstracts which consists of ~200,000 labelled Randomized Controlled Trial (RCT) abstracts.</div>';
      htmlModal += '<img src="images/projects/pubmed.jpg">'
      htmlModal += '<p>View this project on GitHub: <a href="https://github.com/lucascarmu/PubMed-Sequential_Sentence_Classification">https://github.com/lucascarmu/PubMed-Sequential_Sentence_Classification</a></p>';
      break;
    default:
      break;
  }
  return htmlModal;
}

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
var frontBackSkills = ['CSS', 'HTML5', 'JavaScript', 'C++', 'Java', 'Python', 'Spring', 'Angular'];
var MLSkills = ['Jupyter', 'Scikit_Learn', 'Pandas', 'Matlab', 'Matplotlib', 'Numpy', 'Seaborn', 'Scipy'];
var MLOps = ['Docker', 'Kubernetes', 'GitHub_Actions'];


function modificarLista(listaOriginal, path){
  return listaModificada = listaOriginal.map(elemento => path + elemento + ".png");
}

deepLearningSkills = modificarLista(deepLearningSkills, "images/skills/DeepL/")
frontBackSkills = modificarLista(frontBackSkills, "images/skills/front&back/")
MLSkills = modificarLista(MLSkills, "images/skills/ML/")
MLOps = modificarLista(MLOps, "images/skills/MLOps/")


function generarListaHTML(lista, chunkSize) {
  var chunkList = [];
  var listaHTML = '';
  var elementName = '';
  for (let i = 0; i < lista.length; i += chunkSize) {
    let chunk = lista.slice(i, i + chunkSize);
    chunkList.push(chunk);
  }
  chunkList.forEach(c => {
    listaHTML += '<ul>';
    c.forEach(elemento => {
      elementArray = elemento.split("/");
      elementName = elementArray[elementArray.length-1].split(".")[0].replace(/_/g, " ");
      listaHTML += `<li><div><img src=${elemento}></div><p>${elementName}</p></li>`;
    });
    listaHTML += '</ul>';
  });

  return listaHTML;
}

function insertarListaEnElemento(categoria, selector) {
  var lista;
  switch(categoria){
    case "Frontend":
      lista = frontBackSkills;
      break
    case "Data":
      lista = MLSkills;
      break
    case "Deep":
      lista = deepLearningSkills;
      break
    case "MLOps":
      lista = MLOps;
      break
    case "none":
      lista = [];
      break
  }
  const elemento = document.querySelector(selector);
  if (elemento) {
    if (window.innerWidth > 768) {
      elemento.innerHTML = generarListaHTML(lista, 4);
    }else{
      elemento.innerHTML = generarListaHTML(lista, 3);
    }
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
