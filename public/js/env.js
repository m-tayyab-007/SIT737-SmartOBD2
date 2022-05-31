var Hilux = '<option value="Hilux">Hilux</option>';
var Camry =
  '<option value="" disabled selected>Choose model</option> <option value="Camry">Camry</option>';
var Patrol =
  '<option value="" disabled selected>Choose model</option> <option value="Patrol">Patrol</option>';
var Years_Hilux =
  '<option value="" disabled selected>Choose year</option> <option value="2013">2013</option>';
var Years_Camry =
  '<option value="" disabled selected>Choose year</option> <option value="2012">2012</option> <option value="2013">2013</option>';
var Years_Patrol =
  '<option value="" disabled selected>Choose year</option> <option value="2014">2014</option>';
var Serieses_2013_Hilux =
  '<option value="" disabled selected>Choose series</option> <option value="GGN15R-GGN15">GGN15R-GGN15</option>';
var Serieses_2012_Camry =
  '<option value="" disabled selected>Choose series</option> <option value="ACV40R-ACV40">ACV40R-ACV40</option>';
var Serieses_2013_Camry =
  '<option value="" disabled selected>Choose series</option> <option value="ASV50R-ASV50">ASV50R-ASV50</option>';
var Serieses_2014_Patrol =
  '<option value="" disabled selected>Choose series</option> <option value="GU, Y61-TESY61">GU, Y61-TESY61</option>';
var Engines_ACV40R_ACV40_2012_Camry =
  '<option value="" disabled selected>Choose engine</option> <option value="2362cc, 2AZFE I4 16v DOHC VVT MPFI {117kW}">2362cc, 2AZFE I4 16v DOHC VVT MPFI {117kW}</option>';
var Engines_ASV50R_ASV50_2013_Camry =
  '<option value="" disabled selected>Choose engine</option> <option value="2494cc, 2ARFE I4 16v DOHC VVT MPFI {133kW}">2494cc, 2ARFE I4 16v DOHC VVT MPFI {133kW}</option>';
var Engines_GGN15R_GGN15_2013_Hilux =
  '<option value="" disabled selected>Choose engine</option> <option value="3956cc, 1GRFE V6 24v DOHC MPFI {175kW}">3956cc, 1GRFE V6 24v DOHC MPFI {175kW}</option>';
var Engines_GU_Y61_TESY61_2014_Patrol =
  '<option value="" disabled selected>Choose engine</option> <option value="2953cc, ZD30DDTi I4 16v DOHC I/C Turbo CRD {118kW}">2953cc, ZD30DDTi I4 16v DOHC I/C Turbo CRD {118kW}</option>';

function models_Toyota() {
  $("#models_choices").append(Camry);
  $("#models_choices").append(Hilux);
}

function models_Nissan() {
  $("#models_choices").append(Patrol);
}

function years_Hilux() {
  $("#years_choices").append(Years_Hilux);
}

function years_Camry() {
  $("#years_choices").append(Years_Camry);
}

function years_Patrol() {
  $("#years_choices").append(Years_Patrol);
}

function serieses_2013_Hilux() {
  $("#serieses_choices").append(Serieses_2013_Hilux);
}

function serieses_2012_Camry() {
  $("#serieses_choices").append(Serieses_2012_Camry);
}

function serieses_2013_Camry() {
  $("#serieses_choices").append(Serieses_2013_Camry);
}

function serieses_2014_Patrol() {
  $("#serieses_choices").append(Serieses_2014_Patrol);
}

function engines_GGN15R_GGN15_2013_Hilux() {
  $("#engines_choices").append(Engines_GGN15R_GGN15_2013_Hilux);
}

function engines_ACV40R_ACV40_2012_Camry() {
  $("#engines_choices").append(Engines_ACV40R_ACV40_2012_Camry);
}

function engines_ASV50R_ASV50_2013_Camry() {
  $("#engines_choices").append(Engines_ASV50R_ASV50_2013_Camry);
}

function engines_GU_Y61_TESY61_2014_Patrol() {
  $("#engines_choices").append(Engines_GU_Y61_TESY61_2014_Patrol);
}

function displayModels() {
  $("#models_choices option").remove();
  switch ($("#brands_choices option:selected").text()) {
    case "Toyota":
      models_Toyota();
      displayYears();
      break;
    case "Nissan":
      models_Nissan();
      displayYears();
      break;
  }
  $("#models_choices").prop("disabled", false);
  // Reinitialize materialize select
  $("select").formSelect();
}

