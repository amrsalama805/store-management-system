const getTitleElement = document.getElementById('title');
const getPriceElement = document.getElementById('price');
const getTaxesElement = document.getElementById('taxes');
const getTotalElement = document.getElementById('total');
const getQuantityElement = document.getElementById('quantity');
const getCategoryElement = document.getElementById('category');
const getsubmitProductElement = document.getElementById('submitProduct');
const getElementsToCountTotal = document.querySelectorAll('.total-element');
const getCategoryCreateElement = document.getElementById('categoryCreate');
const getTextElementsToValidate = document.querySelectorAll('.text-validations');
const getSubmitCategoryElement = document.getElementById('submitCategory');
const getCategoryElementToUpdateOrDelete = document.getElementById('chooseCategoryToAction');
const tableHead = document.getElementsByTagName('th');
const getUpdateCategoryButton = document.getElementById('updateCategory');
const getDeleteCategoryButton = document.getElementById('deleteCategory');

let errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
let mood="create";
let temp;
let inp = document.createElement('input');


//------------------------------------------------------------------------------
// -------------------------------- Validations --------------------------------
//------------------------------------------------------------------------------


// ------------------------------------------
// Validations On Title + Category inputs----
// ------------------------------------------

getTextElementsToValidate.forEach(function (element) {
    element.addEventListener('blur', () => {
        if (element.value.length >= 20) {
            errorMessage.innerHTML = 'Invalid Text.. Enter a text with at least 20 characters..';
            element.insertAdjacentElement('afterend', errorMessage);
            element.focus();
            element.select();
        } else if (element.value == '' && element == getTitleElement) {
            errorMessage.innerHTML = 'Field is Required';
            element.insertAdjacentElement('afterend', errorMessage);
            element.focus();
            element.select();
        } else {
            errorMessage.innerHTML = '';
        }
    })
})



// ---------------------------------------
// Validations On Price && Taxes inputs---
// ---------------------------------------

getElementsToCountTotal.forEach(function (element) {
    element.oninput = function () {
        element.value = element.value.replace(/[^0-9.]/g, '');
    };

    element.onblur = function () {
        if (element.value == '') {
            errorMessage.innerHTML = 'Field is Required..';
            document.querySelector('.money').insertAdjacentElement('afterend', errorMessage);
            element.focus();
            element.select();
        }
        else if (element == getPriceElement && element.value == 0) {
            errorMessage.innerHTML = `Don't Start With Zero..`;
            document.querySelector('.money').insertAdjacentElement('afterend', errorMessage);
            element.focus();
            element.select();
        } else if (/^0[0-9]/.test(element.value) || countOccurrences(element.value, '.') > 1) {
            errorMessage.innerHTML = 'Enter a VALID Input..';
            document.querySelector('.money').insertAdjacentElement('afterend', errorMessage);
            element.focus();
            element.select();
        } else {
            errorMessage.innerHTML = '';
        }
    }
});

function countOccurrences(str, charToCount) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === charToCount) {
            count++;
        }
    }

    return count;
}

//----------------------------------
// Validations On Quantity inputs---
//----------------------------------

getQuantityElement.oninput = function () {
    getQuantityElement.value = getQuantityElement.value.replace(/[^0-9]/g, '');
};

getQuantityElement.onblur = function () {
    if (getQuantityElement.value == '') {
        errorMessage.innerHTML = 'Field is Required..';
        getQuantityElement.insertAdjacentElement('afterend', errorMessage);
        getQuantityElement.focus();
        getQuantityElement.select();
    }
    else if (getQuantityElement.value == 0) {
        errorMessage.innerHTML = `Don't Start With Zero..`;
        getQuantityElement.insertAdjacentElement('afterend', errorMessage);
        getQuantityElement.focus();
        getQuantityElement.select();
    } else if (/^0[0-9]/.test(getQuantityElement.value)) {
        errorMessage.innerHTML = 'Enter a VALID Input..';
        getQuantityElement.insertAdjacentElement('afterend', errorMessage);
        getQuantityElement.focus();
        getQuantityElement.select();
    } else {
        errorMessage.innerHTML = '';
    }
}



//------------------------------------------------------------------------------
// ----------------------------------- CRUDS -----------------------------------
//------------------------------------------------------------------------------


// ------------------------------
// GET total price---------------
// ------------------------------

getElementsToCountTotal.forEach(function (element) {
    element.addEventListener('keyup', () => {
        if (getPriceElement.value != '' && getPriceElement.value != 0 &&
            !(/^0[0-9]/.test(getTaxesElement.value)) && !(/^0[0-9]/.test(getPriceElement.value)) &&
            countOccurrences(element.value, '.') <= 1) {
            let totalPrice = Number(getPriceElement.value) + Number(getTaxesElement.value);
            getTotalElement.innerHTML = totalPrice;
            getTotalElement.style.background = '#040';
        } else {
            getTotalElement.innerHTML = '';
            getTotalElement.style.background = 'rgba(255, 17, 17, 0.655)';
        }
    });
});



