const showSwal = (title, icon, button, callback) => {
  swal({
    title,
    icon,
    button
  }).then(result => callback(result))
}

export {showSwal}