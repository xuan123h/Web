// Modal Show
var btnOpen = document.querySelector(".open-modal-btn");
var modal = document.querySelector(".modal");
var iconClose = document.querySelector(".modal__header i");
var btnClose = document.querySelector(".modal__footer button");

function toggleModal() {
  modal.classList.toggle("hide");
}
btnOpen.addEventListener("click", toggleModal);
btnClose.addEventListener("click", toggleModal);
iconClose.addEventListener("click", toggleModal);
modal.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModal();
  }
});
// currentTarget cái giá trị gần nhất với cái mà mình đang so sánh

// Login Form
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var form = document.querySelector("form");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      isEmptyError = true;
      showError(input, " Khong duoc de trong ");
    } else {
      showSuccess(input);
    }
  });

  return isEmptyError;
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  input.value = input.value.trim();

  let isEmailError = !regexEmail.test(input.value);
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email Invalid");
  }
  return isEmailError;
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `Phai co it nhat ${min} ky tu`);
    return true;
  }
  if (input.value.length > max) {
    showError(input, `Khong duoc qua ${max} ky tu`);
    return true;
  }
  return false;
}

// mk khong duoc trung nhau
function checkMatchPasswordError(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "MK khong trung khop");
    return true;
  }

  return false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);
  let isEmailError = checkEmailError(email);
  let isUsernameLengthError = checkLengthError(username, 3, 10);
  let isPasswordLengthError = checkLengthError(password, 3, 10);
  let isMatchError = checkMatchPasswordError(password, confirmPassword);

  if (
    isEmptyError ||
    isEmailError ||
    isUsernameLengthError ||
    isPasswordLengthError ||
    isMatchError
  ) {
    // do nothing
  } else {
    // logic, call Api,....
  }
});

// Todo List
var input = document.querySelector(".addtodos");
var button = document.querySelector("button");
var form = document.querySelector("form");
var todos = document.querySelector(".todos");

// Khi ta ba nut ok de sumbit form thi no se thuc hien
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //   console.log("ok");
  let val = input.value.trim();
  if (val) {
    addTodoElement({
      text: val,
    });
    saveTodoList();
  }

  // reset lai o input
  input.value = "";
});

function addTodoElement(todo) {
  // {
  // text:
  // status : completed
  // }
  // <li>
  //       <span> TEST </span>
  //       <i class="fa-solid fa-trash-can"></i>
  //     </li>

  var li = document.createElement("li");
  li.innerHTML = `
       <span>${todo.text}</span>
       <i class="fa-solid fa-trash-can"></i>
     `;

  if (todo.status === "completed") {
    li.setAttribute("class", "completed");
  }

  li.addEventListener("click", function () {
    this.classList.toggle("completed");
    saveTodoList();
  });

  li.querySelector("i").addEventListener("click", function () {
    // console.log(this)
    this.parentElement.remove();
    saveTodoList();
  });

  todos.appendChild(li);
}

// Luu vao local storage
function saveTodoList() {
  let todoList = document.querySelectorAll("li");
  let todoStorage = [];
  todoList.forEach(function (item) {
    let text = item.querySelector("span").innerText;
    let status = item.getAttribute("class");

    todoStorage.push({
      text: text,
      status: status,
    });
  });
  localStorage.setItem("todoList", JSON.stringify(todoStorage)); // parse tu string ve text
}

function init() {
  let data = JSON.parse(localStorage.getItem("todoList"));
  data.forEach(function (item) {
    addTodoElement(item);
  });
}
init();

// Counter Up Number
var listCounter = document.querySelectorAll(".counter");
// var youtube = document.querySelector(".youtube h2");
// var tiktok = document.querySelector(".tiktok h2");

function count(el) {
  var numberEl = el.querySelector(".number");
  var to = parseInt(numberEl.innerText);
  var count = 0;
  var time = 144;
  var step = to / time;

  let couting = setInterval(() => {
    count += step;
    if (count > to) {
      clearInterval(couting);
      numberEl.innerText = to;
    } else {
      numberEl.innerText = Math.round(count);
    }
  }, 1);
}

listCounter.forEach((item) => {
  count(item);
});

// Call Api Weather
var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".value");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var value = document.querySelector(".value");
var time = document.querySelector(".time");
var content = document.querySelector(".content");
var body = document.querySelector("body");

async function changeWeatherUI(capitalSearch) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=abfb122262285bd446d22e06af611fae`;

  let data = await fetch(apiURL).then((res) => res.json());
  console.log(data);
  if (data.cod == 200) {
    content.classList.remove("hide");
    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "%";
    let temp = Math.round(data.main.temp - 273.15);
    value.innerText = temp;
    shortDesc.innerText = data.weather[0] ? data.weather[0].main : "";
    time.innerText = new Date().toLocaleString("vi");

    body.setAttribute("class", "hot");
    if (temp <= 25) {
      body.setAttribute("class", "cool");
    }
    if (temp <= 22) {
      body.setAttribute("class", "warm");
    }
    if (temp <= 19) {
      body.setAttribute("class", "cold");
    }
  } else {
    content.classList.add("hide");
  }
}
search.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    let capitalSearch = search.value.trim();
    changeWeatherUI(capitalSearch);
  }
});
changeWeatherUI("Ha Noi");
