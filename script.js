// ! ================ code start ====================
let API = "http://localhost:8000/students";

let inpName = document.querySelector(".section__add_name");
let inpTel = document.querySelector(".section__add_tel");
let inpLastName = document.querySelector(".section__add_lastName");
let inpWeekKPI = document.querySelector(".section__add_week");
let inpMonthKPI = document.querySelector(".section__add_month");
let inpMark = document.querySelector(".section__add_mark");
let inpUrl = document.querySelector(".section__add_url");
let btnAdd = document.querySelector(".section__add_btn-add");
let accordion = document.querySelector(".accordion__header");

// console.log(accordion);
// ? тег для отображения данных

let sectionRead = document.getElementById("section__read");

let inpEditName = document.querySelector(".section__edit_name");
let inpEditTel = document.querySelector(".section__edit_tel");
let inpEditLastName = document.querySelector(".section__edit_lastName");
let inpEditWeekKPI = document.querySelector(".section__edit_week");
let inpEditMonthKPI = document.querySelector(".section__edit_month");
let inpEditMark = document.querySelector(".section__edit_mark");
let inpEditUrl = document.querySelector(".section__edit_url");
let btnEdit = document.querySelector(".window__edit_btn-save");

let btnCloseModal = document.querySelector(".window__edit_close");

console.log(btnCloseModal);

let mainmodal = document.querySelector(".main-modal");

// инпут и переменная для поиска
let inpSearch = document.querySelector(".search-txt");

let searchValue = inpSearch.value;

// paginate
let prevBtn = document.querySelector("#prev-btn");

let nextBtn = document.querySelector("#next-btn");
let countPage = 1;

let currentPage = 1;
let limit = 10;

// filter
let form = document.querySelector("form");
let mark = "all";

// console.log(
//   inpEditCategory,
//   inpEditDetails,
//   inpEditQuantity,
//   inpEditPrice,
//   inpEditSales,
//   inpEditUrl,
//   btnEditSave,
//   btnEditClose,
//   mainmodal
// );

// !=========== КОДОВОЕ СЛОВО ==========
let section_add = document.querySelector(".section__add");
let clickAdmin = document.getElementById("open-admin");
let admin_panel_arr = document.getElementsByClassName("admin-panel");
let code = "";
// console.log(admin_panel_arr);

function adminReturn() {
  if (code == "1") {
    setTimeout(() => {
      for (let i of admin_panel_arr) {
        i.style.display = "block";
      }
    }, 50);
    section_add.style.display = "block";
  } else {
    setTimeout(() => {
      for (let i of admin_panel_arr) {
        i.style.display = "none";
      }
    }, 50);
    section_add.style.display = "none";
  }
}

clickAdmin.addEventListener("click", () => {
  code = prompt("Введите кодовое слово: ");
  adminReturn();
});

// ! ============= Accordion start =========

accordion.addEventListener("click", () => {
  accordion.classList.toggle("active");
  let accordionBody = document.getElementById("accordion__body");
  if (accordion.classList.contains("active")) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
  } else {
    accordionBody.style.maxHeight = 0;
  }
});

// ? ========== ACCORDION END ==============

//! =========== Create start ============

async function createStudents(obj) {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
  readStudents();
}
btnAdd.addEventListener("click", () => {
  // проверка на заполненность
  if (
    !inpName.value.trim() ||
    !inpLastName.value.trim() ||
    !inpTel.value.trim() ||
    !inpMark.value.trim() ||
    !inpUrl.value.trim() ||
    !inpMonthKPI.value.trim() ||
    !inpWeekKPI.value.trim()
  ) {
    alert("Заполните поля!");
    return;
  }
  let obj = {
    name: inpName.value,
    lastName: inpLastName.value,
    mark: inpMark.value,
    tel: inpTel.value,
    weekKPI: inpWeekKPI.value,
    monthKPI: inpMonthKPI.value,
    urlImg: inpUrl.value,
  };
  createStudents(obj);
  inpName.value = "";
  inpLastName.value = "";
  inpMark.value = "";
  inpTel.value = "";
  inpWeekKPI.value = "";
  inpMonthKPI.value = "";
  inpUrl.value = "";
});
//! =========== Create end ============

