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
//REST api create users
const uploadUser = (uploadings) => {
  $.ajax({
    url: "/api/users",
    data: JSON.stringify(uploadings),
    contentType: "application/json",
    type: "POST",
    success: function () {
      window.location.href = "../../api/users";
    },
  });
};
const newUser = () => {
  let code = $("#rCode").val();
  let first_name = $("#rFirst_name").val();
  let email = $("#rEmail").val();
  let password = $("#rPassword").val();
  let password2 = $("#rPassword2").val();
  let brand = $("#brands_choices").val();
  let model = $("#models_choices").val();
  let year = $("#years_choices").val();
  let series = $("#serieses_choices").val();
  let engine = $("#engines_choices").val();
  let rUser = {
    code,
    first_name,
    email,
    password,
    password2,
    brand,
    model,
    year,
    series,
    engine,
  };
  console.log(rUser);
  uploadUser(rUser);
};
//

let showTrip = () =>{

};

const requestUploading = () => {
  console.log('run');
  $.get("/api/data", (drivingData) => {
    let x = [];
    let tripdata = [];
    console.log('run2');
    for (let i = 0; i < drivingData.length; i++) {
      if (i >= 1) {
        let newestData = drivingData[i];
        let lastData = drivingData[i - 1];
        if (newestData.timestamp - lastData.timestamp >= 10000) {
          // let trip = [lastData.from, lastData.timestamp, lastData.to, lastData.time, lastData.fuel, lastData.distance, lastData.url];
          // updateData(trip);
          x.push(i);
        }
      }
    }
    console.log('success');
    for (let i = 0; i < x.length + 1; i++) {
      if (i < x.length) {
        if (i = 0) {
          tripdata.push(drivingData.slice(0, x[i]));
        }
        else {
          tripdata.push(drivingData.slice(x[i - 1], x[i]));
        }
      }
      else {
        tripdata.push(drivingData.slice(x[i - 1], drivingData.length - 1));
      }
    }
    console.log(tripdata);
    // updateData(tripdata);

    let tripNumber = tripdata.length;
    for(i = 1; i < tripNumber + 1; i++){

      let item= 
      '<div class="col s4 m3 l2">' +
      '<button onclick="showTrip('+(i-1)+')" class="btn waves-effect waves-light col s12">trip'+i+'</button>'+
      '</div>'
      $('#listSubmissions').append(item)

    }
      showTrip = (index) => {
      let trip = tripdata[index];
      $("#from").text(trip[trip.length-1].from);
      $("#to").text(trip[trip.length-1].to);
      $("#mapurl").attr("src",trip[trip.length-1].url);
      $("#time").text(trip[trip.length-1].time);
      $("#fuel").text(trip.fuel);
      $("#distance").text(trip[trip.length-1].distance);
    }

  })
};


const repeatRequest = () => {
  setInterval(function () {
    requestUploading();
    //this code runs every second
  }, 500);
};
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
  // HealthCheck with specified OBD2 series code
  // setTimeout(() => {
  requestUploading();
  // }, 2000);
  // repeatRequest();
});
