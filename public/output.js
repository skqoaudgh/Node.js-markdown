const tempDoc = document.getElementById('tempResult-doc');
const outputDoc = document.getElementById('output-doc');
const outputHTML = document.getElementById('output-html');
const backBtn = document.getElementById('back');
const downloadBtn = document.getElementById('download');

outputDoc.innerHTML = tempDoc.value;
outputHTML.innerHTML = outputHTML.value;

downloadBtn.href = window.URL.createObjectURL(new Blob([sessionStorage.getItem('markdown')], {type: 'text/markdown'}));

backBtn.addEventListener('click', (event) => {
    location.href = "/";
});