// ------------------------------
// CREATE products---------------
// ------------------------------

let products;

if (localStorage.products) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}

getsubmitProductElement.onclick = function () {
    if (getTitleElement.value != '' && getPriceElement.value != '' &&
        getTaxesElement.value != '' && getQuantityElement.value != '' &&
        getCategoryElement.value != '' && getCategoryElement.value !== 'Choose a Category') {

       

        let newProduct = {
            title: getTitleElement.value,
            price: getPriceElement.value,
            taxes: getTaxesElement.value,
            total: getTotalElement.innerHTML,
            quantity: getQuantityElement.value,
            category: getCategoryElement.value
        }
        if(mood==="create"){
            if (ensureExistence(products, getTitleElement.value)) {
                errorMessage.innerHTML = 'This is already product with this name..';
                getsubmitProductElement.insertAdjacentElement('afterend', errorMessage);
                return;
            }
            else{
                products.unshift(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                clearInputs();
                getTotalElement.style.background = 'rgba(255, 17, 17, 0.655)';
            }
           
        }
        else{
             
            products.splice(temp, 1);
            if (ensureExistence(products, getTitleElement.value)) {
                errorMessage.innerHTML = 'This is already product with this name..';
                getsubmitProductElement.insertAdjacentElement('afterend', errorMessage);
                products.splice(temp, 0, newProduct);
                
                return;
            }
            else{
             products.splice(temp, 0, newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            mood="create";
            getsubmitProductElement.innerHTML="create";
            clearInputs();
            

              
            }
           
           
            
        }
        // products.unshift(newProduct);
        // localStorage.setItem('products', JSON.stringify(products));
        // clearInputs();
        // getTotalElement.style.background = 'rgba(255, 17, 17, 0.655)';
    } else {
        errorMessage.innerHTML = 'Fill empty Boxes..';
        getsubmitProductElement.insertAdjacentElement('afterend', errorMessage);
    }
    showData();
    readCategories();
};



// ------------------------------
// CREATE Categories-------------
// ------------------------------

let categories;

if (localStorage.categories) {
    categories = JSON.parse(localStorage.categories);

} else {
    categories = [];
}

getSubmitCategoryElement.onclick = function () {
    if (getCategoryCreateElement.value != '' && categories.length != 0) {
        categories = JSON.parse(localStorage.categories);
        if (ensureExistence(categories, getCategoryCreateElement.value)) {
            errorMessage.innerHTML = 'This is already category with this name..';
            getCategoryCreateElement.insertAdjacentElement('afterend', errorMessage);
            return;
        }
        let newCategory = {
            title: getCategoryCreateElement.value,
        }
        categories.unshift(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));
        getCategoryCreateElement.value = '';
        readCategories();
    } else if (categories.length == 0) {
        let newCategory = {
            title: getCategoryCreateElement.value,
        }
        categories.unshift(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));
        getCategoryCreateElement.value = '';
        readCategories();
    } else {
        errorMessage.innerHTML = 'Write the Category Title..';
        getCategoryCreateElement.insertAdjacentElement('afterend', errorMessage);
    }
    showData();
};


function ensureExistence(arr, str) {
    if (arr.length == 0) return false;
    return arr.some(element => String(element.title.replace(/ /g, "")).toLowerCase().trim() === String(str.replace(/ /g, "")).toLowerCase().trim());
}

getDeleteCategoryButton.onblur = function () {
    errorMessage.innerHTML = '';
}
getSubmitCategoryElement.onblur = function () {
    errorMessage.innerHTML = '';
}

// ------------------------------
// CLEAR inputs------------------
// ------------------------------

function clearInputs() {
    getTitleElement.value = '';
    getPriceElement.value = '';
    getTaxesElement.value = '';
    getTotalElement.innerHTML = '';
    getQuantityElement.value = '';
    getCategoryElement.innerHTML = '<option disabled selected>Choose a Category</option>';
    getCategoryCreateElement.value = '';
}


