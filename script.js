const getElem = (id) => document.getElementById(id);

const addList = () => {
  let inputVal = getElem("inputField").value;
  let getLocalStorage = localStorage.getItem("todo");
  if (inputVal !== "") {
    if (!getLocalStorage) {
      arr = [inputVal];
      setLocal(arr);
    } else {
      arr.push(inputVal);
      setLocal(arr);
    }
  } else {
    Alert("Please Add A Task...");
  }
  showUi();
  getElem("AddBtn").innerText = "✔";
  getElem("AddBtn").style.background = "#01C24E";
  setTimeout(() => {
    getElem("AddBtn").innerText = "Add";
    getElem("AddBtn").style.background = "rgb(226, 98, 226)";
  }, 1000);
  getElem("inputField").value = "";
};

function showUi() {
  const tbody = getElem("tbody");
  const f = getElem("filter")
  tbody.textContent = "";
  const getAllDataArray = getLocal();
  if (getAllDataArray === null || getAllDataArray.length == 0) {
    getElem("img-404").style.display = "block";
  } else {
    getElem("img-404").style.display = "none";
    getAllDataArray?.map((data, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${index < 9 ? "0" + ++index : ++index}</td>
              <td>${data}</td>
              <td id="action">
                <span onclick="editHandler(${index})" class="edit material-symbols-outlined">edit</span>
                <span onclick="deleteHandler(${index})" class="delete material-symbols-outlined">delete</span>
                <input id="box${index}" class="box" type="checkbox" onclick="checkBoxHandler(${index})">
              </td>`; 
      tbody.appendChild(tr);
    });
  }
}

const filterHandler = () => {
  let getAllDataArray = getLocal();
  getAllDataArray.reverse()
  
  const tbody = getElem("tbody");
  const f = getElem("filter")
  tbody.textContent = "";

  if (getAllDataArray === null || getAllDataArray.length == 0) {
    getElem("img-404").style.display = "block";
  } else {
    getElem("img-404").style.display = "none";
    getAllDataArray?.map((data, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${index < 9 ? "0" + ++index : ++index}</td>
              <td>${data}</td>
              <td id="action">
                <span onclick="editHandler(${index})" class="edit material-symbols-outlined">edit</span>
                <span onclick="deleteHandler(${index})" class="delete material-symbols-outlined">delete</span>
                <input id="box${index}" class="box" type="checkbox" onclick="checkBoxHandler(${index})">
              </td>`; 
      tbody.appendChild(tr);
    });
  }
  
}

const deleteHandler = (index) => {
  const getAllDataArray = getLocal();
  getAllDataArray.splice(index - 1, 1);
  arr = getAllDataArray;
  setLocal(getAllDataArray);
  showUi();
};

const editHandler = (index) => {
  const getAllDataArray = getLocal();
  const currentData = getAllDataArray[--index];
  getElem("inputField").value = currentData;
  getElem("inputField").focus();
  getElem("EditBtn").style.display = "block";
  getElem("AddBtn").style.display = "none";
  targetEdit = index;
};

const checkBoxHandler = (index) =>{
  const box = getElem(`box${index}`)
  const sib = box.parentElement.previousElementSibling
  if(box.checked){
    sib.classList.add("strike")
  }
  else{
    sib.classList.remove("strike")
  }
}

getElem("EditBtn").addEventListener("click", () => {
  const prevData = getLocal();
  prevData[targetEdit] = getElem("inputField").value;
  setLocal(prevData);
  arr = getLocal();
  getElem("EditBtn").style.display = "none";
  getElem("AddBtn").style.display = "block";
  getElem("inputField").value = "";
  getElem("suc-edit").style.left = "0";
  setTimeout(() => {
    getElem("suc-edit").style.left = "-100vh";
  }, 2000);
  showUi();
});

const allClear = () => {
  localStorage.clear();
  getElem("tbody").textContent = "";
  getElem("img-404").style.display = "block";
};

const setLocal = (data) => localStorage.setItem("todo", JSON.stringify(data));

const getLocal = () => JSON.parse(localStorage.getItem("todo"));

const arr = getLocal();
showUi();
let targetEdit;
