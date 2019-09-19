$(document).ready(function () {

  //the game start when pressing start btn
  $('.start-btn').click(function () {

      //hide start button and clear the div
      $('.start-btn').hide();
      $('.quiz-section').empty();

      // Generate quiz page with jquery
      // quiz items
      var quiz = {
          set1: {
              question: "What is the name of Marios brother?",
              answer: ['Sparky', 'Larry', 'Luigi', 'Indiana', "ans1"],
              correct: "Luigi"
          },
          set2: {
              question: "What is Sonics sidekick name?",
              answer: ['Smiles', 'Tails', 'Knuckles', 'Robutnik', "ans2"],
              correct: "Tails"
          },
          set3: {
              question: "What is the name of the main protaganist in the franchise Tomb Raider?",
              answer: ['Tara', 'Laura', 'Christie', 'Lara', "ans3"],
              correct: "Lara"
          },
          set4: {
              question: "What was the first expansion for World of Warcraft?",
              answer: ['Wrath of the Lich King','The Burning Crusade','Pandaland','Legion', "ans4"],
              correct: "The Burning Crusade"
          },
          set5: {
              question: "What is the name of the evil corporation in Resident Evil?",
              answer: ['Labcorp','Aperture Labs','Shinra Electric Power Co.','Umbrella Corp', "ans5"],
              correct: "Umbrella Corp"
          },
          set6: {
              question: "What is the best Halo game?",
              answer: ['Halo: Combat Evolved', 'Halo 2', 'Halo 4', 'Halo 5', "ans6"],
              correct: "Halo 2"
          },
          set7: {
              question: "Which seventh generation handheld gaming console was released in North America on March 24, 2005?",
              answer: ['PSP', 'Switch', 'DSi','Ngage', "ans7"],
              correct: "PSP"
          }

      };

      //timer text
      $('.quiz-section').append('<div class="timer"><h2>You have <span class="time-Text">60</span> second to answer!</h2></div>');

      
      //Timer
      var isTimerOn = false;
      var timeCountDown = 60; // 1mins
      if (isTimerOn == false) {
          var timer = setInterval(function () {
              timeCountDown--;
              $('.time-Text').text(timeCountDown);
              if (timeCountDown <= 0) {
                  getResult(); //time out, get result
              }
          }, 1000);
          isTimerOn = true;
      }


      //quiz layout
      // ansArray to take argument from sub-sets            
      var ansArray = [];
      for (var set in quiz) {
          //Correct Ans array for comparison
          ansArray.push(quiz[set].correct);
          //Display question
          $(".quiz-section").append('<br><p>' + quiz[set].question + '</p><br>');
          for (var i = 0; i < 4; i++) { // first 4 (0,1,2,3) arguments are answers
              var addInput = $("<input>");
              addInput.addClass("radioChoice");
              addInput.attr("type", 'radio');
              addInput.attr("name", quiz[set].answer[4]);
              addInput.attr("value", quiz[set].answer[i]);
              addInput.text(quiz[set].answer[i]);
              //Display choices
              $(".quiz-section").append(addInput);
              $(".quiz-section").append('<p style="display:inline">' + quiz[set].answer[i] + '</p><br>');
          }
      };

      //generate submit button
      var addSubmitBtn = $("<button>");
      addSubmitBtn.addClass("button btn-success btn-lg submit-btn");
      addSubmitBtn.text('Submit');
      $(".quiz-section").append('<br>');
      $(".quiz-section").append(addSubmitBtn);

      //generate an array to store user's choice
      var userArray = [];

      //submit button
      $('.submit-btn').click(function () {
          getResult();
      });

      //score calculation
      var correctCount;
      var skippedCount;
      var wrongCount;
      //time up and submit will trigger this function
      function getResult() {
          correctCount = 0;
          var getCheckedInput = $('Input:checked');
          $('Input:checked').each(function () {
              userArray.push($(this).val());
          });
          // Compare userArray and ansArray using indexOf
          for (var i = 0; i < userArray.length; i++) {
              if (ansArray.indexOf(userArray[i]) > -1) {
                  correctCount++;
              }
          }
          skippedCount = ansArray.length - userArray.length;
          wrongCount = ansArray.length - correctCount - skippedCount;

          // result page looks like
          $('.quiz-section').empty();
          $('.quiz-section').append("<p> Correct:" + correctCount + "</p>");
          $('.quiz-section').append("<p> Wrong:" + wrongCount + "</p>");
          $('.quiz-section').append("<p> Skipped:" + skippedCount + "</p>");
          $('.quiz-section').append("<p> Try Again!</p>");
          $('.start-btn').show();
          isTimerOn == false;
          clearInterval(timer);
      }
  });
})