function displayYears() {
  $("#years_choices option").remove();

  switch ($("#models_choices option:selected").text()) {
    case "Hilux":
      years_Hilux();
      displaySerieses();
      break;
    case "Camry":
      years_Camry();
      displaySerieses();
      break;
    case "Patrol":
      years_Patrol();
      displaySerieses();
      break;
  }
  $("#years_choices").prop("disabled", false);
  // Reinitialize materialize select
  $("select").formSelect();
}

function displaySerieses() {
  $("#serieses_choices option").remove();
  if ($("#models_choices option:selected").text() == "Hilux") {
    switch ($("#years_choices option:selected").text()) {
      case "2013":
        serieses_2013_Hilux();
        displayEngines();
        break;
    }
  }
  if ($("#models_choices option:selected").text() == "Camry") {
    switch ($("#years_choices option:selected").text()) {
      case "2012":
        serieses_2012_Camry();
        displayEngines();
        break;
      case "2013":
        serieses_2013_Camry();
        displayEngines();
        break;
    }
  }
  if ($("#models_choices option:selected").text() == "Patrol") {
    switch ($("#years_choices option:selected").text()) {
      case "2014":
        serieses_2014_Patrol();
        displayEngines();
        break;
    }
  }
  $("#serieses_choices").prop("disabled", false);
  // Reinitialize materialize select
  $("select").formSelect();
}

function displayEngines() {
  $("#engines_choices option").remove();
  if ($("#years_choices option:selected").text() == "2013") {
    switch ($("#serieses_choices option:selected").text()) {
      case "GGN15R-GGN15":
        engines_GGN15R_GGN15_2013_Hilux();
        break;
      case "ASV50R-ASV50":
        engines_ASV50R_ASV50_2013_Camry();
        break;
    }
  }
  if ($("#years_choices option:selected").text() == "2012") {
    switch ($("#serieses_choices option:selected").text()) {
      case "ACV40R-ACV40":
        engines_ACV40R_ACV40_2012_Camry();
        break;
    }
  }
  if ($("#years_choices option:selected").text() == "2014") {
    switch ($("#serieses_choices option:selected").text()) {
      case "GU, Y61-TESY61":
        engines_GU_Y61_TESY61_2014_Patrol();
        break;
    }
  }
  $("#engines_choices").prop("disabled", false);
  // Reinitialize materialize select
  $("select").formSelect();
}
// import socket
let socket = io();
// function for trip button
let showTrip = () => {};
// function to calculate average data
const AverageSpeed = (array) => {
  let x = 0;
  array.forEach((element) => {
    x += element.speed;
  });
  return Math.round(x / array.length);
};
const AverageBrake = (array) => {
  let x = 0;
  array.forEach((element) => {
    x += element.brake;
  });
  return Math.round(x / array.length);
};
const AverageFuel = (array) => {
  let x = 0;
  array.forEach((element) => {
    x += element.fuel;
  });
  return Math.round(x / array.length);
};
const AverageTemp = (array) => {
  let x = 0;
  array.forEach((element) => {
    x += element.temperature;
  });
  return Math.round(x / array.length);
};
//show alert once listened
socket.on("alert", (data) => {
  console.log(
    "potential accident alarm received on car with plate: " + data.reg
  );
  $("#alarm").html(
    "Beware,beware, beware! <br>In your location :" +
      data.range +
      "<br>Potential accident detected on car with plate: " +
      data.reg
  );
});
//show abnormal data once listened
socket.on("highTem", (temperature) => {
  if (temperature >= 218) {
    $("#damageTemp").html(
      "Potential accident may occur due to a very high engine temperature detected on your car<br> Please pull over on the side and switch off engine ASAP!!!<br> Engine temperature: " +
        tempreature +
        "celsius dagree"
    );
  } else {
    $("#alarmTem").html(
      "High engine tempratrue detected, " + tempreature + "celsius dagree"
    );
  }
});
//show abnormal data once listened
socket.on("highFuel", (fuel) => {
  if (fuel >= 12) {
    $("#damageFuel").html(
      "Potential accident may occur due to a very high comsumption of fuel detected on your car<br> Please pull over on the side and switch off engine ASAP!!!<br> Fuel comsuption: " +
        fuel +
        "L/km3"
    );
  } else {
    $("#alarmFuel").html("High fuel consumption detected, " + fuel + "L/km3");
  }
});
//show abnormal data once listened
socket.on("lowBrake", (brake) => {
  if (brake <= 56) {
    $("#damageBrake").html(
      "Potential accident may occur due to a very bad performance of brake system detected on your car<br> Please pull over on the side and switch off engine ASAP!!!<br> Brake performance: " +
        brake
    );
  } else {
    $("#alarmBrake").html("Bad brake performance detected, " + brake);
  }
});
//remove low risk alert data once listened normal data
socket.on("normalTem", (temperature) => {
  $("#alarmTem").html("");
});
socket.on("normalFuel", (fuel) => {
  $("#alarmFuel").html("");
});
socket.on("normalBrake", (brake) => {
  $("#alarmBrake").html("");
});
// generate trip button once listended trip information
socket.on("trip button", (array) => {
  console.log(array);
  array.forEach((element) => {
    $("#listSubmissions").append(element);
  });
});
// get the number of history data
let numOfHstyData;
const requestTrip = () => {
  $.get("/api/data", (drivingData) => {
    if (drivingData.length == 0) {
      numOfHstyData = 0;
    } else {
      numOfHstyData = drivingData.length;
      console.log(numOfHstyData);
      // Used to store the index of the first element of the next trip
      let x = [];
      // Used to store driving data for different trips.
      let tripdata = [];
      console.log("run2");
      for (let i = 0; i < drivingData.length; i++) {
        if (i >= 1) {
          let newestData = drivingData[i];
          let lastData = drivingData[i - 1];
          if (newestData.timestamp - lastData.timestamp >= 100000) {
            x.push(i);
          }
        }
      }
      console.log("success");
      console.log(x);
      if (x.length === 0) {
        tripdata.push(drivingData);
      } else {
        for (let i = 0; i <= x.length; i++) {
          // code block
          if (i < x.length) {
            if (i === 0) {
              tripdata.push(drivingData.slice(0, x[i]));
            } else {
              tripdata.push(drivingData.slice(x[i - 1], x[i]));
            }
          } else {
            tripdata.push(drivingData.slice(x[i - 1], drivingData.length - 1));
          }
        }
      }
      console.log(tripdata);
      // Used to get the number of trips.
      let tripNumber = tripdata.length;
      console.log(tripNumber);
      let buttonText = [];
      if (tripdata[0]) {
        for (i = 1; i < tripNumber + 1; i++) {
          let item =
            '<div class="col s4 m3 l2">' +
            '<button onclick="showTrip(' +
            (i - 1) +
            ')" class="btn waves-effect waves-light col s12">trip' +
            i +
            "</button>" +
            "</div>";
          buttonText.push(item);
        }
        socket.emit("tripDetected", buttonText);
      }
      // show current trip information
      showTrip = (index) => {
        let trip = tripdata[index];
        $("#from").text(trip[trip.length - 1].from);
        $("#to").text(trip[trip.length - 1].to);
        $("#mapurl").attr("src", trip[trip.length - 1].url);
        $("#time").text(trip[trip.length - 1].time);
        $("#distance").text(trip[trip.length - 1].distance);
        $("#aSpeed").text(AverageSpeed(trip));
        $("#aBrake").text(AverageBrake(trip));
        $("#aFuel").text(AverageFuel(trip));
        $("#aTemp").text(AverageTemp(trip));
      };
    }
  });
};
// If user is driving
const requestAlarm = () => {
  $.get("/api/data", (drivingData) => {
    if (drivingData.length > 0) {
      // compare history data and current data to determine if the user is in driving
      if (drivingData.length > numOfHstyData) {
        var newestData = drivingData[drivingData.length - 1];
        // emit current location of user to set socket room
        socket.emit("range", newestData.range);
        // emit current data detected
        socket.emit("sensorData", newestData);
      }
    }
  });
};
// Send alarm request as long as new data sent by sensor
const repeatAlarm = () => {
  setInterval(function () {
    requestAlarm();
  }, 2000);
};
//Watson intergration

