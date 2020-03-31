const timerApp = {
  seconds: "",
  intervalTimer: "",
  breakTimer: "",
  rounds: "",
  exercise: "",
  clockTimer: "",
  tempExercise: 1,
  tempRound: 1,
  rest: false,
  isPaused: false,
  totalSeconds: "",
  totalMinutes: ""
};

timerApp.init = function() {
  //   Form input submit when form submits timer starts
  $("form").on("submit", function(e) {
    e.preventDefault();
    timerApp.intervalTimer = parseInt($(".setIntervals").val());
    timerApp.breakTimer = parseInt($(".setRest").val());
    timerApp.rounds = parseInt($(".numRounds").val());
    timerApp.exercise = parseInt($(".numExercise").val());
    timerApp.seconds = timerApp.intervalTimer;
    $(".modal").css("display", "none");
    reset();
    // console.log(timerApp);
  });
  //   take the modal out when x is clicked
  $(".close").on("click", function() {
    $(".modal").css("display", "none");
  });
  $(".updateSetUp").on("click", function() {
    $(".modal").css("display", "flex");
  });

  //   when start is clicked start the timer
  $(".start").on("click", function() {
    timerApp.isPaused = !timerApp.isPaused;
    if (!timerApp.isPaused) {
      $(".start").text("Start");
      changeToPause();
      clearInterval(timerApp.clockTimer);
      console.log(timerApp.isPaused);
    } else {
      $(".start").text("Pause");
      if (timerApp.rest) {
        changeToBreak();
      } else {
        changeToGo();
      }
      timerApp.clockTimer = setInterval(countDownTimer, 1000);
    }
  });
  //   this calls reset function when reset is clicked
  $(".reset").on("click", function() {
    reset();
  });
  //  Function needed for the SetInterval do decrement seconds
  const countDownTimer = function() {
    $(".timer").text(`${timerApp.seconds--}`);
    checkStatusTimer();
  };
  //   check if you need to change the timer to IntervalTimer or BreakTimer
  const checkStatusTimer = function() {
    if (timerApp.seconds < 0 && timerApp.rest === false) {
      timerApp.seconds = timerApp.breakTimer;
      timerApp.rest = true;
      changeToBreak();
    } else if (timerApp.seconds < 0 && timerApp.rest === true) {
      timerApp.seconds = timerApp.intervalTimer;
      timerApp.rest = false;
      changeToGo();
      checkRoundAndExercise();
    }
  };
  //   This will handle all the changes in the exercise and rounds
  const checkRoundAndExercise = function() {
    if (
      timerApp.tempRound < timerApp.rounds &&
      timerApp.tempExercise === timerApp.exercise
    ) {
      timerApp.tempRound++;
      $(".round").text(`ROUND ${timerApp.tempRound}`);
      $(".exercise").text(`EXERCISE ${(timerApp.tempExercise = 1)}`);
    } else if (
      timerApp.tempRound <= timerApp.rounds &&
      timerApp.tempExercise < timerApp.exercise
    ) {
      timerApp.tempExercise++;
      $(".exercise").text(`EXERCISE ${timerApp.tempExercise}`);
      //   console.log(timerApp.tempExercise);
    } else if (
      timerApp.tempRound === timerApp.rounds &&
      timerApp.tempExercise === timerApp.exercise
    ) {
      changeToDone();
    }
  };
  //  change the background to Yellow and status to Good Job!
  const changeToDone = function() {
    $("body").css("background", "#e4e650");
    $(".status").text("GOOD JOB!");
    $(".timer").text(`DONE!`);
    clearInterval(timerApp.clockTimer);
  };
  //   change the background to orange and status to Ready?
  const changeToReady = function() {
    $(".status").text("READY?");
    $("body").css("background", "#f0cb29");
  };
  //  change the backround to blue and status to Rest
  const changeToBreak = function() {
    $(".status").text("REST");
    $("body").css("background", "#38dbd3");
  };
  //  change the Background and statu to Green and Let's Go
  const changeToGo = function() {
    $(".status").text("LET'S GO!");
    $("body").css("background", "#50e696");
  };
  //   change the Background and status to Gray and PAUSED
  const changeToPause = function() {
    $(".status").text("PAUSED");
    $("body").css("background", "#b5b8b5");
  };
  //   create Reset Fuction that restart all the timer
  const reset = function() {
    clearInterval(timerApp.clockTimer);
    timerApp.seconds = timerApp.intervalTimer;
    timerApp.tempRound = 1;
    timerApp.tempExercise = 1;
    timerApp.isPaused = false;
    $(".round").text(`ROUND ${timerApp.tempRound}`);
    $(".exercise").text(`EXERCISE ${timerApp.tempExercise}`);
    $(".timer").text(`${timerApp.seconds}`);
    $(".start").text("Start");
    $(".totalMinutes").text(
      timerApp.totalTime(
        timerApp.intervalTimer,
        timerApp.breakTimer,
        timerApp.exercise,
        timerApp.rounds
      )
    );
    changeToReady();
  };
};
// calculate the total time of the exercise
timerApp.totalTime = function(intervalTimer, breakTimer, exercise, round) {
  let exerciseTime = intervalTimer + breakTimer;
  let numOfExerciseTime = exerciseTime * exercise;
  let totalTrainingTime = numOfExerciseTime * round;
  let minutes = Math.floor(totalTrainingTime / 60);
  let seconds = totalTrainingTime - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
    timerApp.totalSeconds = seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
    timerApp.totalMinutes = minutes;
  }

  return `${minutes} : ${seconds}`;
};

