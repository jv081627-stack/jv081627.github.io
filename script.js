let ultimoScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const scrollActual = window.pageYOffset;

  if (scrollActual > ultimoScroll && scrollActual > 100) {
    // Bajando -> ocultar
    header.classList.add('header--oculto');
  } else {
    // Subiendo -> mostrar
    header.classList.remove('header--oculto');
  }

  ultimoScroll = scrollActual;
});

/* SE ACTIVA AL BAJAR Y SE REPITE AL SUBIR */

const elementosReveal = document.querySelectorAll('[data-reveal]');

elementosReveal.forEach(el => {
  const delay = el.getAttribute('data-reveal-delay');
  if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
});

/* DETECTA CUANDO UN ELEMENTO ENTRA Y SALE DE LA PANTALLA */

const revealObserver = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('reveal-visible');
    } else {

      /* SE OCULTA PARA HACER LA ANIMACION LA PROXIMA VEZ */

      entrada.target.classList.remove('reveal-visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

/* PONE A OBSEVAR CADA ELEMENTO */

elementosReveal.forEach(el => revealObserver.observe(el));

/* SELECTOR DE VISTAS DEL PROTAGONISTA */

function cambiarVista(e, vista) {
  // Desactivar todos los sprites
  document.querySelectorAll('.sprite-view').forEach(img => {
    img.classList.remove('active');
  });
  
  // Desactivar todos los botones
  document.querySelectorAll('.btn-rotar').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Activar el sprite seleccionado
  document.getElementById(`view-${vista}`).classList.add('active');
  
  // Marcar como activo el botón pulsado
  event.currentTarget.classList.add('active');
}

function alternarAlarma() {
  const botonPanic = document.getElementById('panic-button');
  const pastillaHero = document.getElementById('pastilla-portada');
  
  if (botonPanic.checked) {
    document.body.classList.add('alerta-activa');
    // Cambia tu GIF normal por el de la pastilla asustada
    if(pastillaHero) pastillaHero.src = "img/pastilla-asustada.gif";
  } else {
    document.body.classList.remove('alerta-activa');
    // Al apagar la alarma, vuelve a su caminata normal
    if(pastillaHero) pastillaHero.src = "img/personaje-caminando.gif";
  }
}

/* CARRUSEL DE LA SECCIÓN DEMO */

let carruselIndex = 0;
const carruselTrack = document.getElementById('carrusel-track');
const carruselDots = document.querySelectorAll('#carrusel-dots .dot');
const totalDiapositivas = carruselTrack ? carruselTrack.querySelectorAll('.carrusel-slide').length : 0;

function actualizarCarrusel() {
  if (!carruselTrack) return;
  carruselTrack.style.transform = `translateX(-${carruselIndex * 100}%)`;
  carruselDots.forEach((dot, i) => dot.classList.toggle('active', i === carruselIndex));
}

function moverCarrusel(direccion) {
  if (!totalDiapositivas) return;
  carruselIndex = (carruselIndex + direccion + totalDiapositivas) % totalDiapositivas;
  actualizarCarrusel();
}

function irADiapositiva(indice) {
  carruselIndex = indice;
  actualizarCarrusel();
}

/* AMPLIAR IMAGEN DEL ESCENARIO */

function ampliarImagen(img) {
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('img-modal-content');
  modalImg.src = img.src;
  modal.classList.add('activo');
}

function cerrarImagen() {
  document.getElementById('img-modal').classList.remove('activo');
}

/* NEWSLETTER */

function suscribirNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');
  const correo = input.value.trim();
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (!valido) {
    msg.textContent = 'Revisa tu correo, parece que le falta algo.';
    msg.className = 'newsletter-msg error';
    return;
  }

  /* AQUÍ se conectaría un servicio real (Mailchimp, Formspree, etc.) para guardar el correo */
  msg.textContent = '¡Listo! Te avisaremos de las novedades.';
  msg.className = 'newsletter-msg ok';
  input.value = '';
}

/* TÉRMINOS Y PRIVACIDAD */

const textosLegales = {
  terminos: `
    <h3>Términos y condiciones</h3>
    <p>Bienvenido a CRAZYMEDICINE. Al usar este sitio aceptas los siguientes términos.</p>
    <h5>Uso del sitio</h5>
    <p>CRAZYMEDICINE es un juego de entretenimiento con fines educativos y de ficción. Lo que ves en el juego no reemplaza el consejo de un médico ni un tratamiento real.</p>
    <h5>Contenido</h5>
    <p>Los personajes, ilustraciones, nombres y textos del juego pertenecen al equipo de CRAZYMEDICINE. No puedes copiarlos ni usarlos con fines comerciales sin permiso.</p>
    <h5>Cambios</h5>
    <p>Podemos actualizar estos términos y el juego en cualquier momento. Para dudas escríbenos a crazymedicine8@gmail.com.</p>`,
  privacidad: `
    <h3>Política de privacidad</h3>
    <p>Tu privacidad nos importa. Esto es lo que hacemos con tus datos.</p>
    <h5>Qué datos recibimos</h5>
    <p>Solo tu correo electrónico, si decides suscribirte al boletín de novedades.</p>
    <h5>Para qué los usamos</h5>
    <p>Únicamente para enviarte noticias de CRAZYMEDICINE. No vendemos ni compartimos tu correo con terceros.</p>
    <h5>Tus derechos</h5>
    <p>Puedes pedir que borremos tu correo o dejar de recibir mensajes cuando quieras escribiendo a crazymedicine8@gmail.com.</p>`
};

function abrirLegal(e, tipo) {
  e.preventDefault();
  document.getElementById('legal-contenido').innerHTML = textosLegales[tipo];
  document.getElementById('legal-modal').classList.add('activo');
}

function cerrarLegal(e, forzar) {
  if (forzar || e.target.id === 'legal-modal') {
    document.getElementById('legal-modal').classList.remove('activo');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('legal-modal').classList.remove('activo');
    document.getElementById('img-modal').classList.remove('activo');
  }
});