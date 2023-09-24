import "./admin/navside.js"
import './Landing/glider-slider.js'
import './admin/product-page.js'

let table = new DataTable('#table-user', {
    searching: false,
    paging:false,
    info:false,
    columnDefs: [
        { orderable: false, targets: 5 }
      ]
});