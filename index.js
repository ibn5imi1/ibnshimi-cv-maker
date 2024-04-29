// start all vars
const block = [
  "first-name",
  "last-name",
  "photo",
  "first_name",
  "last_name",
  "email",
  "headline",
  "phone_number",
  "address",
  "postcode",
  "city",
  "website",
  "linkedin",
  "skills",
  "employments",
  "achievement",
  "educations",
  "languages",
  "hobbies",
];
const input_container = document.querySelectorAll(".input_container");
const icon = document.querySelectorAll(".icon");

const edit_photo_icon = document.querySelector(
  ".photo_fullname_email .photo .photo_edit>i"
);
const list_photo_edit = document.querySelector(
  ".photo_fullname_email .photo .photo_edit ul"
);
const headline_phonenumber_address_city_links = document.querySelector(
  ".headline_phonenumber_address_city_links"
);

// start vars add and remove photo
const add_photo = document.querySelector(".add_photo");
const edit_photo = document.querySelector("#edit");
const remove_photo = document.querySelector("#remove");
const image_input = document.querySelector("#image_input");
const filed_form = document.querySelector(".filed_form");
const save_filed = document.getElementById("save_filed");
let current_image = null;
// end vars add and remove photo

const add_filed = document.querySelector("#add_filed");

const skill_form = document.querySelector(".skill_form");
const save_skill = document.getElementById("save_skill");
const add_skills = document.querySelector("#add_skill");
const show_skills_input = document.querySelector(".show_skills_input");

const show_employments_input = document.querySelector(
  ".show_employments_input"
);
const employment_form = document.querySelector(".employment_form");
const add_employment = document.getElementById("add_employment");
const save_employment = document.getElementById("save_employment");

const show_educations_input = document.querySelector(".show_educations_input");
const education_form = document.querySelector(".education_form");
const add_education = document.getElementById("add_education");
const save_education = document.getElementById("save_education");

const show_languages_input = document.querySelector(".show_languages_input");
const language_form = document.querySelector(".language_form");
const save_lang = document.getElementById("save_lang");
const add_language = document.getElementById("add_language");

const show_hobbies_input = document.querySelector(".show_hobbies_input");
const hobby_form = document.querySelector(".hobby_form");
const save_hobby = document.getElementById("save_hobby");
const add_hobby = document.getElementById("add_hobby");

let other_data_resume;

const resume = document.querySelector(".resume");
// end all vars

icon.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("open");
    icon.parentElement.parentElement.classList.toggle("open");
  });
});

// start show and remove photo edit list
const isClickInsideMenu = (targetElement) => {
  return (
    list_photo_edit.contains(targetElement) ||
    edit_photo_icon.contains(targetElement)
  );
};
const hideMenu = () => {
  list_photo_edit.style.display = "none";
};
edit_photo_icon.addEventListener("click", () => {
  if (list_photo_edit.style.display === "block") {
    hideMenu();
  } else {
    list_photo_edit.style.display = "block";
  }
});
document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (!isClickInsideMenu(clickedElement)) {
    hideMenu();
  }
});
// end show and remove photo edit list

// start add and remove photo
edit_photo.addEventListener("click", () => {
  image_input.click();
});
add_photo.addEventListener("click", () => {
  image_input.click();
});

image_input.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    return;
  }
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageElement = document.createElement("img");
    imageElement.src = event.target.result;
    imageElement.alt = selectedFile.name;

    if (current_image) {
      add_photo.removeChild(current_image);
    }

    add_photo.appendChild(imageElement);

    current_image = imageElement;

    // save photo in local storage
    localStorage.setItem("photo", event.target.result);

    // get all data to create resume
    getAllDataForOutput();
  };
  reader.readAsDataURL(selectedFile);


});

// get photo from local storage
if (localStorage.getItem("photo")) {
  const imageElement = document.createElement("img");
  imageElement.src = localStorage.getItem("photo");
  add_photo.appendChild(imageElement);
  current_image = imageElement;
}

remove_photo.addEventListener("click", () => {
  if (current_image) {
    add_photo.removeChild(current_image);
    current_image = null;
    localStorage.removeItem("photo");

    // get all data to create resume
    getAllDataForOutput();
  }
});
// end add and remove photo

