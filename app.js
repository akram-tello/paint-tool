const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName ("jsColor");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");
const imageLoader = document.getElementById('imageLoader');
const ctx = canvas.getContext("2d");


//config
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
  imageLoader.addEventListener('change', handleImage, false);
}

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))
console.log(Array.from(colors))

function handleColorClick (e){
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleRangeChange (){
  const sizeBrush = event.target.value;
  ctx.lineWidth = sizeBrush;
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

function handleCM(e) {
console.log(e)
e.preventDefault()
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Pandai[🎨]";
  link.click();
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}