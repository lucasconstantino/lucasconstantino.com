;(function (window, document, undefined) {

  var body = document.querySelector('body')
    , switchHeight = 105
    , shrinked = false
    , className = 'shrink-head';

  /**
   * Triggered on scrolling.
   */
  function scrolled() {
    if (!shrinked && scrollY() >= switchHeight) {
      shrinked = true;
      body.classList.add(className);
    } else if (shrinked && scrollY() < switchHeight) {
      shrinked = false;
      body.classList.remove(className);
    }
  }

  /**
   * Get Y offset.
   */
  function scrollY() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  window.addEventListener('scroll', scrolled, true);
})(window, document);