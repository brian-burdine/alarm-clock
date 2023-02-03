// Find the time at start of script
const startTime = new Date();

// Set an alarm (initially a variable, hopefully later from user input)
const alarmTime = getAlarmTime(startTime);

/* 
    Display the current time every second; also checks to see if the alarm time
    has been reached and displays an alert if so
*/
displayTime();
setInterval(displayTime, 1000);

function getAlarmTime(baseTime) {
    // for testing purposes, I'll set the alarm a few seconds after the page loads
    const newAlarm = {
        hours: baseTime.getHours(),
        minutes: baseTime.getMinutes(),
        seconds: baseTime.getSeconds() + Math.floor(Math.random() * 10) + 5
    };
    return newAlarm;
}

function displayTime () {
    // get the time and a reference to the elements to display it to
    let currentTime = new Date();
    // elements to display the time
    const displayHours = document.querySelector(".hours");
    const displayMinutes = document.querySelector(".minutes");
    const displaySeconds = document.querySelector(".seconds");
    const displayAMPM = document.getElementById("am-pm");
    // element to display the date
    const displayDate = document.querySelector(".date");
    
    // Arrays to convert Date indices to English representations
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    // select the proper superscript for the date (like 1st, or 23rd) and
    //   include html tag
    let superscript;
    if ( ( (currentTime.getDate() === 1) || (currentTime.getDate() === 21) ) || 
        (currentTime.getDate() === 31) ) {
        superscript = "<sup>st</sup>";
    } else if ( (currentTime.getDate() === 2) || 
        (currentTime.getDate() === 22) ) {
        superscript = "<sup>nd</sup>";
    } else if ( (currentTime.getDate() === 3) || 
        (currentTime.getDate() === 23) ) {
        superscript = "<sup>rd</sup>";
    } else {
        superscript = "<sup>th</sup>";
    }

    // Combined date message to write to the date field of the clock
    const displayDateMessage = days[currentTime.getDay()] + ", " + 
        months[currentTime.getMonth()] + " " + currentTime.getDate() + 
        superscript + ", " + currentTime.getFullYear();
    
    // Check to see what format to display hours in (12 or 24 hour clock)
    // If 12 hour clock, find whether to display AM or PM and change hours
    //   if necessary
    // Otherwise, leave amPM false to check for display
    let amPM = false;
    if (document.getElementById('12h').checked == true) {
        if (currentTime.getHours() == 0) {
            amPM = "  AM";
            currentTime.setHours(12);
        }
        else if (currentTime.getHours() < 12) {
            amPM = "  AM";
        } 
        else if (currentTime.getHours() == 12) {
            amPM = "  PM";
        } else {
            amPM = "  PM";
            currentTime.setHours(currentTime.getHours() - 12);
        }
    }

    // display the current time, add a 0 to the digit if it's smaller than 10
    if (currentTime.getHours() < 10) {
        displayHours.textContent =  '0' + currentTime.getHours();
    } else {
        displayHours.textContent = currentTime.getHours();
    }
    if (currentTime.getMinutes() < 10) {
        displayMinutes.textContent =  '0' + currentTime.getMinutes();
    } else {
        displayMinutes.textContent = currentTime.getMinutes();
    }
    if (currentTime.getSeconds() < 10) {
        displaySeconds.textContent =  '0' + currentTime.getSeconds();
    } else {
        displaySeconds.textContent = currentTime.getSeconds();
    }
    // add AM or PM to the time if 12 hour time was selected
    if (amPM) {
        displayAMPM.innerText = amPM;
        displayAMPM.style = "visibility: visible;";
    } else {
        displayAMPM.innerText = "";
        displayAMPM.style = "visibility: hidden;";
    }

    // display the current date
    displayDate.innerHTML = displayDateMessage;

    // check if alarm time has been reached
    // I don't know if it's faster to execute if you do one big && check or 
    //   some nested ifs, I'm guessing the ifs, but maybe it would escape if it
    //   saw the first term was false.
    if (currentTime.getSeconds() == alarmTime.seconds) {
        if (currentTime.getMinutes() == alarmTime.minutes) {
            if (currentTime.getHours() == alarmTime.hours) {
                alert("Alarm!");
            }
        }
    }
}


// function displayTime (startTime, alarmTime) {

//     // declare an object to contain the current time
//     let currentTime;
    
//     // if no time has been displayed, display the starting time
//     // otherwise get the current time by incrementing the displayed time
//     //      I'll try making a new date object each run and setting the time to that
//     if (!document.querySelector(".hours").textContent) {
//         currentTime = {
//             hours: startTime.getHours(), 
//             minutes: startTime.getMinutes(), 
//             seconds: startTime.getSeconds()
//         };

//         pushTimeToScreen(currentTime);
//     } else {
//         // newTime = new Date();
//         // currentTime = {
//         //     hours: newTime.getHours(), 
//         //     minutes: newTime.getMinutes(), 
//         //     seconds: newTime.getSeconds()
//         // }; 
//         currentTime = 
//         incrementSecond( parseInt(document.querySelector('.hours').textContent), 
//         parseInt(document.querySelector('.minutes').textContent), 
//         parseInt(document.querySelector('seconds').textContent) );

//         pushTimeToScreen(currentTime);
//     }

//     // check to see if alarm time has been reached
//     // I don't know if it's faster to execute if you do one big && check or 
//     //   some nested ifs, I'm guessing the ifs, but maybe it would escape if it
//     //   saw the first term was false.
//     if (currentTime.seconds == alarmTime.seconds) {
//         if (currentTime.minutes == alarmTime.minutes) {
//             if (currentTime.hours == alarmTime.hours) {
//                 alert("Alarm!");
//             }
//         }
//     }
    
// }

// function pushTimeToScreen (currentTime) {
//     const displayHours = document.querySelector(".hours");
//     const displayMinutes = document.querySelector(".minutes");
//     const displaySeconds = document.querySelector(".seconds");

//     displayHours.textContent = currentTime.hours;
//     displayMinutes.textContent = currentTime.minutes;
//     displaySeconds.textContent = currentTime.seconds;
// }

// // When called, increments the time by a second, while checking to see if any 
// //  of the values overflows
// // Returns an object containing the incremented time
// function incrementSecond (hours, minutes, seconds) {
//     // declare a container for the time
//     let checkedTime = {seconds: 0, minutes: 0, hours: 0};

//     // check to see if minutes/hours/days needs to increment
//     // Case 1: no second overflow
//     if (seconds < 59) {
//         checkedTime.seconds = seconds++;
//         checkedTime.minutes = minutes;
//         checkedTime.hours = hours;
//     } 
//     else  {
//         // Case 2: seconds overflow, can increment minutes without overflow
//         if (minutes < 59) {
//             checkedTime.seconds = 0;
//             checkedTime.minutes = minutes++;
//             checkedTime.hours = hours;
//         } else {
//             // Case 3: minutes and seconds overflow, can increment hours 
//             //  without overflow
//             if (hours < 23) {
//                 checkedTime.seconds = 0;
//                 checkedTime.minutes = 0;
//                 checkedTime.hours = hours++;
//             } else 
//             // Case 4: hours, minutes, and seconds overflow, it's midnight, 
//             //  set all to zero
//             {
                
//                 // increment days/months/year here if I get to it
//             }
//         }
//     }
//     return checkedTime;
// }