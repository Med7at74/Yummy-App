/// <reference types="../@types/@types/jquery" />

// !==================== Asign Global Variables =======================

let openNavBtn = document.getElementById("open-nav");
let rowData = document.getElementById("rowData");
let SearchContainer = document.getElementById("SearchContent");

let searchBtn = document.getElementById("searchBtn"),
  areaBtn = document.getElementById("areaBtn"),
  categoryBtn = document.getElementById("categoryBtn"),
  ingreadientBtn = document.getElementById("ingreadientBtn"),
  contactBtn = document.getElementById("contactBtn");
let searchInputByName = document.getElementById("search-input-name");

// let nameInput = document.getElementById("name")
// let nameMessage = document.getElementById("nameMessage")

$(document).ready(() => {
  searchByMealName("").then(() => {
    $(".loading-screen").fadeOut(1500);
    $("body").css("overflow", "visible");
  });
});

// !-------------------------- Open and Colse Side Nav Functions ---------------------------
openNavBtn.addEventListener("click", function () {
  //   let navLinkFooterWidth = $(".nav-link-footer").innerWidth();
  let sideNavLeft = $(".side-nav").css("left");
  if (sideNavLeft == "0px") {
    closeNav();
  } else {
    openNav();
  }
  //   console.log(navLinkFooterWidth);
  //   console.log(sideNavLeft);
});

function openNav() {
  // $(".side-nav").css('left' , '0px')
  $(".side-nav").animate({ left: 0 }, 500);
  openNavBtn.classList.remove("fa-bars");
  openNavBtn.classList.add("fa-x");
  linksAnimation();
}
function closeNav() {
  let navLinkFooterWidth = $(".nav-link-footer").innerWidth();
  $(".side-nav").animate({ left: -navLinkFooterWidth }, 500);
  openNavBtn.classList.remove("fa-x");
  openNavBtn.classList.add("fa-bars");
  //   nav links animation
  $(".nav-links ul li").animate({ top: 300 }, 500);
}
closeNav();

