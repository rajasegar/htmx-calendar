function closeModal() {
  var container = document.getElementById("modals-here")
  var backdrop = document.getElementById("modal-backdrop")
  var modal = document.getElementById("eventModal")

  modal.classList.remove("show")
  backdrop.classList.remove("show")

  setTimeout(function() {
    container.removeChild(backdrop)
    container.removeChild(modal)
  }, 200)
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