// start add new filed
filed_form.style.display = "none";
document.addEventListener("click", (event) => {
  let isClickFiledForm =
    filed_form.contains(event.target) || event.target === add_filed;
  if (!isClickFiledForm) {
    filed_form.style.display = "none";
  }
});
add_filed.addEventListener("click", () => {
  // show and hidden file form
  if (filed_form.style.display === "block") {
    filed_form.style.display = "none";
  } else {
    filed_form.style.display = "block";
  }
});
save_filed.addEventListener("click", () => {
  localStorage.setItem(document.getElementById("filed").value, "");
  // Clear the form fields after saving
  document.getElementById("filed").value = "";

  showOtherData();

  // get all data to create resume
  getAllDataForOutput();
});



function showOtherData() {
  let keys = Object.keys(localStorage);
  let allItems = keys.map((key) => {
    return {
      key: key,
      value: localStorage.getItem(key),
    };
  });
  let filteringData = allItems.filter((item) => {
    let other_data = !block.includes(item.key);
    return other_data;
  });
  // for show other data in resume
  other_data_resume = filteringData;
  let show = filteringData.map((filed) => {
    let parentDiv = document.createElement("div");
    let divContainer = document.createElement("div");
    let divLabelTrash = document.createElement("div");
    let divInput = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    let iconTrash = document.createElement("i");

    label.textContent = filed.key;
    input.type = "text";
    input.className = filed.key;
    input.id = filed.key;

    iconTrash.classList.add("fa-solid", "fa-trash");

    input.addEventListener("input", (event) => {
      localStorage.setItem(filed.key, event.target.value);

      getAllDataForOutput();
    });
    input.value = filed.value;

    divLabelTrash.style.display = "flex";
    divLabelTrash.style.justifyContent = "space-between";
    divLabelTrash.style.cursor = "pointer";

    // for delete element from page and local storage
    iconTrash.addEventListener("click", (event) => {
      let key = event.target.parentElement.children[0].textContent;
      localStorage.removeItem(key);
      location.reload();
    });

    divLabelTrash.appendChild(label);
    divLabelTrash.appendChild(iconTrash);
    divInput.appendChild(input);

    divContainer.appendChild(divLabelTrash);
    divContainer.appendChild(divInput);
    parentDiv.appendChild(divContainer);
    headline_phonenumber_address_city_links.appendChild(parentDiv);

    // sava data filed in local storage
  });
}
showOtherData();

// end add new filed

// start get and add Skills
if (localStorage.getItem("skills") === null) {
  localStorage.setItem("skills", JSON.stringify([]));
}

// add new skill
document.addEventListener("click", (event) => {
  let isClickLanguageForm =
    skill_form.contains(event.target) || event.target === add_skills;
  if (!isClickLanguageForm) {
    skill_form.style.display = "none";
  }
});

add_skills.addEventListener("click", () => {
  // show and hidden skill form
  if (skill_form.style.display === "block") {
    skill_form.style.display = "none";
  } else {
    skill_form.style.display = "block";
  }
});
let skills = JSON.parse(localStorage.getItem("skills"));

save_skill.addEventListener("click", () => {
  const skill = {
    skill: document.getElementById("skill").value,
    skill_level: document.getElementById("skill_level").value,
  };
  // Add the new skill object to the skills array
  skills.push(skill);

  // Store the updated skills array back into local storage
  localStorage.skills = JSON.stringify(skills);

  // Clear the form fields after saving
  document.getElementById("skill").value = "";
  document.getElementById("skill_level").value = "";

  showSkillsInInputs();

  // get all data to create resume
  getAllDataForOutput();
});

function showSkillsInInputs() {
  show_skills_input.innerHTML = "";
  for (let i = 0; i < skills.length; i++) {
    let skill = `<div class="skill">
                <div>
                  <h3>${skills[i].skill}</h3>
                  <p>${skills[i].skill_level}</p>
                </div>
                <div>
                  <i class="fa-solid fa-trash remove_skill" data-index=${i}></i>
                </div>
              </div>`;
    show_skills_input.innerHTML += skill;
  }
}
showSkillsInInputs();

// remove skill
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove_skill")) {
    let indexToRemove = parseInt(event.target.getAttribute("data-index"));
    skills.splice(indexToRemove, 1);
    localStorage.skills = JSON.stringify(skills);
    showSkillsInInputs();

    // get all data to create resume
    getAllDataForOutput();
  }
});
// end get and add Skills

// start add and get employments