function linksAnimation() {
  for (let i = 0; i < 5; i++) {
    $(".nav-links ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

// !-------------------------- Api Functions ---------------------------

async function searchByMealName(term) {
  const apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const responseApi = await apiResponse.json();
  let response = responseApi.meals;
  console.log(response);
  displayMeals(response);
}
// searchByMealName("");

function displayMeals(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2">
          <img
            class="w-100"
            src="${meals[i].strMealThumb}"
            alt="meal"
          />
          <div
          onclick="getIngredientMealDetails('${meals[i].idMeal}')"
            class="overlay-meal cursor position-absolute text-black d-flex align-items-center justify-content-center"
          >
            <h3>${meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
  }

  rowData.innerHTML = cartona;
}

// !-------------------------- Category Functions ---------------------------

categoryBtn.addEventListener("click", function () {
  Category();
  closeNav();
  SearchContainer.innerHTML = "";
});

async function Category() {
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await apiResponse.json();
  let arrCategory = response.categories;
  console.log(arrCategory);
  displayCategory(arrCategory);
}
function displayCategory(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
            <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2">
              <img
                class="w-100"
                src="${meals[i].strCategoryThumb}"
                alt="meal"
              />
              <div
                class="overlay-meal position-absolute text-black text-center"
              >
                <h3 class="my-3">${meals[i].strCategory}</h3>
                <p>${meals[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div>
            `;
  }

  rowData.innerHTML = cartona;
}
// !--------------------------- Area Functions ---------------------------

areaBtn.addEventListener("click", function () {
  getArea();
  closeNav();
  SearchContainer.innerHTML = "";
});
// ?--------- Get the Area and Display it
async function getArea() {
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await apiResponse.json();
  let arrArea = response.meals;
  console.log(arrArea);
  displayArea(arrArea);
}
function displayArea(area) {
  let cartona = "";
  for (let i = 0; i < area.length; i++) {
    cartona += `
            <div class="col-md-3">
            <div class=" text-center">
              
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 class="area" onclick="getAreaMeals('${area[i].strArea}')"  class="my-3">${area[i].strArea}</h3>

            </div>
          </div>
            `;
  }

  rowData.innerHTML = cartona;
}
// ?--------- Get the Area Meals and Display it when click on this Area

async function getAreaMeals(area) {
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let response = await apiResponse.json();
  let arrArea = response.meals;
  console.log(arrArea);
  displayAreaMeals(arrArea);
}
function displayAreaMeals(area) {
  let cartona = "";
  for (let i = 0; i < area.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2">
          <img
            class="w-100"
            src="${area[i].strMealThumb}"
            alt="meal"
          />
          <div
            class="overlay-meal position-absolute text-black d-flex align-items-center justify-content-center"
          >
            <h3>${area[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
  }

  rowData.innerHTML = cartona;
}

// !--------------------------- Ingrediant Functions Hell ---------------------------

ingreadientBtn.addEventListener("click", function () {
  console.log("hi");
  getIngredient();
  closeNav();
  SearchContainer.innerHTML = "";
});
// ?--------- Get the Ingredient and Display it
async function getIngredient() {
  SearchContainer.innerHTML = "";
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await apiResponse.json();
  let arrIngredient = response.meals;
  // console.log(arrIngredient);
  displayIngredient(arrIngredient);
}
function displayIngredient(ingredients) {
  let cartona = "";
  for (let i = 0; i < 20; i++) {
    cartona += `
            <div class="col-md-3">
            <div class=" text-center"> 
            <i class="fa-solid fa-drumstick-bite fa-4x my-2"></i>
            <h3 class="area" onclick="getIngredientMeals('${
              ingredients[i].strIngredient
            }')"   class="my-3">${ingredients[i].strIngredient}</h3>
            <p>${ingredients[i].strDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
            </div>
          </div>
            `;
  }

  rowData.innerHTML = cartona;
}
// ?--------- Get the Ingredient Meals and Display it when click on this Ingredient

async function getIngredientMeals(ingredient) {
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let response = await apiResponse.json();
  let arrIngredient = response.meals;
  // console.log(arrIngredient);
  displayIngredientMeals(arrIngredient);
}
function displayIngredientMeals(ingredients) {
  let cartona = "";
  for (let i = 0; i < ingredients.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2">
          <img
            class="w-100"
            src="${ingredients[i].strMealThumb}"
            alt="meal"
          />
          <div
          onclick="getIngredientMealDetails('${ingredients[i].idMeal}')"
          class="overlay-meal cursor position-absolute text-black d-flex align-items-center justify-content-center"
          >
            <h3 class="text-center">${ingredients[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
  }

  rowData.innerHTML = cartona;
}
// ?--------- Get the Ingredient Meals Details and Display it when click on this Ingredient

async function getIngredientMealDetails(mealId) {
  SearchContainer.innerHTML = "";
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let response = await apiResponse.json();
  let arrIngredient = response.meals[0];
  console.log(arrIngredient);
  displayIngredientMealsDetails(arrIngredient);
}
function displayIngredientMealsDetails(ingredients) {
  let cartona = "";
  let Recipes = ``;
  let tags = ``;
  // console.log(`${ingredients[0].strIngredient}`);
  // console.log([`strIngredient${ingredients[i]}`]);
  // console.log(ingredients['idMeal']);
  for (let i = 0; i < 20; i++) {
    if (ingredients[`strIngredient${i}`]) {
      Recipes += `<li class="alert alert-info m-1 p-1">${
        ingredients[`strMeasure${i}`]
      }${ingredients[`strIngredient${i}`]}</li>`;
    }
  }

  if (ingredients.strTags == null) {
    tags = `  <li class="alert alert-danger m-1 p-1">No Tags Available For this Meal</li>`;
  } else {
    tags = `  <li class="alert alert-danger m-1 p-1">${ingredients.strTags}</li>`;
  }

  cartona += `
    <div class="col-md-4">
    <img class="w-100 rounded-2" src="${ingredients.strMealThumb}" alt="meals details">
    <h3 class="text-center mt-3">${ingredients.strMeal}</h3>
  </div>
  <div class="col-md-8">
    <div class="meals-details">
      <h3 class="fw-bolder">Instructions</h3>
    <p>${ingredients.strInstructions}</p>
    <h3><span class="fw-bolder py-2">Area</span>     : <span>${ingredients.strArea}</span></h3>
    <h3><span class="fw-bolder py-2">Category</span> : <span>${ingredients.strCategory}</span></h3>
    <h3><span class="py-2">Recipes</span>  : </h3>
    <ul class="list-unstyled d-flex flex-wrap ">
      ${Recipes}
    </ul>
    <h3><span>Tags </span>  : </h3>
    <ul class="list-unstyled d-flex flex-wrap ">
    ${tags}

    </ul>
    <div class="mt-4">
      <a target="_blank" href="${ingredients.strSource}" class="btn btn-outline-success me-2">Source</a>
      <a target="_blank" href="${ingredients.strYoutube}"  class="btn btn-outline-danger">Youtube</a>
    </div>

    </div>
    
  
  
  </div>
        `;

  rowData.innerHTML = cartona;
}

// var text =
//   " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et alias ipsum sit! Deleniti maiores ullam necessitatibus voluptatibus deserunt? Est, ipsa.";

// let x = taxt.split(" ").slice(0, 20).join(" ");
// console.log(x);
// var arr ={

//   strIngredient1: "macaroni",
//   strIngredient2: "chicken stock",
//   strIngredient3: "heavy cream",
//   strIngredient4: "fajita seasoning",
//   strIngredient5: "salt",
//   strIngredient6: "chicken breast",
//   strIngredient7: "olive oil",
//   strIngredient8: "onion",

//   }

// console.log(arr.strIngredient1)

// !-------------------------- Search Functions ---------------------------

searchBtn.addEventListener("click", function () {
  console.log("hi");
  displaySearchContainer();
  closeNav();
});

// ?---------------> Display the Search Container <---------------!
function displaySearchContainer() {
  let cartona = ``;
  cartona += `
  <div class="col-md-6">
  <div >
      <input onkeyup="SearchByName(this.value)" id="search-input-name" class="form-control bg-transparent " placeholder="Search By Name" type="text" title="search by name">
  </div>
</div>
<div class="col-md-6">
  <div >
      <input onkeyup="SearchByFirstLeter(this.value)" maxlength="1" class="form-control  bg-transparent" placeholder="Search By First Litter" type="text" title="search by name">
  </div>
</div>
  `;

  SearchContainer.innerHTML = cartona;
  rowData.innerHTML = "";
}

// ?---------------> search by name function  <---------------!

async function SearchByName(name) {
  rowData.innerHTML = "";
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let response = await apiResponse.json();
  let arrSearch = response.meals;
  // console.log(arrSearch);
  if (arrSearch) {
    displaySearchMeals(arrSearch);
  } else {
    displaySearchMeals([]);
  }
}
// ?---------------> search by First Leter function  <---------------!

async function SearchByFirstLeter(letter) {
  rowData.innerHTML = "";
  if (letter !== "") {
    let apiResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let response = await apiResponse.json();
    let arrSearch = response.meals;
    // console.log(arrSearch);
    if (arrSearch) {
      displaySearchMeals(arrSearch);
    } else {
      displaySearchMeals([]);
    }
  }
}
// ?---------------> Display search by name and search by First Leter function  <---------------!

function displaySearchMeals(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2">
          <img
            class="w-100"
            src="${meals[i].strMealThumb}"
            alt="meal"
          />
          <div
          onclick="getIngredientMealDetails('${meals[i].idMeal}')"
            class="overlay-meal cursor position-absolute text-black d-flex align-items-center justify-content-center"
          >
            <h3>${meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
  }

  rowData.innerHTML = cartona;
}

//  !----------------------------------------------------------

contactBtn.addEventListener("click", function () {
  SearchContainer.innerHTML = "";
  showContacts();
  closeNav();
});
function showContacts() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
  document.getElementById("submitBtn").addEventListener("click", function () {
    window.alert("Submit");
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("nameInput").classList.add("is-valid");
      document.getElementById("nameInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("nameInput").classList.add("is-invalid");
      document.getElementById("nameInput").classList.remove("is-valid");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("emailInput").classList.add("is-valid");
      document.getElementById("emailInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("emailInput").classList.add("is-invalid");
      document.getElementById("emailInput").classList.remove("is-valid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("phoneInput").classList.add("is-valid");
      document.getElementById("phoneInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("phoneInput").classList.add("is-invalid");
      document.getElementById("phoneInput").classList.remove("is-valid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("ageInput").classList.add("is-valid");
      document.getElementById("ageInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("ageInput").classList.add("is-invalid");
      document.getElementById("ageInput").classList.remove("is-valid");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("passwordInput").classList.add("is-valid");
      document.getElementById("passwordInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("passwordInput").classList.add("is-invalid");
      document.getElementById("passwordInput").classList.remove("is-valid");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("repasswordInput").classList.add("is-valid");
      document.getElementById("repasswordInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("repasswordInput").classList.add("is-invalid");
      document.getElementById("repasswordInput").classList.remove("is-valid");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// // !-------------------------- contact Functions ---------------------------

// contactBtn.addEventListener("click", function () {
//   displayContactContainer();
//   closeNav();
//   SearchContainer.innerHTML = "";

//   document.getElementById("submitBtn").addEventListener("click" , function()
//  {
//   if (
//     inputsNameValidation() &&
//     inputsEmailValidation() &&
//     inputsPhoneValidation() &&
//     inputsAgeValidation() &&
//     inputsPasswordValidation() &&
//     inputsRepasswordValidation()
//   ) {
//     // document.getElementById("submitBtn").removeAttribute("disabled");
//     console.log("ok");
//   } else {
// console.log("no");  }

//  })

// });

// function displayContactContainer() {
//   SearchContainer.innerHTML = "";
//   let cartona = "";
//   cartona += `
//     <div class="contact min-vh-100 d-flex align-items-center justify-content-center">
//     <div class="container text-center ">
//         <div class="row w-50 mx-auto g-4 ">
//             <div class="col-md-6">
//                 <div>
//                     <input  onkeyup="inputsNameValidation(this.value)" id="name" class="form-control" type="text" placeholder="Enter Your Name">
//                     <div id="nameMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Special characters and numbers not allowed
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div>
//                     <input  id="email" onkeyup="inputsEmailValidation(this.value)" class="form-control" type="email" placeholder="Enter Your Email">
//                      <div id="emailMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Email not valid *exemple@yyy.zzz
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div>
//                     <input  id="phone" onkeyup="inputsPhoneValidation(this.value)" class="form-control" type="number" placeholder="Enter Your Phone">
//                      <div id="phoneMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Enter valid Phone Number
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div>
//                     <input  id="age" onkeyup="inputsAgeValidation(this.value)" class="form-control" type="number" placeholder="Enter Your Age">
//                      <div id="ageMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Enter valid age
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div>
//                     <input  id="password" onkeyup="inputsPasswordValidation(this.value)" class="form-control" type="password" placeholder="Enter Your Password">
//                      <div id="passwordMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Enter valid password *Minimum eight characters, at least one letter and one number:*
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div>
//                     <input  id="repassword" onkeyup="inputsRepasswordValidation(this.value)" class="form-control" type="password" placeholder="RePassword">
//                      <div id="repasswordMessage" class="alert alert-danger w-100 mt-2 d-none">
//                       Enter valid repassword
//                     </div>
//                 </div>
//             </div>

//         </div>

//         <button id="submitBtn"  class="btn btn-outline-danger mx-4 mt-3" type="submit"> Submit</button>
//     </div>
//  </div>
//         `;

//   rowData.innerHTML = cartona;
// }
// // !----------------------- validation Function of Name ------------------------------[]
// function inputsNameValidation(term) {
//   // ?-------> check Validation Name Function ----------------------
//   if (NameValidation(term)) {
//     document
//       .getElementById("nameMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("name").classList.add("is-valid");
//     document.getElementById("name").classList.remove("is-invalid");
//     return true;
//   } else {
//     document
//       .getElementById("nameMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("name").classList.add("is-invalid");
//     document.getElementById("name").classList.remove("is-valid");
//     return false;
//   }
// }

// // !----------------------- validation Function of Email -----------------------------

// function inputsEmailValidation(term) {
//   // ?-------> check Validation Email Function ----------------------
//   if (emailValidation(term)) {
//     document
//       .getElementById("emailMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("email").classList.add("is-valid");
//     document.getElementById("email").classList.remove("is-invalid");
//     console.log("true");
//     return true;
//   } else {
//     document
//       .getElementById("emailMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("email").classList.add("is-invalid");
//     document.getElementById("email").classList.remove("is-valid");
//     return false;
//   }
// }
// // !----------------------- validation Function of Phone Numbers ------------------------

// function inputsPhoneValidation(term) {
//   // ?-------> check Validation Phone Numbers Function ----------------------
//   if (phoneValidation(term)) {
//     document
//       .getElementById("phoneMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("phone").classList.add("is-valid");
//     document.getElementById("phone").classList.remove("is-invalid");
//     console.log("true");
//     return true;
//   } else {
//     document
//       .getElementById("phoneMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("phone").classList.add("is-invalid");
//     document.getElementById("phone").classList.remove("is-valid");
//     return false;
//   }
// }
// // !----------------------- validation Function of Age ------------------------------

// function inputsAgeValidation(term) {
//   // ?-------> check Validation Age Function ----------------------
//   if (ageValidation(term)) {
//     document
//       .getElementById("ageMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("age").classList.add("is-valid");
//     document.getElementById("age").classList.remove("is-invalid");
//     return true;
//   } else {
//     document
//       .getElementById("ageMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("age").classList.add("is-invalid");
//     document.getElementById("age").classList.remove("is-valid");
//     return false;
//   }
// }
// // !----------------------- validation Function of Password ------------------------------

// function inputsPasswordValidation(term) {
//   // ?-------> check Validation Password Function ----------------------
//   if (passwordValidation(term)) {
//     document
//       .getElementById("passwordMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("password").classList.add("is-valid");
//     document.getElementById("password").classList.remove("is-invalid");
//     return true;
//   } else {
//     document
//       .getElementById("passwordMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("password").classList.add("is-invalid");
//     document.getElementById("password").classList.remove("is-valid");
//     return false;
//   }
// }
// // !----------------------- validation Function of RePassword ------------------------------

// function inputsRepasswordValidation(term) {
//   console.log(repasswordValidation());
//   // ?-------> check Validation Password Function ----------------------
//   if (repasswordValidation()) {
//     document
//       .getElementById("repasswordMessage")
//       .classList.replace("d-block", "d-none");
//     document.getElementById("repassword").classList.add("is-valid");
//     document.getElementById("repassword").classList.remove("is-invalid");
//     return true;
//   } else {
//     document
//       .getElementById("repasswordMessage")
//       .classList.replace("d-none", "d-block");
//     document.getElementById("repassword").classList.add("is-invalid");
//     document.getElementById("repassword").classList.remove("is-valid");
//     return false;
//   }
// }

// // **--------------------------------------------**************************

// function NameValidation(term) {
//   return /^[a-zA-Z ]+$/.test(term);
// }
// function emailValidation(term) {
//   return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     term
//   );
// }
// function phoneValidation(term) {
//   return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(term);
// }

// function ageValidation(term) {
//   return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(term);
// }

// function passwordValidation(term) {
//   return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(term);
// }

// function repasswordValidation() {
//   return (
//     document.getElementById("repassword").value ==
//     document.getElementById("password").value
//   );
// }
