var questions = [
    {
        question: "In Super Mario Bros, what is Mario's brother's name?",
        choices: ["Sparky", "Larry", "Indiana", "Luigi"],
        answer: 3
    },
    {
        question: "Who is Sonic The Hedgehog's sidekick?",
        choices:["Tails","Smiles","Knuckles","Dr. Robutnik"],
        answer: 0
    }
]

//  Set our number counter to 10.
var number = 10;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

// when click on start, run start function
$("#start").on("click", run);

// the actual run function
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {
    //  Decrease number by one.
    number--;
    //  Show the number in the #show-number tag.
    $("#timer").html("<h2>" + "Time remaining: " + number + "</h2>");
    //  Once number hits zero...
    if (number === 0) {
        //  ...run the stop function.
        stop();
        //  Alert the user that time is up.
        alert("Time Up!");
    }
}

//  The stop function
function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

function displayQuestion() {
    
    for (var i = 0; i < questions.length; i++) {
        $("#questions").append("<div class='row'>" + "<div class='col-md-12'>"  +questions[i].question  + "</div>" + "</div>")
        console.log(questions[i].question)
    }
}

displayQuestion()