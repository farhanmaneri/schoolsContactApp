// IIFE Immediately invoked function Expressions
(async function () {
  const response = await fetch("./schools.json");
  const schools = await response.json();

  const inputElem = document.getElementById("searchInput");
  const btnElem = document.getElementById("searchBtn");
  const listElem = document.getElementById("school-list");
  const detailsElem = document.getElementById("schoolDetailsContainer");

  // school search function
  function search() {
    const query = inputElem.value.toLowerCase();
    const results = schools.filter(function (school) {
      return (school.SchoolName.toLowerCase().includes(query)
        // ||          school.Tehsil.toLowerCase().includes(query)
      )
    });

    displaySearchResults(results);
    inputElem.value = " ";
    detailsElem.innerHTML = "";
  }
  // search via enter button
  inputElem.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    }
  })

  // search via search button

  btnElem.addEventListener("click", search);

  // function for display results
  function displaySearchResults(results) {
    listElem.innerHTML = "";
    results.forEach(function (school) {
      const li = document.createElement("li");
      const listItem = `
            <h2 class="title">${school.SchoolName}</h2>
            <div class="description"><h3>Emis Code ${school.EmisCode}</h3></div>
        `;
      li.innerHTML = listItem;
      // function for loading school detail on clicking li i.e school
      li.addEventListener("click", function () {
        loadschoolDetails(school);
      });
      listElem.appendChild(li);
    })
    
  }

  function loadschoolDetails(school) {
    detailsElem.innerHTML = `
       
           <h4 class="title">Emis Code: <u>  ${school.EmisCode}</u></h4>
           <h4 class="title">Schoo Level: <u>  ${school.schoolLevel}</u></h4>
           <h4 class="title">Total Enrollement: <u>  ${school.enrollement}</u></h4>
           <h4 class="title">Working Teaching Staff:  <u> ${school.teachingStaff}</u></h4>
           <h4 class="title">Working Non-teaching Staff: <u>  ${school.nonTeachingStaff}</u></p>
           `;
  }
  // <h3>School Detail:</h3>
  // return "<li>" + tehsil + "</li>"
  // <h3>Instruction:</h3>
  // <div>${school.tehsil}</div>
  //  <ul>${school.tehsil.map(function (tehsil) {
  // }).join("")}</ul>

})(); 