// check if local storage has employments key
if (!localStorage.getItem("employments")) {
  localStorage.setItem("employments", JSON.stringify([]));
}
document.addEventListener("click", (event) => {
  let isClickEmploymentsForm =
    employment_form.contains(event.target) || event.target === add_employment;
  if (!isClickEmploymentsForm) {
    employment_form.style.display = "none";
  }
});
add_employment.addEventListener("click", () => {
  // show and hidden employment form
  if (employment_form.style.display === "block") {
    employment_form.style.display = "none";
  } else {
    employment_form.style.display = "block";
  }
});

let employments = JSON.parse(localStorage.getItem("employments"));
save_employment.addEventListener("click", () => {
  const employment = {
    employment: document.getElementById("employ").value,
    employer: document.getElementById("employer").value,
    city: document.getElementById("employ_city").value,
    startMonth: document.getElementById("start_employment_month").value,
    startYear: document.getElementById("start_employment_year").value,
    endMonth: document.getElementById("end_employment_month").value,
    endYear: document.getElementById("end_employment_year").value,
    employment_description: document.getElementById("employment_description")
      .value,
  };
  // Add the new employment object to the employments array
  employments.push(employment);

  // Store the updated employments array back into local storage
  localStorage.employments = JSON.stringify(employments);

  // Clear the form fields after saving
  document.getElementById("employ").value = "";
  document.getElementById("employer").value = "";
  document.getElementById("employ_city").value = "";
  document.getElementById("start_employment_month").value = "";
  document.getElementById("start_employment_year").value = "";
  document.getElementById("end_employment_month").value = "";
  document.getElementById("end_employment_year").value = "";
  document.getElementById("employment_description").value = "";

  showEmploymentsInInputs();

  // get all data to create resume
  getAllDataForOutput();
});

function showEmploymentsInInputs() {
  show_employments_input.innerHTML = "";
  for (let i = 0; i < employments.length; i++) {
    let emp = `<div class="employ">
                <div>
                  <h3>${employments[i].employment}</h3>
                  <p>${employments[i].employer}, ${employments[i].city}</p>
                </div>
                <div>
                  <i class="fa-solid fa-trash remove_employment" data-index=${i}></i>
                </div>
              </div>`;
    show_employments_input.innerHTML += emp;
  }
}
showEmploymentsInInputs();

// remove employment
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove_employment")) {
    let indexToRemove = parseInt(event.target.getAttribute("data-index"));
    employments.splice(indexToRemove, 1);
    localStorage.employments = JSON.stringify(employments);
    showEmploymentsInInputs();

    // get all data to create resume
    getAllDataForOutput();
  }
});
// end add and get employments

// start add and get education

// check if local storage has educations key
if (!localStorage.getItem("educations")) {
  localStorage.setItem("educations", JSON.stringify([]));
}
document.addEventListener("click", (event) => {
  let isClickEducationForm =
    education_form.contains(event.target) || event.target === add_education;
  if (!isClickEducationForm) {
    education_form.style.display = "none";
  }
});
add_education.addEventListener("click", () => {
  // show and hidden education form
  if (education_form.style.display === "block") {
    education_form.style.display = "none";
  } else {
    education_form.style.display = "block";
  }
});

let educations = JSON.parse(localStorage.getItem("educations"));
save_education.addEventListener("click", () => {
  const education = {
    edu: document.getElementById("edu").value,
    school: document.getElementById("school").value,
    city: document.getElementById("edu_city").value,
    startMonth: document.getElementById("start_month").value,
    startYear: document.getElementById("start_year").value,
    endMonth: document.getElementById("end_month").value,
    endYear: document.getElementById("end_year").value,
    education_description: document.getElementById("education_description")
      .value,
  };
  // Add the new education object to the educations array
  educations.push(education);

  // Store the updated educations array back into local storage
  localStorage.educations = JSON.stringify(educations);

  // Clear the form fields after saving
  document.getElementById("edu").value = "";
  document.getElementById("school").value = "";
  document.getElementById("edu_city").value = "";
  document.getElementById("start_month").value = "";
  document.getElementById("start_year").value = "";
  document.getElementById("end_month").value = "";
  document.getElementById("end_year").value = "";
  document.getElementById("education_description").value = "";

  showEducationsInInputs();

  // get all data to create resume
  getAllDataForOutput();
});