//! =============Read start============
async function readStudents() {
  let data = await fetch(
    `${API}?q=${searchValue}&_page=${currentPage}&_limit=${limit}&${
      mark === "all" ? "" : "mark=" + mark
    }`
  ).then((res) => res.json());
  // console.log(data);
  sectionRead.innerHTML = "";
  data.forEach((students) => {
    // let productCard = document.createElement("div");
    sectionRead.innerHTML += `
  <div class="card">
  <div class="card2">
      <div class="front2" style="background-image: url(${students.urlImg});"></div>  
     <div class="back2">
      <div id="card_details2"><p>${students.name} ${students.lastName}
      <h5 class="card_sales">KPI-Week ${students.weekKPI}</h5>
      <h5 class="card_sales">KPI-Month ${students.monthKPI}</h5>
      </p></div>
     </div>  
    </div>
    <div class="text">
    <h2>${students.mark}</h2>
    <p>${students.name} ${students.lastName}</p>
  <span class="card_price">Numders: +${students.tel}</span>
  <br>
  <h5 class="card_sales">KPI-Week ${students.weekKPI}</h5>
  <h5 class="card_sales">KPI-Month ${students.monthKPI}</h5>
      </div>
      <div class= "userIcon" id="user-panel">
      <img src="../images/сердце.png" alt="">
      <button class="btnBuy">Выбрать</button>
      </div>
  <div class="admin-panel" id="admin">
    <img
      src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png"
      alt=""
      width="30"
      id=${students.id}
      class="read_del"
      onclick="deleteStudent(${students.id})"
    />
    <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" width="30" onclick="handleEditBtn(${students.id})"/>
  </div>
</div>
  `;
  });
  adminReturn();
  pageTotal();
}
readStudents();

//!=========== Read end ================

// !=============== Delete start =========

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  readStudents();
}

// !=============== Delete end =========

// !============ Edit start ============

async function editStudent(id, editedObj) {
  if (
    !inpEditName.value.trim() ||
    !inpEditLastName.value.trim() ||
    !inpEditTel.value.trim() ||
    !inpEditMark.value.trim() ||
    !inpEditUrl.value.trim() ||
    !inpEditMonthKPI.value.trim() ||
    !inpEditWeekKPI.value.trim()
  ) {
    alert("Заполните поля!");
    return;
  }
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedObj),
  });
  readStudents();
}
let editId = "";

btnCloseModal.addEventListener("click", () => {
  mainmodal.style.display = "none";
});

async function handleEditBtn(id) {
  mainmodal.style.display = "block";
  let info = await fetch(`${API}/${id}`).then((res) => res.json());
  inpEditName.value = info.name;
  inpEditLastName.value = info.lastName;
  inpEditTel.value = info.tel;
  inpEditMark.value = info.mark;
  inpEditWeekKPI.value = info.weekKPI;
  inpEditMonthKPI.value = info.monthKPI;
  inpEditUrl.value = info.urlImg;
  editId = info.id;

  btnEdit.addEventListener("click", () => {
    let editedObj = {
      name: inpEditName.value,
      lastName: inpEditLastName.value,
      mark: inpEditMark.value,
      tel: inpEditTel.value,
      weekKPI: inpEditWeekKPI.value,
      monthKPI: inpEditMonthKPI.value,
      urlImg: inpEditUrl.value,
    };
    // console.log(editedObj)
    editStudent(editId, editedObj);
    mainmodal.style.display = "none";
  });
}
// !============ Edit end ============

// !=============== Search start ========

inpSearch.addEventListener("input", (e) => {
  searchValue = e.target.value;
  readStudents();
});

// !=============== Search end ========

// !===============pagination start ======



async function pageTotal() {
  let data = await fetch(`${API}?q=${searchValue}`).then((res) => res.json());
  console.log(data.length);
  countPage = Math.ceil(data.length / limit);
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readStudents();
});

nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readStudents();
});

// !===============pagination end ======

// !=============== filter start ========

form.addEventListener("change", (e) => {
  // console.log(e.target.value);
  mark = e.target.value;
  readStudents();
});

// !=============== filter End ========

// !=============== Code end =======================================
