const player = require('node-wav-player');

//This function will control the flow of sounds to be played
function audioController(){
    playDrumLoop('med');
}

//This function will take the file path for the sound as a parameter
//it will play the sound, nothing is returned.
async function playSound(audioFilePath){
    var audio = new Audio(audioFilePath);
    audio.play();
}

//This function will take the speed of dance moves as a parameter (either 'slow', 'med', or 'fast')
//and will play the drumloop in the background based on speed
function playDrumLoop(speedOfDance){
    var drums;
    var randInt;
    switch(speedOfDance) {
        case 'slow':
            drums = './sounds/drum-loops/slow-paced-drumloop.wav';
            break;
        case 'med':
            randInt = Math.floor(Math.random() * (4 - 1) + 1);
            console.log(randInt);
            switch(randInt){
                case 1:
                    console.log('1!')
                    drums = './sounds/drum-loops/medium-paced-scifi-drumloop.mp3';
                    break;
                case 2:
                    console.log('2!')
                    drums = './sounds/drum-loops/medium-paced-drumloop.mp3';
                    break;
                case 3:
                    console.log('3!')
                    drums = './sounds/drum-loops/med-fast-paced-drumloop.mp3';
                    break;
            }
            break;
        case 'fast':
            drums = './sounds/drum-loops/fast-paced-drumloop.wav';
            break;
    }
    
    player.play({
        path: './sounds/drum-loops/fast-paced-drumloop.wav',
    }).then(() => {
        console.log('wav pley');
    }).catch((error) => {
        console.log(error);
    });
}

audioController();