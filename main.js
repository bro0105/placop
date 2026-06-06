/* ============================================================
   main.js — JavaScript + jQuery partagé pour toutes les pages
   ============================================================ */

$(document).ready(function () {

  // ─── Année dynamique dans le footer ────────────────────────
  $('#annee').text(new Date().getFullYear());

  // ─── Lien actif dans la navbar ─────────────────────────────
  // Compare l'URL courante avec chaque lien pour mettre en gras
  var page = window.location.pathname.split('/').pop();
  $('#main-nav a').each(function () {
    var href = $(this).attr('href');
    if (href === page || (page === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  // ─── Déclenchement initial des éléments déjà visibles ──────
  checkReveal();

  // ─── Événements au défilement ──────────────────────────────
  $(window).on('scroll', function () {
    var st = $(this).scrollTop();

    // barre de progression
    var pct = (st / ($(document).height() - $(this).height())) * 100;
    $('#progress-bar').css('width', pct + '%');

    // ombre navbar
    $('#navbar').css('box-shadow', st > 10 ? '0 2px 20px rgba(0,0,0,.1)' : 'none');

    // bouton retour en haut
    if (st > 400) {
      $('#btn-top').fadeIn(200).css('display', 'flex');
    } else {
      $('#btn-top').fadeOut(200);
    }

    // animations reveal
    checkReveal();
  });

  // ─── Bouton retour en haut ──────────────────────────────────
  $('#btn-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // ─── Menu hamburger mobile ──────────────────────────────────
  $('#menu-toggle').on('click', function () {
    $('#main-nav').toggleClass('open');
  });

  // Ferme menu mobile au clic sur un lien
  $('#main-nav a').on('click', function () {
    $('#main-nav').removeClass('open');
  });

  // ─── Accordéon FAQ ─────────────────────────────────────────
  // Ouvre/ferme les réponses quand on clique sur la question
  $('.faq-question').on('click', function () {
    var $answer = $(this).next('.faq-answer');
    var isOpen  = $(this).hasClass('open');

    // ferme tous les autres
    $('.faq-question').removeClass('open').next('.faq-answer').slideUp(280);

    // ouvre celui-ci si pas déjà ouvert
    if (!isOpen) {
      $(this).addClass('open');
      $answer.slideDown(280);
    }
  });

  // ─── Formulaire de contact (simulation d'envoi) ─────────────
  $('#contact-form').on('submit', function (e) {
    e.preventDefault(); // empêche rechargement de la page
    var $btn = $(this).find('[type=submit]');
    $btn.text('Envoi en cours…').prop('disabled', true);

    // simule un délai réseau (remplacer par un vrai fetch/AJAX)
    setTimeout(function () {
      $('#contact-form').hide();
      $('#form-success').fadeIn(400);
    }, 1200);
  });

  // ─── Compteur animé (stats) ─────────────────────────────────
  // Déclenche l'animation quand la stat est visible à l'écran
  var counted = false;
  $(window).on('scroll', function () {
    if (counted) return;
    var $stats = $('.stat-num[data-target]');
    if (!$stats.length) return;

    var top  = $stats.first().offset().top;
    var view = $(window).scrollTop() + $(window).height();
    if (view > top + 50) {
      counted = true;
      $stats.each(function () {
        var $el     = $(this);
        var target  = parseInt($el.data('target'));
        var suffix  = $el.data('suffix') || '';
        $({ n: 0 }).animate({ n: target }, {
          duration: 1400,
          easing:   'swing',
          step: function () { $el.text(Math.floor(this.n) + suffix); },
          complete: function () { $el.text(target + suffix); }
        });
      });
    }
  });

}); // fin document.ready

// ─── Fonction reveal au scroll ──────────────────────────────
function checkReveal () {
  var viewport = $(window).scrollTop() + $(window).height();
  $('.reveal').each(function () {
    if (viewport > $(this).offset().top + 60) {
      $(this).addClass('visible');
    }
  });
}
