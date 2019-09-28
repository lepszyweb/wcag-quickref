var addclass = function(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

var remclass = function(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

var hasclass = function(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

document.addEventListener('DOMContentLoaded', function(){
  var plel = document.createElement('a');
  //addclass(plel, 'permalink');
  plel.innerHTML = '<svg aria-hidden="true" class="i-share"><use xlink:href="img/icons.svg#i-share"></use></svg> UDOSTĘPNIJ';

  var plwrapdiv = document.createElement('div')
  addclass(plwrapdiv, 'permalink');

  var sharebox = document.createElement('div');
  addclass(sharebox, 'sharebox');
  var shareboxtext = '<p><label>Łącze do tej sekcji:<input type="url" value="%s" readonly> Skrót do skopiowania łącza: <kbd>ctrl</kbd>+<kbd>C</kbd> <em>lub</em> <kbd>⌘</kbd><kbd>C</kbd></label></p><p><a href="mailto:?subject=Dostępność%20cyfrowa%20%E2%80%93%20Jak%20spełnić%20WCAG&amp;body=Witaj!%0AByć%może%20zainteresuje%20Cię%20ta%20sekcja%20Wytycznych%20dotyczących%20dostępności%20treści%20Content%20internetowych%20(WCAG)%3A%0A%0A%s">Wyślij e-mail z linkiem do tej sekcji</a><button>Zamknij</button></p>';
  
  
  

  var url = window.location.origin + window.location.pathname;

  var elements = document.querySelectorAll('.sc-wrapper footer a');
  Array.prototype.forEach.call(elements, function(el, i){ // … .each(…)

    var cplel = plel.cloneNode(true);
    var theid = el.parentNode.parentNode.id;
    cplel.setAttribute('href', '#' + theid);
    cplel.setAttribute('aria-label', 'Udostępnij link do tej sekcji “' + el.parentNode.parentNode.querySelector('h4[id]').textContent + '”');

    var csbtext = shareboxtext.replace("%s", url + '#' + theid).replace("%s", url + '#' + theid);
    var csb = sharebox.cloneNode(true);
    csb.innerHTML = csbtext;

    var cplwrapdiv = plwrapdiv.cloneNode(true);
    cplwrapdiv.appendChild(cplel);
    cplwrapdiv.appendChild(csb);
    //addclass(cplwrapdiv, el.localName);

    cplel.addEventListener('click', function(e){
      var sbox = this.nextSibling;
      var input = sbox.querySelector('input');
      if (hasclass(sbox, 'open')) {
        remclass(sbox, 'open');
      } else {
        addclass(sbox, 'open');
        input.select();
        input.focus();
      }
      e.preventDefault();
    });

    el.parentNode.insertBefore(cplwrapdiv, el);
  });

  var sbbuttons = document.querySelectorAll('.sharebox button');
  Array.prototype.forEach.call(sbbuttons, function(el, i){ // … .each(…)
    el.addEventListener('click', function(){
      var openboxes = document.querySelectorAll('.sharebox.open');
      for (var i = openboxes.length - 1; i >= 0; i--) {
        remclass(openboxes[i], 'open');
      };
      el.parentNode.parentNode.parentNode.querySelector('a').focus();
    });
  });
});