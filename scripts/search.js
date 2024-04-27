var searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchByTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';

    }
    search.placeholder = 'search by ' + searchMood;
    search.focus();
}
function getSearchData(value) {
    //console.log(value);
    var j = 0;
    let createProductsTable = '';
    for (let i = 0; i < products.length; i++) {
        j++;
        for (let i = 0; i < tableHead.length; i++) {
            tableHead[i].style.color = 'green';
        }
        if (searchMood == 'title') {
            if (String(products[i].title).toLowerCase().includes(String(value).toLowerCase())) {
                createProductsTable += `
        <tr>
        <td class='tableCell'>${i + 1}</td>
        <td class='tableCell'>${products[i].title}</td>
        <td class='tableCell'>${products[i].price}</td>
        <td class='tableCell'>${products[i].taxes}</td>
        <td class='tableCell'>${products[i].total}</td>
        <td class='tableCell'>${products[i].quantity}</td>
        <td class='tableCell'>${products[i].category}</td>
        <td class='tableCell'><i class="fas fa-edit" id="update-product" title="Update" style="color:yellow";></i></td>
        <td class='tableCell'><i class="fa-solid fa-trash" id="update-product" title="Delete" style="color:red;"></i></td>
        </tr>
        `;
            } else if (j == products.length) {
                for (let i = 0; i < tableHead.length; i++) {
                    tableHead[i].style.color = '#fff';
                }
            }

        }
        else {
            if (String(products[i].category).toLowerCase().includes(String(value).toLowerCase())) {
                createProductsTable += `
        <tr>
        <td class='tableCell'>${i + 1}</td>
        <td class='tableCell'>${products[i].title}</td>
        <td class='tableCell'>${products[i].price}</td>
        <td class='tableCell'>${products[i].taxes}</td>
        <td class='tableCell'>${products[i].total}</td>
        <td class='tableCell'>${products[i].quantity}</td>
        <td class='tableCell'>${products[i].category}</td>
        <td class='tableCell'><i class="fas fa-edit" id="update-product" title="Update" style="color:yellow";></i></td>
        <td class='tableCell'><i class="fa-solid fa-trash" id="update-product" title="Delete" style="color:red;"></i></td>
        </tr>
        `;
            } else if (j == products.length) {
                for (let i = 0; i < tableHead.length; i++) {
                    tableHead[i].style.color = '#fff';
                }
            }


        }
    }
    document.getElementById('tableBody').innerHTML = createProductsTable;
}