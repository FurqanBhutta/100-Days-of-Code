const addButton = document.getElementById("add-btn");
const resetButton = document.getElementById("reset-btn");
const countText = document.getElementById("count")
let count = 0;

addButton.addEventListener("click", ()=>{
    countText.innerText = ++count;
})

resetButton.addEventListener("click", ()=>{
    count = 0;
    countText.innerText = count;
})