/* Portfolio — design-story toggles.
   Each project <section> owns one .story panel and one [data-story-toggle] button.
   The button flips an .is-open class on the section; CSS swaps the icon and label
   and collapses/expands the panel.

   The panel is collapsed with CSS (zero height), never with the hidden attribute
   or display:none, so its text stays readable to agents, crawlers and screen
   readers that never click the button. */
(function () {
  "use strict";

  var buttons = document.querySelectorAll("[data-story-toggle]");

  Array.prototype.forEach.call(buttons, function (button) {
    var section = button.closest(".project");
    var story = section && section.querySelector(".story");
    if (!story) return;

    var sync = function (open) {
      section.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    };

    sync(section.classList.contains("is-open"));

    button.addEventListener("click", function () {
      sync(!section.classList.contains("is-open"));
    });
  });
})();
