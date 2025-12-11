const carrito = {
  items: [],
  total: 0
};

const productos = {
  "Classic Burger": {
    imagen: "img/burger1.png",
    descripcion: "Nuestra hamburguesa clásica con queso cheddar fundido, lechuga fresca, tomate jugoso y nuestra salsa especial de la casa. Un clásico que nunca falla.",
    ingredientes: ["Carne 100% Angus 150g", "Queso Cheddar", "Lechuga Fresca", "Tomate", "Cebolla", "Salsa Especial", "Pan Brioche"],
    precio: 18.90
  },
  "BBQ Bacon": {
    imagen: "img/burger2.png",
    descripcion: "Con tocino crocante, salsa BBQ ahumada casera y aros de cebolla crujientes dorados a la perfección. Para los amantes del sabor ahumado.",
    ingredientes: ["Carne Premium 180g", "Tocino Ahumado", "Salsa BBQ Casera", "Aros de Cebolla", "Queso Cheddar", "Pan Artesanal"],
    precio: 22.90
  },
  "Doble Queso": {
    imagen: "img/burger3.jpg",
    descripcion: "Doble carne de res premium, doble queso cheddar fundido y nuestra salsa especial en pan tostado. Puro queso y sabor intenso.",
    ingredientes: ["Doble Carne Angus 300g", "Doble Queso Cheddar", "Salsa Especial", "Pickles", "Cebolla", "Pan Tostado"],
    precio: 24.90
  },
  "Big Bacon Deluxe": {
    imagen: "img/burger-h2.png",
    descripcion: "Nuestra hamburguesa premium con carne angus de primera calidad, tocino ahumado extra, queso cheddar madurado y nuestra salsa secreta exclusiva.",
    ingredientes: ["Carne Angus Premium 200g", "Tocino Premium", "Queso Cheddar Madurado", "Lechuga", "Tomate", "Salsa Secreta", "Pan Brioche Premium"],
    precio: 28.90
  },
  "Veggie Burger": {
    imagen: "img/promoburger1.jpg",
    descripcion: "Hamburguesa vegetariana gourmet con queso, aguacate fresco, lechuga y tomate. 100% vegetal y deliciosa.",
    ingredientes: ["Medallón Vegetal", "Queso", "Aguacate", "Lechuga", "Tomate", "Salsa Vegana", "Pan Integral"],
    precio: 20.90
  },
  "Spicy Chicken": {
    imagen: "img/promoburger2.png",
    descripcion: "Pollo crispy picante con jalapeños frescos, queso fundido y salsa ranch cremosa. Para los que buscan un toque picante.",
    ingredientes: ["Pollo Crispy Picante", "Jalapeños", "Queso", "Salsa Ranch", "Lechuga", "Tomate", "Pan Brioche"],
    precio: 21.90
  },
  "🎉 Lunes Clásico": {
    imagen: "img/burger1.png",
    descripcion: "Classic Burger + Papas Fritas + Gaseosa. ¡Promoción especial solo los lunes!",
    ingredientes: ["Classic Burger", "Papas Fritas Medianas", "Gaseosa 500ml"],
    precio: 15.90
  },
  "🔥 Martes BBQ": {
    imagen: "img/burger2.png",
    descripcion: "BBQ Bacon Burger + Aros de Cebolla + Bebida. ¡Imperdible oferta de martes!",
    ingredientes: ["BBQ Bacon Burger", "Aros de Cebolla", "Bebida Grande"],
    precio: 19.90
  },
  "💥 2x1 Miércoles": {
    imagen: "img/burger3.jpg",
    descripcion: "Lleva 2 hamburguesas Classic por el precio de 1. ¡Solo miércoles!",
    ingredientes: ["2x Classic Burger", "Incluye vegetales frescos"],
    precio: 18.90
  },
  "👨‍👩‍👧‍👦 Combo Familiar": {
    imagen: "img/burger-hero.png",
    descripcion: "4 Hamburguesas + 2 Papas Grandes + 4 Bebidas. ¡Perfecto para compartir en familia!",
    ingredientes: ["4 Hamburguesas a elección", "2 Papas Grandes", "4 Bebidas"],
    precio: 79.90
  },
  "🎓 Promo Estudiante": {
    imagen: "img/promoburger1.jpg",
    descripcion: "Hamburguesa + Papas + Bebida. Con carnet universitario válido",
    ingredientes: ["Hamburguesa Classic", "Papas Medianas", "Bebida"],
    precio: 16.90
  },
  "🎊 Weekend Special": {
    imagen: "img/promoburger2.png",
    descripcion: "Big Bacon Deluxe + Papas + 2 Bebidas. Viernes a Domingo",
    ingredientes: ["Big Bacon Deluxe", "Papas Grandes", "2 Bebidas"],
    precio: 32.90
  }
};

window.addEventListener('load', function() {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }
  }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
  inicializarApp();
});

