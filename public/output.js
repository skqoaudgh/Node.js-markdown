const tempDoc = document.getElementById('tempResult-doc');
const outputDoc = document.getElementById('output-doc');
const outputHTML = document.getElementById('output-html');
const backBtn = document.getElementById('back');

outputDoc.innerHTML = tempDoc.value;
outputHTML.innerHTML = outputHTML.value;

backBtn.addEventListener('click', (event) => {
    location.href = "/";
});