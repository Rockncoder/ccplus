function toggle(elementID) {
  if (document.getElementById(elementID).style.display != 'none') {
    document.getElementById(elementID).style.display = 'none';
  }
  else {
    document.getElementById(elementID).style.display = '';
  }
}
