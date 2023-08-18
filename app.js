// IIFE Immediately invoked function Expressions
(async function () {
  const response = await fetch("./school.json");
  const schools = await response.json();
  // console.log(schools)

  const inputElem = document.getElementById("searchInput");
  const btnElem = document.getElementById("searchBtn");
  const listElem = document.getElementById("school-list");
  const detailsElem = document.getElementById("schoolDetailsContainer");

  // school search function
  function search() {
    const query = inputElem.value.toLowerCase();
    const results = schools.filter(function (school) {
      // console.log(school.teachers)
      return (school.schoolName.toLowerCase().includes(query)
        // ||  school.teachers.toLowerCase().includes(query)
        // ||  school.teachers.join(" ").toLowerCase().includes(query)
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
            <h2 class="title">${school.schoolName}</h2>
            <div class="description"><h3>Emis Code ${school.contactNo}</h3></div>
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
    <h2 class="title">${school.schoolName}</h2>
    <h3>Teachers:</h3>
    <ol>${school.teachers.map(function (teacher) {
      // console.log(teacher.teacherName)
      return "<li>" + teacher.teacherName+" "+"(" +teacher.designation +")" + "<br>"+teacher.contactNo + "<br>"+teacher.cnic + "</li>"
    }).join("")}</ol>
    <h3>Emis Code:</h3>
    
    `;
  }
    
  })(); 
  // <h4 class="title">Emis Code: <u>  ${school.EmisCode}</u></h4>
  // <h4 class="title">Schoo Level: <u>  ${school.teacherName}</u></h4>
  // <h4 class="title">Total Enrollement: <u>  ${school.enrollement}</u></h4>
  // <h4 class="title">Working Teaching Staff:  <u> ${school.teachingStaff}</u></h4>
  // <h4 class="title">Working Non-teaching Staff: <u>  ${school.nonTeachingStaff}</u></p>