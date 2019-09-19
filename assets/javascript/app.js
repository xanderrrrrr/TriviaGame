$(document).ready(function(){
  
   
    $("#timeLeft").hide();
    $("#begin").on('click', trivia.beginGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
 
    questions: {
      q1: 'What is the name of marios brother?',
      q2: 'Off what country are the islands of Islay, Mull, and St. Kilda located?',
      q3: 'Which U.S. president appears on the front of the $2 bill?',
      q4: 'Which U.S. state has the longest coastline?',
      q5: 'BB-8 is an astromech droid from what film?',
      q6: 'In the movie "The Wizard of Oz", what did the Scarecrow want from the wizard?',
      q7: 'What is the first element on the periodic table?'
    },
    options: {
      q1: ['Atlanta', 'New Delhi', 'Mumbai', 'Singapore'],
      q2: ['Scotland', 'Ireland', 'Iceland', 'France'],
      q3: ['Thomas Jefferson', 'George Bush', 'Barack Obama', 'Donald Trump'],
      q4: ['Alaska', 'California', 'New York', 'Texas'],
      q5: ['When Harry Met Sally','Harry Potter & The Deathly Hallows','Star Wars','Terminator'],
      q6: ['Brains','Books','Beer','Birds'],
      q7: ['Oxygen', 'Hydrogen', 'Nitrogen','Carbon']
    },
    answers: {
      q1: 'New Delhi',
      q2: 'Scotland',
      q3: 'Thomas Jefferson',
      q4: 'Alaska',
      q5: 'Star Wars',
      q6: 'Brains',
      q7: 'Hydrogen'
    },
    
    beginGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      

      $('#answers').html('');
      
      
      $('#timer').text(trivia.timer);
      
      
      $('#begin').hide();
  
      $('#timeLeft').show();
      
      
      trivia.nextQuestion();
      
    },
     
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
     
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
     
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#answers')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        
        $('#game').hide();
        
       
        $('#begin').show();
      }
      
    },
    
    guessChecker : function() {
      
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      

      if($(this).text() === currentAnswer){
       
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>Correct Answer!</h3>');
      }
      
      else{
       
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
   
    guessResult : function(){
      
   
      trivia.currentSet++;
      
    
      $('.option').remove();
      $('#answers h3').remove();
      
     
      trivia.nextQuestion();
       
    }
  
  }