function showEducationsInInputs() {
  show_educations_input.innerHTML = "";
  for (let i = 0; i < educations.length; i++) {
    let edu = `<div class="edu">
                <div>
                  <h3>${educations[i].edu}</h3>
                  <p>${educations[i].school}, ${educations[i].city}</p>
                </div>
                <div>
                  <i class="fa-solid fa-trash remove_education" data-index=${i}></i>
                </div>
              </div>`;
    show_educations_input.innerHTML += edu;
  }
}
showEducationsInInputs();

// remove education
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove_education")) {
    let indexToRemove = parseInt(event.target.getAttribute("data-index"));
    educations.splice(indexToRemove, 1);
    localStorage.educations = JSON.stringify(educations);
    showEducationsInInputs();

    // get all data to create resume
    getAllDataForOutput();
  }
});
// end add and get education

// start add and get languages
if (!localStorage.getItem("languages")) {
  localStorage.setItem("languages", JSON.stringify([]));
}
document.addEventListener("click", (event) => {
  let isClickLanguageForm =
    language_form.contains(event.target) || event.target === add_language;
  if (!isClickLanguageForm) {
    language_form.style.display = "none";
  }
});

add_language.addEventListener("click", () => {
  // show and hidden language form
  if (language_form.style.display === "block") {
    language_form.style.display = "none";
  } else {
    language_form.style.display = "block";
  }
});

let languages = JSON.parse(localStorage.getItem("languages"));
save_lang.addEventListener("click", () => {
  const language = {
    language: document.getElementById("language").value,
    language_level: document.getElementById("language_level").value,
  };
  // Add the new language object to the languages array
  languages.push(language);

  // Store the updated languages array back into local storage
  localStorage.languages = JSON.stringify(languages);

  // Clear the form fields after saving
  document.getElementById("language").value = "";
  document.getElementById("language_level").value = "";

  showLanguagesInInputs();

  // get all data to create resume
  getAllDataForOutput();
});

function showLanguagesInInputs() {
  show_languages_input.innerHTML = "";
  for (let i = 0; i < languages.length; i++) {
    let lang = `<div class="lang">
                <div>
                  <h3>${languages[i].language}</h3>
                  <p>${languages[i].language_level}</p>
                </div>
                <div>
                  <i class="fa-solid fa-trash remove_language" data-index=${i}></i>
                </div>
              </div>`;
    show_languages_input.innerHTML += lang;
  }
}
showLanguagesInInputs();

// remove language
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove_language")) {
    let indexToRemove = parseInt(event.target.getAttribute("data-index"));
    languages.splice(indexToRemove, 1);
    localStorage.languages = JSON.stringify(languages);
    showLanguagesInInputs();

    // get all data to create resume
    getAllDataForOutput();
  }
});

// end add and get languages

// start add and get hobbies
if (!localStorage.getItem("hobbies")) {
  localStorage.setItem("hobbies", JSON.stringify([]));
}
document.addEventListener("click", (event) => {
  let isClickHobbyForm =
    hobby_form.contains(event.target) || event.target === add_hobby;
  if (!isClickHobbyForm) {
    hobby_form.style.display = "none";
  }
});

add_hobby.addEventListener("click", () => {
  // show and hidden language form
  if (hobby_form.style.display === "block") {
    hobby_form.style.display = "none";
  } else {
    hobby_form.style.display = "block";
  }
});

let hobbies = JSON.parse(localStorage.getItem("hobbies"));
save_hobby.addEventListener("click", () => {
  const hobby = document.getElementById("hobby_input").value;

  // Add the new hobby to the hobbies array
  hobbies.push(hobby);

  // Store the updated hobbies array back into local storage
  localStorage.hobbies = JSON.stringify(hobbies);

  // Clear the form fields after saving
  document.getElementById("hobby_input").value = "";

  showHobbiesInInputs();

  // get all data to create resume
  getAllDataForOutput();
});

function showHobbiesInInputs() {
  show_hobbies_input.innerHTML = "";
  for (let i = 0; i < hobbies.length; i++) {
    let hobby = `<div class="hobby">
                <div class="text_hobby">
                  <h3>${hobbies[i]}</h3>
                </div>
                <div>
                  <i class="fa-solid fa-trash remove_hobby" data-index=${i}></i>
                </div>
              </div>`;
    show_hobbies_input.innerHTML += hobby;
  }
}
showHobbiesInInputs();

