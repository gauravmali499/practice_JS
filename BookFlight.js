const parseURL = new URL(window.location.href);
const id = parseURL.searchParams.get("id");

let url = "http://localhost:5173/data.json";
let data;

(async () => {
  let temp = await fetch(url);
  data = await temp.json();
  book_flight();
})();

function book_flight(){
    document.getElementById("bookFlight").innerHTML = `<tr><th>Flight Name:</th><td>${data.flights[id-1].name}</td></tr>
    <tr><th>Price:</th><td>${data.flights[id-1].price}</td></tr>
    <tr><th>Name of the Person:</th><td><input type="text" class="form-control" id="pname"><span id="ErrorName" style="color: red;"></span></td></tr>
    <tr><th>No of Person:</th><td><input type="number" id="nop" onchange="price()" class="form-control"><span id="ErrorQty" style="color: red;"></span></td></tr>
    <tr><th>Tax(10%)</th><td id="ttax"></td></tr>
    <tr><th>Total Price with Tax</th><td id="total"></td></tr>
    <tr><th colspan="2"><button type="button" class="btn btn-outline-secondary" onclick="validation()">Book Flight</button></th></tr>`;
}

function validation(){
    var name = document.getElementById("pname").value;
    var no = document.getElementById("nop").value;
    var total_price = document.getElementById("total").value;
    var departureDate = data.flights[id-1].departureDate;
    var flag = 0;
    var flag1 = 0;
    if (flag == 0 || flag1 == 0) {
        if (name == "" || name.length < 4) {
            document.getElementById("ErrorName").innerText = "*enter valid name";
        } else {
            document.getElementById("ErrorName").innerText = "";
            flag = 1;
        }
        if (no < 1 || no > 10) {
            document.getElementById("ErrorQty").innerText = "*enter correct qty";
        } else {
            document.getElementById("ErrorQty").innerText = "";
            flag1 = 1;
        }
    } else {
        let pnr = Math.floor((Math.random()*1000000)+1);
        localStorage.setItem(pnr, [name, total_price, no, "2024-01-02", departureDate]);
    }
    


}

function price(){
    var num = document.getElementById("nop").value;
    document.getElementById("ttax").innerHTML = num * ((data.flights[id-1].price)/10);
    document.getElementById("total").innerHTML = (num * (data.flights[id-1].price)) + (num * ((data.flights[id-1].price)/10))
}