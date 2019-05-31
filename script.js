//Door Images
let closedDoorPath="img/closed_door.svg";
let botDoorPath="img/robot.svg";
let beachDoorPath="img/beach.svg";
let spaceDoorPath="img/space.svg";

//Stores the html id of the doors and start button
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let startButton = document.getElementById('start');

//Sets the number of doors, creates variables for which doors are open and places the images behind the doors
let numClosedDoors= 3;
let openDoor1=false;
let openDoor2=false;
let openDoor3=false;
let imgDoor1;
let imgDoor2;
let imgDoor3;
let doors = ['bot','beach','space'];

//sets if the game is currently being played, the current streak and the best streak
let currentlyPlaying=true;
let currentStreak=0;
let bestStreak=0;

//Functionality for when someone clicks on a door or the start button
doorImage1.onclick=() =>{
    if(!openDoor1 && currentlyPlaying){
        doorImage1.src=imgDoor1;
        playDoor(0);
        openDoor1=true;
    }
}
doorImage2.onclick=() =>{
    if(!openDoor2 && currentlyPlaying){
        doorImage2.src=imgDoor2;
        playDoor(1);
        openDoor2=true;
    }
}
doorImage3.onclick=() =>{
    if(!openDoor3 && currentlyPlaying){
        doorImage3.src=imgDoor3;
        playDoor(2);
        openDoor3=true;
    }
}
startButton.onclick=() =>{
    startRound();
}

//Randomly place the 3 possible door contents
function randomChoreDoorGenerator(){
    doors = ['bot','beach','space'];
    //Randomizes the location inside the array
    for (let i=0;i<doors.length;i++){
        y=Math.floor(Math.random()*doors.length);
        x=Math.floor(Math.random()*doors.length);
        temp = doors[x];
        doors[x]=doors[y]
        doors[y]=temp;
    }

    //Checks the first index and places the correct image
    switch(doors[0]){
        case 'bot':
            imgDoor1=botDoorPath;
            break;
        case 'beach':
            imgDoor1=beachDoorPath;
            break;
        case 'space':
            imgDoor1=spaceDoorPath;
            break;
        default:
            imgDoor1=botDoorPath;
    }
    //Checks the second index and places the correct image
    switch(doors[1]){
        case 'bot':
            imgDoor2=botDoorPath;
            break;
        case 'beach':
            imgDoor2=beachDoorPath;
            break;
        case 'space':
            imgDoor2=spaceDoorPath;
            break;
        default:
            imgDoor2=beachDoorPath;
    }
    //Checks the third index and places the correct index
    switch(doors[2]){
        case 'bot':
            imgDoor3=botDoorPath;
            break;
        case 'beach':
            imgDoor3=beachDoorPath;
            break;
        case 'space':
            imgDoor3=spaceDoorPath;
            break;
        default:
            imgDoor3=spaceDoorPath;
    }
    
}

//Checks to see if the door has the bot behind it and ends the game in failure
function isBot(num){
    if(doors[num]==='bot'){
        return true;
    } else {
        return false;
    }
}

//Adjusts the number of remaining closed doors, and if all doors have been opened, ends the game
function playDoor(num) {
    numClosedDoors -= 1;
    if (numClosedDoors===0){
        gameOver('win');
    } else if(isBot(num)){
        gameOver();
    }
}

//Ends the game in a win or a loss
function gameOver(status){
    if(status==='win'){
        startButton.innerHTML='You win! Play again?';
        currentStreak += 1;
        if(currentStreak>bestStreak){
            bestStreak=currentStreak;
        }
        document.getElementById('current-streak').innerHTML=currentStreak;
        document.getElementById('best-streak').innerHTML=bestStreak;
    } else {
        startButton.innerHTML='Game over! Play again?';
        currentStreak=0;
        document.getElementById('current-streak').innerHTML=currentStreak;
    }
    currentlyPlaying=false;
}

//starts the game
function startRound(){
    doorImage1.src=closedDoorPath;
    doorImage2.src=closedDoorPath;
    doorImage3.src=closedDoorPath;
    openDoor1=false;
    openDoor2=false;
    openDoor3=false;
    numClosedDoors=3;
    startButton.innerHTML='Good luck!';
    currentlyPlaying=true;
    randomChoreDoorGenerator();
}

startRound();