// remove hobby
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove_hobby")) {
    let indexToRemove = parseInt(event.target.getAttribute("data-index"));
    hobbies.splice(indexToRemove, 1);
    localStorage.hobbies = JSON.stringify(hobbies);
    showHobbiesInInputs();

    // get all data to create resume
    getAllDataForOutput();
  }
});

// end add and get hobbies

// start add and get data to local storage
if (localStorage.getItem("first_name")) {
  document.getElementById("first_name").value =
    localStorage.getItem("first_name");
} else {
  localStorage.setItem("first-name", "");
}

document.getElementById("first_name").addEventListener("input", (event) => {
  localStorage.setItem("first_name", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});


if (localStorage.getItem("last_name")) {
  document.getElementById("last_name").value =
    localStorage.getItem("last_name");
} else {
  localStorage.setItem("last-name", "");
}
document.getElementById("last_name").addEventListener("input", (event) => {
  localStorage.setItem("last_name", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});

if (localStorage.getItem("email")) {
  document.getElementById("email").value =
    localStorage.getItem("email");
} else {
  localStorage.setItem("email", "");
}

document.getElementById("email").addEventListener("input", (event) => {
  localStorage.setItem("email", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});

if (localStorage.getItem("headline")) {
  document.getElementById("headline").value =
    localStorage.getItem("headline");
} else {
  localStorage.setItem("headline", "");
}

document.getElementById("headline").addEventListener("input", (event) => {
  localStorage.setItem("headline", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});

if (localStorage.getItem("phone_number")) {
  document.getElementById("phonenumber").value =
    localStorage.getItem("phone_number");
} else {
  localStorage.setItem("phone_number", "");
}

document.getElementById("phonenumber").addEventListener("input", (event) => {
  localStorage.setItem("phone_number", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});


if (localStorage.getItem("address")) {
  document.getElementById("address").value =
    localStorage.getItem("phone_number");
} else {
  localStorage.setItem("address", "");
}

document.getElementById("address").addEventListener("input", (event) => {
  localStorage.setItem("address", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});


if (localStorage.getItem("postcode")) {
  document.getElementById("postcode").value =
    localStorage.getItem("postcode");
} else {
  localStorage.setItem("postcode", "");
}

document.getElementById("postcode").addEventListener("input", (event) => {
  localStorage.setItem("postcode", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});


if (localStorage.getItem("city")) {
  document.getElementById("city").value =
    localStorage.getItem("city");
} else {
  localStorage.setItem("city", "");
}

document.getElementById("city").addEventListener("input", (event) => {
  localStorage.setItem("city", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});

if (localStorage.getItem("website")) {
  document.getElementById("website").value =
    localStorage.getItem("website");
} else {
  localStorage.setItem("website", "");
}

document.getElementById("website").addEventListener("input", (event) => {
  localStorage.setItem("website", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});

if (localStorage.getItem("linkedin")) {
  document.getElementById("linkedin").value =
    localStorage.getItem("linkedin");
} else {
  localStorage.setItem("linkedin", "");
}

document.getElementById("linkedin").addEventListener("input", (event) => {
  localStorage.setItem("linkedin", event.target.value);

  // get all data to create resume
  getAllDataForOutput();
});


// save Achievement Description
document
  .getElementById("achievement_description")
  .addEventListener("input", (event) => {
    localStorage.setItem("achievement", event.target.value);

    // get all data to create resume
    getAllDataForOutput();
  });
document.getElementById("achievement_description").value =
  localStorage.getItem("achievement");
// end add and get data to local storage

function getAllDataForOutput() {
  let data_object = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    data_object[key] = value;
  }
  let keys = Object.keys(localStorage);
  let allItems = keys.map((key) => {
    return {
      key: key,
      value: localStorage.getItem(key),
    };
  });
  let filteringDataRes = allItems.filter((item) => {
    let other_data = !block.includes(item.key);
    return other_data;
  });
  makeOutput(data_object, filteringDataRes);

}
getAllDataForOutput();

function makeOutput(data, filteringDataRes) {
  const tableRows = filteringDataRes
    .map(
      (detail) => `
    <tr>
      <th>${detail.key}</th>
      <td>${detail.value}</td>
    </tr>
  `
    )
    .join("");

  const table_skills = JSON.parse(data.skills)
    .map(
      (skill) => `
    <tr>
      <th>${skill.skill}</th>
      <td>${skill.skill_level}</td>
    </tr>
  `
    )
    .join("");

  const table_employments = JSON.parse(data.employments)
    .map(
      (emp) => `
    
      <div class="emp_container">
        <div class="emp_date">
          ${emp.startMonth}/${emp.startYear} - ${emp.endMonth}/${emp.endYear}
        </div>
        <div class="emp_desc">
          ${emp.employment} <br>
          ${emp.employer}, ${emp.city} <br> <br>
          <pre>${emp.employment_description}</pre>
        </div>
      </div>
    
  `
    )
    .join("");

  const table_educations = JSON.parse(data.educations)
    .map(
      (edu) => `
    
      <div class="edu_container">
        <div class="edu_date">
          ${edu.startMonth}/${edu.startYear} - ${edu.endMonth}/${edu.endYear}
        </div>
        <div class="edu_desc">
          ${edu.edu} <br>
          ${edu.school}, ${edu.city} <br> <br>
          <pre>${edu.education_description}</pre>
        </div>
      </div>
    
  `
    )
    .join("");

  const table_languages = JSON.parse(data.languages)
    .map(
      (lang) => `
    
      <tr>
      <th>${lang.language}</th>
      <td>${lang.language_level}</td>
    </tr>
    
  `
    )
    .join("");

  const table_hobbies = JSON.parse(data.hobbies)
    .map(
      (hobby) => `
    
      <li>
      <pre>${hobby}</pre>
      </li>
    
  `
    )
    .join("");

  resume.innerHTML = `
    <div class="resume_name_headline">
        <h1>${data.first_name || ""} ${data.last_name || ""}</h1>
        <h4>${data.headline || ""}</h4>
    </div>
    <div class="resume_content resume_personal">
      <h3>Personal</h3>
      <hr/>
      <div class="img_table_personal">
        <table>
        ${data.email.length > 0 ?
      `
            <tr>
              <th>Email</th>
              <td>${data.email}</td>
            </tr> 
          `: ""}

        ${data.phone_number.length > 0 ?
      `
            <tr>
              <th>Phone Number</th>
              <td>${data.phone_number}</td>
            </tr> 
          `: ""}

          ${data.address.length > 0 ?
      `
            <tr>
              <th>Address</th>
              <td>${data.address}, ${data.postcode || ""} ${data.city || ""}</td>
            </tr> 
          `: ""}

          ${data.website.length > 0 ?
      `
            <tr>
              <th>Website</th>
              <td>${data.website}</td>
            </tr> 
          `: ""}

          ${data.linkedin.length > 0 ?
      `
            <tr>
              <th>LinkedIn</th>
              <td>${data.linkedin}</td>
            </tr> 
          `: ""}
          ${tableRows}
      </table>
      <div class="resume_img">
            ${data.photo ? `<img src="${data.photo}"}/>` : ""
    }
      </div>
      </div>
    </div>
    ${JSON.parse(data.skills).length > 0
      ? `<div class="resume_content resume_skills">
      <h3>Skills</h3>
      <hr/>
      <table>
      ${table_skills}
      </table>
    </div>`
      : ""
    }

    ${JSON.parse(data.employments).length > 0
      ? `<div class="resume_content resume_employments">
      <h3>Employments</h3>
      <hr/>
      ${table_employments}
      </div>`
      : ""
    }

    ${data.achievement
      ? `<div class="resume_content resume_achievement">
      <h3>Achievement</h3>
      <hr/>
      <pre>${data.achievement}</pre>
    </div>`
      : ""
    }

    ${JSON.parse(data.educations).length > 0
      ? `<div class="resume_content resume_educations">
      <h3>Educations</h3>
      <hr/>
      ${table_educations}
      </div>`
      : ""
    }

    ${JSON.parse(data.languages).length > 0
      ? `<div class="resume_content resume_languages">
      <h3>Languages</h3>
      <hr/>
      <table>
      ${table_languages}
      </table>
    </div>`
      : ""
    }
    ${JSON.parse(data.hobbies).length > 0
      ? `<div class="resume_content resume_hobbies">
      <h3>Hobbies</h3>
      <hr/>
      <ul>
      ${table_hobbies}
      </ul>
    </div>`
      : ""
    }
  `;
}

// for save resume by PDF
document.getElementById("show").addEventListener("click", () => {
  document.querySelector("section.output").classList.toggle("show");
});

document.getElementById("download").addEventListener("click", () => {
  var opt = {
    filename: `${document.getElementById("first_name").value || "cv"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(document.querySelector(".resume")).set(opt).save();
});