// ------------------------------
// READ Data From LocalStorage---
// ------------------------------
//        <td class='tableCell ${i + 1}update' id='updateProduct' onclick()><i class="fas fa-edit" id="update-product" title="Update" style="color:yellow";></i></td>
function showData() {

    let createProductsTable = '';

    for (let i = 0; i < products.length; i++) {
        createProductsTable += `
        <tr>
        <td class='tableCell'>${i + 1}</td>
        <td class='tableCell'>${products[i].title}</td>
        <td class='tableCell'>${products[i].price}</td>
        <td class='tableCell'>${products[i].taxes}</td>
        <td class='tableCell'>${products[i].total}</td>
        <td class='tableCell'>${products[i].quantity}</td>
        <td class='tableCell'>${products[i].category}</td>

        <td class='tableCell'><i onclick=" updateData(${i})" class="fas fa-edit" id="update-product" title="Update" style="color:yellow";></i></td>
        <td class='tableCell ${i + 1}delete' id='deleteProduct' onclick='deleteProduct()'><i class="fa-solid fa-trash" id="update-product" title="Delete" style="color:red;"></i></td>
        </tr>
        `;
    }

    document.getElementById('tableBody').innerHTML = createProductsTable;


    if (document.querySelector('.tableCell')) {
        for (let i = 0; i < tableHead.length; i++) {
            tableHead[i].style.color = 'green';
        }
    }
    else {
        for (let i = 0; i < tableHead.length; i++) {
            tableHead[i].style.color = '#fff';
        }
    }

}

showData();


function readCategories() {
    getCategoryElement.innerHTML = '<option disabled selected>Choose a Category</option>';
    getCategoryElementToUpdateOrDelete.innerHTML = '<option disabled selected>Choose Category to Update or Delete</option>';
    let getCategories = JSON.parse(localStorage.getItem('categories'));
    let categoriesList = ``;
    if (getCategories != null) {
        getCategories.forEach(function (element) {
            categoriesList += `<option>${element.title}</option>`;
        });
        getCategoryElement.innerHTML += categoriesList;
        getCategoryElementToUpdateOrDelete.innerHTML += categoriesList;
    }
}

readCategories();




// ------------------------------
// DELETE Products---------------
// ------------------------------
function deleteProduct() {
    const getProductId = document.getElementById("deleteProduct").className.split(' ')[1].slice(0, -6) - 1;


    products.splice(getProductId, 1);

    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(products));

    showData();
}


// show user name

document.getElementById('userName').innerHTML=localStorage.getItem('fullName')

// LogOut

function LogOut(){
open('./Login.html','_self')
}

// UpdateCategory

 const getCategoryToUpdateElement = document.getElementById('chooseCategoryToAction');
const getCategoryUpdateInputElement = document.getElementById('up');
const getUpdateCategoryButtonElement = document.getElementById('updateCategory');

// Event listener for the dropdown menu
getCategoryToUpdateElement.addEventListener('change', function () {
    // Check if a category is selected
    if (getCategoryToUpdateElement.value !== 'Choose Category to Update or Delete') {
        // Display the input field
        getCategoryUpdateInputElement.style.display = 'block';
        // Set the value of the input field to the selected category
        getCategoryUpdateInputElement.value = getCategoryToUpdateElement.value;
    } else {
        // Hide the input field if no category is selected
        getCategoryUpdateInputElement.style.display = 'none';
    }
});

// Event listener for the "Update Category" button
getUpdateCategoryButtonElement.addEventListener('click', function () {
    // Get the updated category name from the input field
    const updatedCategoryName = getCategoryUpdateInputElement.value;

    // Update the category in the array (assuming categories is an array in your code)
    const selectedCategoryIndex = categories.findIndex(category => category.title === getCategoryToUpdateElement.value);

    if (selectedCategoryIndex !== -1) {
        categories[selectedCategoryIndex].title = updatedCategoryName;

        // Update local storage
        localStorage.setItem('categories', JSON.stringify(categories));

        // Update UI or perform any other necessary actions
        readCategories();

        // Hide the input field after updating
        getCategoryUpdateInputElement.style.display = 'none';
    }
});

// Clear input field function
function clearCategoryUpdateInput() {
    getCategoryUpdateInputElement.value = '';
    getCategoryUpdateInputElement.style.display = 'none';
}




//////////////////////// deleting a category  ////////////////////



let deleteCategoryBtn = document.getElementById('deleteCategory');

deleteCategoryBtn.addEventListener('click', function() {
  let selectedIndex = getCategoryElementToUpdateOrDelete.selectedIndex;
  if (selectedIndex > 0) {
    categories.splice(selectedIndex - 1, 1); // Subtract 1 to account for the disabled "Choose Category to Update or Delete" option
    localStorage.setItem('categories', JSON.stringify(categories));
    getCategoryUpdateInputElement.style.display = 'none';
    readCategories();
  }
});






//update product
function updateData(i){
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    
    quantity.value=products[i].quantity;
    category.value=products[i].category;
    getsubmitProductElement.innerHTML="update";
    mood="update";
    temp=i; 
    scroll({
        top:0,
        behavior:"smooth"
    });
    

 }