function inicializarApp() {
  cargarCarritoDeStorage();
  configurarBotonesAgregar();
  configurarBotonesDetalle();
  configurarCarrito();
  configurarFormulario();
  animarElementosAlScroll();
  configurarScrollToTop();
}

function configurarBotonesAgregar() {
  const botonesAgregar = document.querySelectorAll('.btn--primary');
  
  botonesAgregar.forEach(boton => {
    if (boton.textContent.includes('Agregar') || boton.textContent.includes('Ordenar')) {
      boton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.card');
        if (!card) return;
        
        const titulo = card.querySelector('.card__title').textContent.trim();
        const precioElement = card.querySelector('.card__footer span, .fs-3.fw-bold.text-primary');
        const precioTexto = precioElement.textContent;
        const precio = parseFloat(precioTexto.replace('S/', '').replace(',', '.'));
        const imagen = card.querySelector('.card__img')?.src || productos[titulo]?.imagen || 'img/burger1.png';
        
        agregarAlCarrito({
          nombre: titulo,
          precio: precio,
          cantidad: 1,
          imagen: imagen
        });
        
        animarBoton(this);
        mostrarNotificacion('✅ Producto agregado al carrito', 'success');
      });
    }
  });
}

function configurarBotonesDetalle() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const btnDetalle = card.querySelector('.btn-detalle');
    if (!btnDetalle) return;
    
    btnDetalle.addEventListener('click', function(e) {
      e.preventDefault();
      const titulo = card.querySelector('.card__title').textContent.trim();
      
      if (productos[titulo]) {
        mostrarModalProductoBootstrap(titulo);
      }
    });
  });
}

function mostrarModalProductoBootstrap(nombreProducto) {
  const producto = productos[nombreProducto];
  if (!producto) return;
  
  const modalExistente = document.getElementById('modal-producto-bs');
  if (modalExistente) modalExistente.remove();
  
  const modal = document.createElement('div');
  modal.id = 'modal-producto-bs';
  modal.className = 'modal fade';
  modal.setAttribute('tabindex', '-1');
  
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-white fw-bold">${nombreProducto}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body p-0">
          <div class="row g-0">
            <div class="col-md-6">
              <img src="${producto.imagen}" alt="${nombreProducto}" class="w-100" style="height: 400px; object-fit: cover;">
            </div>
            <div class="col-md-6 p-4">
              <p class="text-muted mb-4">${producto.descripcion}</p>
              
              <div class="bg-light rounded p-3 mb-4">
                <h6 class="fw-bold mb-3">Ingredientes:</h6>
                <ul class="list-unstyled mb-0">
                  ${producto.ingredientes.map(ing => `
                    <li class="mb-2">
                      <span class="text-primary fw-bold">✓</span> ${ing}
                    </li>
                  `).join('')}
                </ul>
              </div>
              
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-2 fw-bold text-primary">S/${producto.precio.toFixed(2)}</span>
                <button class="btn btn--primary" onclick="agregarDesdeModalBS('${nombreProducto.replace(/'/g, "\\'")}', ${producto.precio}, '${producto.imagen}')">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  modal.addEventListener('hidden.bs.modal', function () {
    modal.remove();
  });
}

window.agregarDesdeModalBS = function(nombre, precio, imagen) {
  agregarAlCarrito({ nombre, precio, cantidad: 1, imagen });
  mostrarNotificacion('✅ Producto agregado al carrito', 'success');
  
  const modalElement = document.getElementById('modal-producto-bs');
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }
};

function animarBoton(boton) {
  boton.style.transform = 'scale(0.9)';
  setTimeout(() => {
    boton.style.transform = 'scale(1)';
  }, 200);
}

function agregarAlCarrito(producto) {
  const itemExistente = carrito.items.find(item => item.nombre === producto.nombre);
  
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.items.push(producto);
  }
  
  actualizarCarrito();
}

function actualizarCarrito() {
  carrito.total = carrito.items.reduce((sum, item) => {
    return sum + (item.precio * item.cantidad);
  }, 0);
  
  const cantidadTotal = carrito.items.reduce((sum, item) => sum + item.cantidad, 0);
  
  const botonCarrito = document.querySelector('.navbar__cart');
  if (botonCarrito) {
    botonCarrito.innerHTML = `🛒 (${cantidadTotal})`;
  }
  
  guardarCarritoEnStorage();
}

function configurarCarrito() {
  const botonCarrito = document.querySelector('.navbar__cart');
  
  if (botonCarrito) {
    botonCarrito.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarModalCarrito();
    });
  }
}

