/* =========================================================
   site.js — Comportements du modele Artisan
   ---------------------------------------------------------
   Menu sur petit ecran, et visionneuse des realisations.
   ========================================================= */

// ---------- MENU SUR PETIT ECRAN ----------
(function () {
  var burger = document.getElementById("burger")
  var menu = document.getElementById("menu")
  if (!burger || !menu) return

  burger.addEventListener("click", function () {
    burger.classList.toggle("ouvert")
    menu.classList.toggle("ouvert")
  })

  // Un lien choisi referme le menu
  menu.querySelectorAll("a").forEach(function (lien) {
    lien.addEventListener("click", function () {
      burger.classList.remove("ouvert")
      menu.classList.remove("ouvert")
    })
  })
})();

// ---------- VISIONNEUSE DES REALISATIONS ----------
/*
 * Les photos sont regenerees par le CMS a chaque chargement : on
 * ecoute donc le clic sur la galerie entiere plutot que sur chaque
 * image, pour que les nouvelles photos soient prises en compte.
 */
(function () {
  var loupe = document.getElementById("loupe")
  var photo = document.getElementById("loupe-photo")
  var fermer = document.getElementById("loupe-fermer")
  if (!loupe || !photo) return

  document.addEventListener("click", function (e) {
    var cible = e.target
    if (!cible.closest) return

    var galerie = cible.closest(".galerie")
    if (galerie && cible.tagName === "IMG") {
      photo.src = cible.src
      photo.alt = cible.alt || ""
      loupe.classList.add("ouverte")
      document.body.style.overflow = "hidden"
    }
  })

  function refermer() {
    loupe.classList.remove("ouverte")
    document.body.style.overflow = ""
    photo.src = ""
  }

  if (fermer) fermer.addEventListener("click", refermer)

  // Clic en dehors de la photo
  loupe.addEventListener("click", function (e) {
    if (e.target === loupe) refermer()
  })

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") refermer()
  })
})();
