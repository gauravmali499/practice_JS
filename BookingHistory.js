var key = Object.keys(localStorage);
var table = document.getElementById("tbHistory");
for (let i = 0; i < key.length; i++) {
    var value = localStorage.getItem(key[i]);
    var arr = value.split(",");
    var row = table.insertRow();
    row.insertCell(0).innerText = key[i];
    row.insertCell(1).innerText = arr[0];
    row.insertCell(2).innerText = arr[1];
    row.insertCell(3).innerText = arr[2];
    row.insertCell(4).innerText = arr[3];
    row.insertCell(5).innerText = arr[4];
    row.insertCell(6).innerHTML = `<button type="button" class="btn btn-outline-secondary" id="cancel${key[i]}" onclick="cancel(${key[i]})">Cancel</button>`
}

function cancel(key){
    localStorage.removeItem(key);
    window.location.reload(true);
}