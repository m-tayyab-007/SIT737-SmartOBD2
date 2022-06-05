var dataList, funcList;
let models_Toyota, models_Nissan, years_Hilux, years_Camry, years_Patrol, serieses_2013_Hilux, serieses_2012_Camry, serieses_2013_Camry, serieses_2014_Patrol, engines_GGN15R_GGN15_2013_Hilux, engines_ACV40R_ACV40_2012_Camry, engines_ASV50R_ASV50_2013_Camry, engines_GU_Y61_TESY61_2014_Patrol;
let displayModels, displayYears, displaySerieses, displayEngines, AverageSpeed, AverageBrake, AverageFuel, AverageTemp;

async function getReady() {
  // GET requests to IBM Cloud Function
  // GET render variables 
  $.ajax({
    url: "https://81a29b2d.us-south.apigw.appdomain.cloud/smartobd-test/getBrand",
    contentType: "application/json",
    type: "GET",
    success: function (res) {
      dataList = res.brand;

      // GET render component functions
      $.ajax({
        url: "https://81a29b2d.us-south.apigw.appdomain.cloud/smartobd-test/getFunctions",
        contentType: "application/json",
        type: "GET",
        success: function (res) {
          funcList = res.functions;
          models_Toyota = new Function(funcList.models_Toyota);
          models_Nissan = new Function(funcList.models_Nissan);
          years_Hilux = new Function(funcList.years_Hilux);
          years_Camry = new Function(funcList.years_Camry);
          years_Patrol = new Function(funcList.years_Patrol);
          serieses_2013_Hilux = new Function(funcList.serieses_2013_Hilux);
          serieses_2012_Camry = new Function(funcList.serieses_2012_Camry);
          serieses_2013_Camry = new Function(funcList.serieses_2013_Camry);
          serieses_2014_Patrol = new Function(funcList.serieses_2014_Patrol);
          engines_GGN15R_GGN15_2013_Hilux = new Function(funcList.engines_GGN15R_GGN15_2013_Hilux);
          engines_ACV40R_ACV40_2012_Camry = new Function(funcList.engines_ACV40R_ACV40_2012_Camry);
          engines_ASV50R_ASV50_2013_Camry = new Function(funcList.engines_ASV50R_ASV50_2013_Camry);
          engines_GU_Y61_TESY61_2014_Patrol = new Function(funcList.engines_GU_Y61_TESY61_2014_Patrol);

          // GET render component arrangement functions
          $.ajax({
            url: "https://81a29b2d.us-south.apigw.appdomain.cloud/smartobd-test/getDisplayFunctions",
            contentType: "application/json",
            type: "GET",
            success: function (res) {
              console.log(res);
              displayModels = new Function(res.functions.displayModels);
              displayYears = new Function(res.functions.displayYears);
              displaySerieses = new Function(res.functions.displaySerieses);
              displayEngines = new Function(res.functions.displayEngines);
              AverageSpeed = new Function('array', res.functions.AverageSpeed);
              AverageBrake = new Function('array', res.functions.AverageBrake);
              AverageFuel = new Function('array', res.functions.AverageFuel);
              AverageTemp = new Function('array', res.functions.AverageTemp);
            },
          });
        },
      });
    },
  });
}



// import socket
let socket = io();
// function for trip button
let showTrip = () => {};
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
          if (newestData.timestamp - lastData.timestamp >= 10000) {
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

$(document).ready(
  getReady().then(function () {
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

    // Record the history trip once user logged in
    requestTrip();

    repeatAlarm();
  })
);

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
