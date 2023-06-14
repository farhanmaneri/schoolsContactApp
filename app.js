// IIFE Immediately invoked function Expressions
(async function () {
    const response = await fetch("./schools.json");
    const schools = await response.json();
     
     const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipe-list");
    const detailsElem = document.getElementById("recipeDetailsContainer");
  
    
    function search() {
      const query = inputElem.value.toLowerCase();
      const results = schools.filter(function (recipe) {
        return (recipe.TeacherName.toLowerCase().includes(query) ||
        recipe.TeacherName.toLowerCase().includes(query))   
      });
      
      displaySearchResults(results);
      inputElem.value="";         
    }
    // search via enter button
    inputElem.addEventListener('keyup', function(event){
      if (event.key === 'Enter'){
        event.preventDefault();
        search();
      }
    })

    btnElem.addEventListener("click", search);  
    function loadRecipeDetails(recipe) {
      detailsElem.innerHTML = `
          <h2 class="title">${recipe.TeacherName}</h2>
          <h3>Ingredients:</h3>
          <ul>${recipe.TeacherName.map(function (TeacherName) {
            return "<li>" + TeacherName + "</li>"
          }).join("")}</ul>
          <h3>Instruction:</h3>
          <div>${recipe.DoB}</div>
      `;
    }
   
    function displaySearchResults (results) {
      listElem.innerHTML = "";
      results.forEach(function (recipe) {
        const li = document.createElement("li");
        const listItem = `
            <h2 class="title">${recipe.TeacherName}</h2>
            <div class="description">${recipe.DoB}</div>
        `;
        li.innerHTML = listItem;
        li.addEventListener("click", function () {
          loadRecipeDetails(recipe);
        });
        listElem.appendChild(li);
      })
    }
  
  })(); 