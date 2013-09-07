function toggle(elementID) {
  var el = document.getElementById(elementID);
  if (el.style.display !== 'none') {
    el.style.display = 'none';
  }
  else {
    el.style.display = '';
  }
}
