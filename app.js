// variables
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAovbOqhIQBrPxiHRtZik64XKLtG5SY1Ms",
    authDomain: "train-scheduler-1afb8.firebaseapp.com",
    databaseURL: "https://train-scheduler-1afb8.firebaseio.com",
    projectId: "train-scheduler-1afb8",
    storageBucket: "",
    messagingSenderId: "46184926493"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })

    database.ref().push();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    var row = $("<tr>");

    var firstConversion = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstConversion);
    console.log(firstTrainTime);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime, "HH:mm").format("hh:mm"));

    var diffTime = moment().diff(moment(firstConversion), "minutes");
    console.log("Difference in time: " + diffTime);

    var remainder = diffTime % frequency;
    console.log(remainder);

  

    var minutesAway = frequency - remainder;
    console.log("minutes till train: " + minutesAway);

    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("arrival time: " + moment(nextArrival).format("hh:mm"));

    $(row).append("<td>" + trainName + "</td>");
    $(row).append("<td>" + destination + "</td>");
    $(row).append("<td>" + frequency + "</td>");
    $(row).append("<td>" + (moment(nextArrival).format("h:mm A") + "</td>"));
    $(row).append("<td>" + minutesAway + "</td>");

    $("tbody").append(row);

})


// Functions





// Methods/Logic