$(document).ready(function {

    var questions = [
        {
            question: "To what team does Rin Nohara belong to?",
            choices: ["Team Tobirama", "Team Guy", "Team Hiruzen", "Team Kurenai","Team Minato"],
            answer: 4,    
        },
        {
            question: "From whom did Kakashi Sensei obtain his Sharingan?",
            choices: ["Sasuke", "Itachi", "Madara","Obito","Shisui"],
            answer: 3,
        },
        {
            question: "Is it possible for the Rinnegan to see through smoke?",
            choices: ["True", "False"],
            answer: 1,
        },
        {
            question: "From whom did the Rasengan originate from?",
            choices: ["Jiraiya","Minato","Hiruzen","Naruto","Orochimaru"],
            answer: 1,
        },
        {
            question: "Who is the only one known to have been capable of taming the Nine Tailed Fox?",
            choices: ["Hiruzen","Minato","Madara","Orochimaru","Kisame"],
            answer: 2,
        },
        {
            question: "When Guy releases the Eight Gates, the aura surrounding him his chakra",
            choices: ["True","False"],
            answer: 1,
        },
        {
            question: "Where did Naruto go in order to train to learn Sage Mode?",
            choices: ["Mount Myoboku","Ryuchi Cave","Konohagakure", "Amegakure","Otogakure"],
            answer: 0,
        },
        {
            question: "Who is the second hokage?",
            choices: ["Hiruzen","Tsunade","Minato","Tobirama","Hashirama"],
            answer: 3,
        },
        {
            question: "Naruto was allowed to use Rasenshuriken before he acquired Sage Mode",
            choices: ["True", "False"],
            answer: 1,
        },
        {
            question: "What was Minato most famous for?",
            choices: ["Fire Style Ninjutsu","Earth Style Ninjutsu","Lightening Style Ninjutsu","Crystal Style Ninjutsu", "Space-time Style Ninjutsu"],
            answer: 4,
        }],
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswered = 0;
    var timer = 20;
    var intervalId;
    var running = false;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    var userGuess = "";
    var questCount = questions.length;
    
    $("#reset").hide();
    
    $("#start").on("click", function(){
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    
    function runTimer(){
        if(!running){
        intervalId = setInterval(decrement, 1000);
        running = true;
        }
    }
    
    function decrement() {
        $("#timeLeft").html("<h2>Time Remaining: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unanswered++;
            stop();
            $("#answers").html("Time's up! The correct answer is: " + pick.questions[pick.answer] + "</p>");
        }
    }
    
    function stop(){
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion(){
        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choices.length; i++){
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choices[i]);
                userChoice.attr("data-guessedVal", i);
                $("#answerblock").append(userChoice);
            }
    }
    
    $(".answerchoose").on("click", function(){
        userGuess = parseInt($(this).attr("data-guessedVal"));
    
        if (userGuess === pick.answer){
            stop();
            correctCount++;
            userGuess = "";
            $("#answerblock").html("<p>Yeah! You got it right.</p>");
        } else {
            stop();
            wrongCount++;
            userGuess = "";
            $("#answerblock").html("<p>Sorry! That's not right. The correct answer was: " + pick.choices[pick.answer] + "</p>");
        }
    })
    
    function showStats(){
        if ((wrongCount + correctCount + unanswerCount) === questCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h2>Game over! Here are your stats for the game: </h2>");
            $("#questionblock").append("<h3>Correct: " + correctCount + "</h3>");
            $("#questionblock").append("<h3>Incorrect: " + wrongCount + "</h3>");
            $("#questionblock").append("<h3>Unanswered: " + unansweredCount + "</h3>");
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
            runTimer();
            displayQuestion();
        };
    }
    
    $("#reset").on("click", function(){
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++){
            questions.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
    
    