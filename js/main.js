var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var myTable = document.getElementById("myTable");
var myBtn = document.getElementById("myBtn");
var searchInput=document.getElementById("searchInput");
let nameAlert=document.querySelector("#nameAlert");
let priceAlert=document.querySelector("#priceAlert");
let catAlert=document.querySelector("#catAlert");
let desAlert=document.querySelector("#desAlert");


var productList ;
var globalIndex;
if(localStorage.getItem('productList')){
  productList=JSON.parse(localStorage.getItem('productList'));
  displayProduct(productList);
}else{
  productList=[];
}


// function to add product
function addProduct() {
if(productNameValidation()&&productPriceValidation()&&productCategoryValidation()&&productDescriptionValidation()){
  if(myBtn.innerHTML=='Add Product'){
    var product = {
      name: productName.value,
      price: productPrice.value,
      cat: productCat.value,
      desc: productDesc.value,
    };

    productList.push(product);
    addToLocalStorage()
    clearInputS();
    displayProduct(productList);
  }else if(myBtn.innerHTML=='Update Product'){
    productList[globalIndex].name=productName.value;
    productList[globalIndex].price=productPrice.value;
    productList[globalIndex].cat=productCat.value;
    productList[globalIndex].desc=productDesc.value;
    myBtn.innerHTML="Add Product";
  }
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCat.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
  addToLocalStorage()
  clearInputS();
  displayProduct(productList);
}else if(productNameValidation()===false){
  nameAlert.classList.replace("d-none","d-block");
}else if(productPriceValidation()===false){
  priceAlert.classList.replace("d-none","d-block");
}else if(productCategoryValidation()===false){
  catAlert.classList.replace("d-none","d-block");
}else if(productDescriptionValidation()===false){
  desAlert.classList.replace("d-none","d-block");
}

}


// function to display product
function displayProduct(plist) {
  var cartoona = ``;
  for (var i = 0; i < plist.length; i++) {
    cartoona += `
<tr>
<td>${i + 1}</td>
<td>${plist[i].name}</td>
<td>${plist[i].price}</td>
<td>${plist[i].cat}</td>
<td>${plist[i].desc}</td>
<td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
<td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
</tr>`;
  }
  myTable.innerHTML = cartoona;
}


// function to clear inputs
function clearInputS(){
  productName.value='';
  productPrice.value='';
  productCat.value='';
  productDesc.value='';
}


// function to delete product
function  deleteProduct(index){
  productList.splice(index,1);
  addToLocalStorage(productList);
  displayProduct(productList);
}


// function to add to localStorage
function addToLocalStorage(){
  localStorage.setItem('productList',JSON.stringify(productList))
}


// function to update product
function updateProduct(index){
  globalIndex=index;
  productName.value=productList[index].name;
  productPrice.value=productList[index].price;
  productCat.value=productList[index].cat;
  productDesc.value=productList[index].desc;
  myBtn.innerHTML="Update Product";
}


// function to search product
function searchProduct(){
  var searchList=[];
  var term =searchInput.value;
  for(var i=0;i<productList.length;i++){
    if(productList[i].name.includes(term)){
      searchList.push(productList[i]);
    }
  }
  displayProduct(searchList);
}



// function to validate product name
function productNameValidation(){
  let regex=/^[A-Za-z0-9]{3,10}$/;
  if(regex.test(productName.value)){
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    return true;
  }else{
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  }
}


// function to validate product price
function productPriceValidation(){
  let regex=/^[A-Za-z0-9]{3,10}$/;
  if(regex.test(productPrice.value)){
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    return true;
  }else{
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    return false;
  }
}

// function to validate product category
function productCategoryValidation(){
  let regex=/^[A-Za-z0-9]{3,10}$/;
  if(regex.test(productCat.value)){
    productCat.classList.add("is-valid");
    productCat.classList.remove("is-invalid");
    return true;
  }else{
    productCat.classList.add("is-invalid");
    productCat.classList.remove("is-valid");
    return false;
  }
}



// function to validate product description
function productDescriptionValidation(){
  let regex=/^[A-Za-z0-9]{3,10}$/;
  if(regex.test(productDesc.value)){
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    return true;
  }else{
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    return false;
  }
}