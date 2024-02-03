let list_Home=$(".optionBox ").outerWidth();
 $(document).ready(function(){
    $('.optionBox').animate({left:`-${list_Home}`},10,function(){
        $('#loading2').fadeOut(1000 ,()=>{
            $('body').css("overflow","auto")
           });
        $(window).scrollTop(0) ;
        });
})
let categories=[];
$('#ToggleBtn').click(function(){
    $('.optionBox').animate({left:`0px`},1000)
    $('.home-info  ').animate({marginLeft:`${list_Home}`},1000)
    $('#closebtn').removeClass("d-none");
    $('#ToggleBtn').addClass('d-none');
})
$('#closebtn').click(function(){
    $('.optionBox').animate({left:`-${list_Home}`},1000);
    $('.home-info').animate({marginLeft:`0px`},1000)
    $('#closebtn').addClass("d-none");
    $('#ToggleBtn').removeClass('d-none');
});
let icon=document.querySelectorAll('.icon');


function displayAllCategories(arr){
    let cartoona=``;
    for (let i= 0; i < arr.length; i++){
        cartoona+=`
        <div class="col-md-3  "> 
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="  p-3 info-home position-relative ">
         <img src="${arr[i].strMealThumb}" class="w-100" >
    <div class="info position-absolute "><b class=" position-absolute  text-white" > ${arr[i].strMeal    }</b>
    </div>
    </div>
 </div>  `
        
    }
    document.getElementById('Categories').innerHTML=    cartoona;
    
}

async function getCategories(){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    $("#Search2").addClass('d-none'); 
    $("#Contacts").addClass('d-none');  
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if(request.ok){
    let data=await request.json();
   
    let categories=data.categories;
    $('#loading').fadeOut(500 );
   displayCategories(categories);
   }
}

function displayCategories(arr){
    let cartoona=``;
    for (let i= 0; i < arr.length; i++){
        cartoona+=`
        <div class="col-md-3 "> 
        <div  onclick="getByCategories('${arr[i].strCategory}')" class=" p-5 info-home position-relative ">
         <img src="${arr[i].strCategoryThumb}" class="w-100" >
        <div class="info position-absolute text-center"><b class=" position-absolute  text-white pb-3"> ${arr[i].strCategory    }</b>
        <p class="  text-white position-absolute" > ${arr[i].strCategoryDescription.slice(0,100) }</p>
    </div>
    </div>
 </div>  `
        
    }
    document.getElementById('Categories').innerHTML=    cartoona;
    
}
async function getArea(){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    $("#Search2").addClass('d-none');
    $("#Contacts").addClass('d-none');   
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    if(request.ok){
    let data=await request.json();
    let categories=data.meals.slice(0, 24);
   
   displayArea(categories);
   $('#loading').fadeOut(500 )
}}


function displayArea(arr){
    let cartoona=``;
    for (let i= 0; i < arr.length; i++){
        cartoona+=`
        <div class="col-md-3"> 
        <div class="rounded-2 text-center cursor-pointer text-white mt-5 category" onclick=" getByAree('${arr[i].strArea}')">
         <i class="text-white fa fa-home fa-4x pb-5 fs-3 fw-bold"></i>
   
   <h3 class=" text-white fw-bold  "> ${arr[i].strArea  }</h3>
 </div> 
 </div> `
        
    }
    document.getElementById('Categories').innerHTML= cartoona;
    
}
async function getIngredients(){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    $("#Search2").addClass('d-none');
    $("#Contacts").addClass('d-none');  
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if(request.ok){
    let data=await request.json();
   
    let meals=data.meals.slice(0, 24);
   displayIngredients(meals);
   $('#loading').fadeOut(500 )}
}


