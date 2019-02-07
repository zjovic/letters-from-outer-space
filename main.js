const letters = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m"
];

let current = [];

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", pressKey);

function lunchLetter() {
  setInterval(function() {
    let index = Math.floor(Math.random() * Math.floor(letters.length));
    const box = (div = document.createElement("div"));
    let width = document.getElementById("canvas").offsetWidth;
    let height = document.getElementById("canvas").offsetHeight;
    let currentId = 0;

    document.body.appendChild(box);
    box.classList.add("box");
    addIdToBox(box);
    currentId = box.id;

    box.innerText = letters[index];
    box.style.left = Math.floor(Math.random() * width) + "px";

    current.push({ ID: currentId, Letter: letters[index] });

    setTimeout(function() {
      box.style.transform = "translateY(" + height + "px)";
    }, 1000);
    box.addEventListener("transitionend", function(e) {
      destroyBox(e.target.id);
    });
  }, 1000);
}

function addIdToBox(currentBox) {
  let id = document.createAttribute("id");
  id.value = Math.floor(Math.random() * Math.floor(100000));
  currentBox.setAttributeNode(id);
}

function destroyBox(idToDestroy) {
  for (let i = current.length - 1; i >= 0; --i) {
    if (idToDestroy === current[i].ID) {
      let deleteBox = document.getElementById(idToDestroy);
      deleteBox.classList.add("flicker-out");
      setTimeout(function() {
        deleteBox.remove();
        current.splice(i, 1);
      }, 500);
    }
  }
}

function removeStartBtn() {
  start.remove();
}

function checkKey(key) {
  console.log(key);
  let pressedKey = key.getAttribute("data-key");

  for (let i = current.length - 1; i >= 0; --i) {
    if (pressedKey === current[i].Letter) {
      let id = current[i].ID;
      let deleteBox = document.getElementById(id);
      deleteBox.remove();
      current.splice(i, 1);
    }
  }
}

const start = document.querySelector("#start");
start.addEventListener("click", () => {
  lunchLetter();
  removeStartBtn();
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("press");
}

function pressKey(e) {
  const key = document.querySelector(`div[data-key="${e.key}"]`);
  key.classList.add("press");
  checkKey(key);
}