function mostrarModalCarrito() {
  const modalExistente = document.getElementById('modal-carrito');
  if (modalExistente) modalExistente.remove();
  
  const modal = document.createElement('div');
  modal.id = 'modal-carrito';
  modal.className = 'modal-carrito';
  
  let itemsHTML = '';
  
  if (carrito.items.length === 0) {
    itemsHTML = '<p style="text-align: center; color: #666; padding: 2rem;">🛒 El carrito está vacío</p>';
  } else {
    itemsHTML = carrito.items.map((item, index) => `
      <div class="carrito-item">
        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item__img">
        <div class="carrito-item__info">
          <strong>${item.nombre}</strong>
          <p>S/${item.precio.toFixed(2)} x ${item.cantidad} = S/${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
        <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar" aria-label="Eliminar">×</button>
      </div>
    `).join('');
  }
  
  modal.innerHTML = `
    <div class="modal-contenido">
      <div class="modal-header">
        <h2>🛒 Mi Carrito</h2>
        <button class="btn-cerrar" onclick="cerrarModal()" aria-label="Cerrar">×</button>
      </div>
      <div class="modal-body">
        ${itemsHTML}
      </div>
      <div class="modal-footer">
        ${carrito.items.length > 0 ? `
          <div class="total">
            <strong>Total:</strong>
            <strong>S/${carrito.total.toFixed(2)}</strong>
          </div>
          <button class="btn btn--primary" onclick="procesarPedido()">✓ Realizar Pedido</button>
          <button class="btn btn--secondary" onclick="vaciarCarrito()">🗑️ Vaciar Carrito</button>
        ` : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) cerrarModal();
  });
}

function cerrarModal() {
  const modal = document.getElementById('modal-carrito');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

function eliminarDelCarrito(index) {
  const itemEliminado = carrito.items[index];
  carrito.items.splice(index, 1);
  actualizarCarrito();
  mostrarModalCarrito();
  mostrarNotificacion(`✓ ${itemEliminado.nombre} eliminado`, 'info');
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    carrito.items = [];
    actualizarCarrito();
    cerrarModal();
    mostrarNotificacion('✓ Carrito vaciado', 'info');
  }
}

function procesarPedido() {
  if (carrito.items.length === 0) return;
  
  mostrarNotificacion(`✓ ¡Pedido realizado! Total: S/${carrito.total.toFixed(2)}`, 'success');
  
  carrito.items = [];
  actualizarCarrito();
  cerrarModal();
}

function configurarFormulario() {
  const formulario = document.querySelector('form');
  
  if (formulario) {
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');
      
      let valido = true;
      
      if (!nombre || nombre.value.trim().length < 3) {
        marcarError(nombre, 'El nombre debe tener al menos 3 caracteres');
        valido = false;
      } else {
        limpiarError(nombre);
      }
      
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !regexEmail.test(email.value)) {
        marcarError(email, 'Ingresa un email válido');
        valido = false;
      } else {
        limpiarError(email);
      }
      
      if (!mensaje || mensaje.value.trim().length < 10) {
        marcarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        valido = false;
      } else {
        limpiarError(mensaje);
      }
      
      if (valido) {
        mostrarNotificacion('✓ ¡Mensaje enviado! Te responderemos pronto.', 'success');
        formulario.reset();
      }
    });
    
    const inputs = formulario.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        limpiarError(this);
      });
    });
  }
}

function marcarError(campo, mensaje) {
  if (campo) {
    campo.classList.add('input-error');
    mostrarNotificacion(mensaje, 'error');
  }
}

function limpiarError(campo) {
  if (campo) {
    campo.classList.remove('input-error');
  }
}

function mostrarNotificacion(mensaje, tipo = 'info') {
  const notificacionExistente = document.querySelector('.notificacion');
  if (notificacionExistente) notificacionExistente.remove();
  
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion notificacion-${tipo}`;
  notificacion.textContent = mensaje;
  
  document.body.appendChild(notificacion);
  setTimeout(() => notificacion.classList.add('active'), 10);
  
  setTimeout(() => {
    notificacion.classList.remove('active');
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}

function animarElementosAlScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const elementos = document.querySelectorAll('.card, .content__main, .content__sidebar, .hero');
  elementos.forEach(elemento => {
    elemento.classList.add('fade-in-element');
    observer.observe(elemento);
  });
}

function configurarScrollToTop() {
  const btnScroll = document.createElement('button');
  btnScroll.className = 'btn-scroll-top';
  btnScroll.innerHTML = '↑';
  btnScroll.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(btnScroll);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      btnScroll.classList.add('visible');
    } else {
      btnScroll.classList.remove('visible');
    }
  });
  
  btnScroll.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function guardarCarritoEnStorage() {
  try {
    localStorage.setItem('bigburger_carrito', JSON.stringify(carrito));
  } catch (e) {
    console.error('Error guardando carrito:', e);
  }
}

function cargarCarritoDeStorage() {
  try {
    const carritoGuardado = localStorage.getItem('bigburger_carrito');
    if (carritoGuardado) {
      const datos = JSON.parse(carritoGuardado);
      carrito.items = datos.items || [];
      carrito.total = datos.total || 0;
      actualizarCarrito();
    }
  } catch (e) {
    console.error('Error cargando carrito:', e);
  }
}

window.eliminarDelCarrito = eliminarDelCarrito;
window.cerrarModal = cerrarModal;
window.vaciarCarrito = vaciarCarrito;
window.procesarPedido = procesarPedido;