function displayIngredients(categories){
    let cartoona=``;
    for (let i= 0; i < categories.length; i++){
        cartoona+=`
        <div class="col-md-3"> 
        <div class="rounded-2 text-center cursor-pointer text-white mt-5 category"onclick=" getByingredients('${categories[i].strIngredient}')" >
         <i class="  	fas fa-drumstick-bite fa-4x pb-3 fs-3 fw-bold"></i>
   
    <h3 class=" text-white fw-bold  text-center"> ${categories[i].strIngredient }</h3>
    <p class=" text-white "> ${categories[i].strDescription.slice(0,100) }</p>
 </div> 
 </div> `
        
    }
    document.getElementById('Categories').innerHTML=    cartoona;
    
}
async function getMealDetails(mealID){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    if(respone.ok){
    respone = await respone.json();
    displaygetMealDetails(  respone.meals[0]);
    $('#loading').fadeOut(500 )}
}
function displaygetMealDetails(arr){
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }
    let tags = arr.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
   let cartoona=`<div class="col-md-4 p-3">
    <img src="${arr.strMealThumb}" class="w-100">
    <h2 class="text-white">${arr.strMeal}</h2>
    </div>
    <div  class="col-md-8 text-white p-3">
    <h2 class="text-white"> Instructions</h2>
    <p class="text-white">${arr.strInstructions}</p>
    <h3>Area :${arr.strArea}</h3>
    <h3>Categories :${arr.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${ ingredients}
    </ul>
    <h3>Tag :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${ tags}
    </ul>
    <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>

    </div>
    `
    document.getElementById('Categories').innerHTML=    cartoona;
}
async function getByAree(area){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    if(data.ok){
    let result=await data.json();
    displayAllCategories(result.meals.slice(0, 20))
    $('#loading').fadeOut(500 )}
}
async function getByingredients(ingredients){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    if(data.ok){
    let result=await data.json();
    displayAllCategories(result.meals.slice(0, 20))
    $('#loading').fadeOut(500 )}
}
async function getByCategories(Categories){
    $('#loading').fadeIn(500);
    $("#Categories").removeClass('d-none');
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categories}`)
    if(data.ok){
    let result=await data.json();
  
    displayAllCategories(result.meals.slice(0,20));
    $('#loading').fadeOut(500 );
}
}
getByCategories("Seafood");
function  getseacrh(){ 
    $('#loading').fadeIn(500);
    $("#Categories").addClass('d-none');
    $("#Search2").removeClass('d-none');
    $("#Contacts").addClass('d-none');
    let cartoona=`   <div class="col-md-6"> <input id="searchName"  onkeyup="seacrhMyName(this.value)" class="form-control mb-3" type="text"placeholder="search By Name"></div>
    <div class="col-md-6"> <input id="searchBYfletter"  onkeyup="searchByFLetter(this.value)" class="form-control mb-3" type="email"placeholder="search By first Letter"></div>`
    document.getElementById('Search2').innerHTML=    cartoona;
    $('#loading').fadeOut(500 )
}
function getcontant(){
    $('#loading').fadeIn(500);
    $("#Categories").addClass('d-none');
    $("#Search2").addClass('d-none'); 
    $("#Contacts").removeClass('d-none');
    $('#loading').fadeOut(500 ) 
    document.getElementById("inputname").addEventListener("focus", () => {
        nameInputTouched = true
    })
    
    document.getElementById("inputEmail").addEventListener("focus", () => {
        emailInputTouched = true
    })
    
    document.getElementById("inputPhone").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    
    document.getElementById("inputAge").addEventListener("focus", () => {
        ageInputTouched = true
    })
    
    document.getElementById("inputpassword").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    
    document.getElementById("inputrpassword").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
async function seacrhMyName(name){
    $('#loading').fadeIn(500 )
    $("#Categories").removeClass('d-none');
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(response.ok){
     response=await response.json();
   
       displayAllCategories(response.meals) ;
     $('#loading').fadeOut(500 )}
}
async function searchByFLetter(temp){
    $('#loading').fadeIn(500 )
    $("#Categories").removeClass('d-none');
  
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${temp}`);
    if(response.ok){
     response=await response.json();
       displayAllCategories(response.meals) ;
     $('#loading').fadeOut(500 )}

}

$('#Search').click(function(){
    getseacrh();  
})
$('#Area').click(function(){
    getArea();  
})
$('#categories').click(function(){
    getCategories()
})
$('#contact2').click(function(){
    getcontant()
})
$('#Ingredients').click(function(){
    getIngredients()
})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function NameValidation(){
    return( /^[A-Z a-z]{3,}$/.test(document.getElementById('inputname').value));
}
function emailValidation(){
    return(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/.test(document.getElementById('inputEmail').value));
}
function PhoneValidation(){
    return(/^[01 ]+[0125]+[0-9]{9}/.test(document.getElementById('inputPhone').value));
}
function AgeValidation(){
    return(/^[0-9 ]/.test(document.getElementById('inputAge').value));
}
function PasswordValidation(){
    return(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{4,}$/.test(document.getElementById('inputpassword').value));
}
function repasswordValidation(){
    if (document.getElementById('inputrpassword').value == document.getElementById('inputpassword').value) {
   
        return true;
      } else {
        
        return false;
      }
}
 function  vaildation(){
    
    if(nameInputTouched){
        if(NameValidation()){
       $('#nameMessage').removeClass('d-block');
       $('#nameMessage').addClass('d-none');
        }
        else{
            $('#nameMessage').removeClass('d-none');
            $('#nameMessage').addClass('d-block');
        }
    }
    if(emailInputTouched){
        if(emailValidation()){

            $('#emailMessage').removeClass('d-block')
            $('#emailMessage').addClass('d-none')
             }
             else{
                 $('#emailMessage').removeClass('d-none')
                 $('#emailMessage').addClass('d-block')
             }
    }
    if(phoneInputTouched){
        if(PhoneValidation()){

            $('#PhoneMessage').removeClass('d-block')
            $('#PhoneMessage').addClass('d-none')
             }
             else{
                 $('#PhoneMessage').removeClass('d-none')
                 $('#PhoneMessage').addClass('d-block')
             }
    }
    if(ageInputTouched){
        if(AgeValidation()){

            $('#ageMessage').removeClass('d-block')
            $('#ageMessage').addClass('d-none')
             }
             else{
                 $('#ageMessage').removeClass('d-none')
                 $('#ageMessage').addClass('d-block')
             }
    }
    if(passwordInputTouched){
        if(PasswordValidation()){

            $('#passwordMessage').removeClass('d-block')
            $('#passwordMessage').addClass('d-none')
             }
             else{
                 $('#passwordMessage').removeClass('d-none')
                 $('#passwordMessage').addClass('d-block')
             }
    }
    if(repasswordInputTouched){
        if(repasswordValidation()){

            $('#rpasswordMessage').removeClass('d-block')
            $('#rpasswordMessage').addClass('d-none')
             }
             else{
                 $('#rpasswordMessage').removeClass('d-none')
                 $('#rpasswordMessage').addClass('d-block')
             }
    }
    if(repasswordValidation()&& PasswordValidation()&&AgeValidation()&&PhoneValidation()&&emailValidation()&&NameValidation()){
        document.getElementById('btn').removeAttribute("disabled")
     }
     else{
        document.getElementById('btn').setAttribute("disabled", true)
     }
 }
 