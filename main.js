let url = "http://localhost:5173/data.json";
let data;
var date = "2024-01-02";
var date15 = "2024-01-17";

(async () => {
  let temp = await fetch(url);
  data = await temp.json();
  SearchFlight();
})();

function SearchFlight() {
  var destination = document.getElementById("Destination");
  var source = document.getElementById("Source");
  for (let i = 0; i < data.destinations.length; i++) {
    destination.innerHTML += `<option value="${data.destinations[i].name}">${data.destinations[i].name}</option>`;
  }
  for (let j = 0; j < data.sources.length; j++) {
    source.innerHTML += `<option value="${data.sources[j].name}">${data.sources[j].name}</option>`;
  }
  for (let k = 0; k < data.flights.length; k++) {
    if (new Date(data.flights[k].departureDate) >= new Date(date) && new Date(data.flights[k].departureDate) <= new Date(date15)) {
      var table = document.getElementById("FlightList");
      var row = table.insertRow();
      row.insertCell(0).innerText = data.flights[k].name;
      row.insertCell(1).innerText = id_to_source(data.flights[k].sourceID);
      row.insertCell(2).innerText = id_to_destination(data.flights[k].destinationID);
      row.insertCell(3).innerText = data.flights[k].price;
      row.insertCell(4).innerHTML = `<button type="button" class="btn btn-outline-secondary" id="btnBook${data.flights[k].flightID}"><a href="BookFlight.html?id=${data.flights[k].flightID}">Book</a></button>`
    }
  }
}

document.getElementById("btnSearch").addEventListener("click", function() {
  var table = document.getElementById("FlightList");
  for (let i = 0; i < data.flights.length; i++) {
    if (((document.getElementById("Source").value == id_to_source(data.flights[i].sourceID)) && ((document.getElementById("Destination").value) == id_to_destination(data.flights[i].destinationID))) && (document.getElementById("departureDate").value == data.flights[i].departureDate)) {
      deleteExistingRows();
      var row = table.insertRow();
      row.insertCell(0).innerText = data.flights[i].name;
      row.insertCell(1).innerText = id_to_source(data.flights[i].sourceID);
      row.insertCell(2).innerText = id_to_destination(data.flights[i].destinationID);
      row.insertCell(3).innerText = data.flights[i].price;
      row.insertCell(4).innerHTML = `<button type="button" class="btn btn-outline-secondary" id="btnBook${data.flights[i].flightID}"><a href="BookFlight.html?id=${data.flights[i].flightID}">Book</a></button>`;
    } else if ((document.getElementById("txtSearch").value == data.flights[i].name)) {
      deleteExistingRows();
      var row = table.insertRow();
      row.insertCell(0).innerText = data.flights[i].name;
      row.insertCell(1).innerText = id_to_source(data.flights[i].sourceID);
      row.insertCell(2).innerText = id_to_destination(data.flights[i].destinationID);
      row.insertCell(3).innerText = data.flights[i].price;
      row.insertCell(4).innerHTML = `<button type="button" class="btn btn-outline-secondary" id="btnBook${data.flights[i].flightID}"><a href="BookFlight.html?id=${data.flights[i].flightID}">Book</a></button>`;
    }
  }  
});

function id_to_source(id){
  for (let i = 0; i < data.sources.length; i++) {
    if (data.flights[i].flightID == id) {
      return data.sources[i].name;
    }
  }
}

function id_to_destination(id) {
  for (let i = 0; i < data.destinations.length; i++) {
    if (data.flights[i].flightID == id) {
      return data.destinations[i].name;
    }
  }
}

function deleteExistingRows(){
  var table = document.getElementById("FlightList");
  for (let i = table.rows.length-1; i > 0; i--) {
    table.deleteRow(i);
  }
}