window.watsonAssistantChatOptions = {

  integrationID: "e660dc0e-8ca7-49fb-b479-1bbe5662be99", // The ID of this integration.

  region: "au-syd", // The region your integration is hosted in.

  serviceInstanceID: "8360d8dc-fb14-4906-9734-5f4d46b2a537", // The ID of your service instance.

  onLoad: function(instance) { instance.render(); }

};

setTimeout(function(){

  const t=document.createElement('script');

  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";

  document.head.appendChild(t);

});
$(document).ready(function () {
  console.log("Ready");
  // modal JQuery
  $(".modal").modal();
  //sidenav JQuery
  $(".sidenav").sidenav();
  //parallax JQuery
  $(".parallax").parallax();
  //Materialize progress bar
  $(".tooltipped").tooltip();
  $(".collapsible").collapsible();
  //Materialize select
  $("select").formSelect();
  //Materialize dropdown
  $(".dropdown-trigger").dropdown();
  //Responsive select
  $("#brands_choices").change(function () {
    displayModels();
  });
  $("#models_choices").change(function () {
    displayYears();
  });
  $("#years_choices").change(function () {
    displaySerieses();
  });
  $("#serieses_choices").change(function () {
    displayEngines();
  });

  displayModels();
  // Record the history trip once user logged in
  requestTrip();

  repeatAlarm();
});