$(document).ready(timerApp.init());

// OLD CODE BEFORE TALKING TO JOEY
//   $("form").on("submit", function(e) {
//     isUpdated = true;
//     e.preventDefault();
//     interval = parseInt($(".setIntervals").val());
//     rest = parseInt($(".setRest").val());
//     numRound = parseInt($(".numRounds").val());
//     numExercise = parseInt($(".numExercise").val());
//     timer = interval;
//     $(".timer").text(`${timer}`);
//     $(".modal").css("display", "none");
//     $(".totalMinutes").text(
//       timerApp.totalTime(interval, rest, numExercise, numRound)
//     );
//     $(".round").text(`ROUND ${tempRound}`);
//     $(".exercise").text(`EXERCISE ${tempExercise}`);
//     console.log(timer);
//     countDownInterval(timer);
//   });
//   // close the modal
//   $(".close").on("click", function() {
//     $(".modal").css("display", "none");
//   });
//   //update button
//   $(".updateSetUp").on("click", function() {
//     $(".modal").css("display", "flex");
//   });
//   // reset button
//   $(".reset").on("click", function() {
//     isReset = true;
//     if (isReset) {
//       timer = interval;
//       tempExercise = 1;
//       tempRound = 1;
//       $(".round").text(`ROUND ${tempRound}`);
//       $(".exercise").text(`EXERCISE ${tempExercise}`);
//       $(".timer").text(`${timer}`);
//       countDownInterval(timer);
//       console.log("reset timer", timer);
//       //   console.log("interval", interval);
//       //   console.log("countDown:", countDownInterval);
//     }
//   });
//   // start button
//   $(".start").on("click", function() {
//     isPaused = !isPaused;
//     if (!isPaused) {
//       $(".start").text("Pause");
//     } else {
//       $(".start").text("Start");
//     }
//     timer = interval;
//     console.log("startTimer!");
//     // countDownInterval(timer);
//   });

//   let clockInterval = setInterval(function() {
//     count = interval;
//     if (count < 0 && tempRound < numRound && tempExercise === numExercise) {
//       clearInterval(clockInterval);
//     }
//   }, 1000);

//   const reset = function() {};

//   //  countdown for interval
//   const countDownInterval = function(count) {
//     if (count === interval) {
//       $(".status").text("LET'S GO!");
//       $("body").css("background", "#50e696");
//       console.log("intervalafterdone");
//       let clockInterval = setInterval(function() {
//         if (isReset) {
//           console.log("isReset");
//           clearInterval(clockInterval);
//           isReset = false;
//         }
//         if (!isPaused) {
//           $(".timer").text(`${count--}`);
//           if (count < 0) {
//             clearInterval(clockInterval);
//             count = rest;
//             countDownRest(count);
//           }
//         }
//         // if (isUpdated) {
//         //   clearInterval(clockInterval);
//         //   isUpdated = false;
//         // }
//         // Check timerApp!!!!!
//       }, 1000);
//     }
//   };
//   //   count down for the rest timer
//   const countDownRest = function(count) {
//     if (count === rest) {
//       $(".status").text("REST");
//       $("body").css("background", "#38dbd3");

//       let clockRest = setInterval(function() {
//         //   if isPaused is false do the following
//         if (!isPaused) {
//           $(".timer").text(`${count--}`);
//           //   If Statement to check Rounds and Exercise
//           if (isReset) {
//             clearInterval(clockRest);
//             isReset = false;
//           }
//           if (
//             count < 0 &&
//             tempRound < numRound &&
//             tempExercise === numExercise
//           ) {
//             console.log("hello 1");
//             tempExercise = 1;
//             tempRound++;
//             $(".round").text(`ROUND ${tempRound}`);
//             $(".exercise").text(`EXERCISE ${tempExercise}`);
//             count = interval;
//             clearInterval(clockRest);
//             countDownInterval(count);
//           } else if (
//             count < 0 &&
//             tempRound <= numRound &&
//             tempExercise < numExercise
//           ) {
//             console.log("hello 2");
//             tempExercise++;
//             $(".exercise").text(`EXERCISE ${tempExercise}`);
//             count = interval;
//             clearInterval(clockRest);
//             countDownInterval(count);
//           } else if (
//             count < 0 &&
//             tempRound === numRound &&
//             tempExercise === numExercise
//           ) {
//             console.log("hello 3");
//             clearInterval(clockRest);
//             $(".status").text("GOOD JOB!");
//             $("body").css("background", "#e4e650");
//             $(".timer").text(`DONE!`);
//             count = interval;
//           }
//           //   if (isUpdated) {
//           //     clearInterval(clockRest);
//           //     isUpdated = false;
//           //   }
//         }
//       }, 1000);
//     }
//   };
