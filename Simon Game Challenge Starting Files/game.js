// Varibales/arrays

var levelTitle = "Level ";

var levelNum = 0;


var wrongTitle = "Incorrect, press any button to restart"


function titleChange(){
    var finalTitle = levelTitle + levelNum;
    $("#level-title").text(finalTitle);
}

var patternArray = []

var userArray = []

var colourArray = ["green", "blue", "red", "yellow"]

var buttonsClicked = 0

var finalLevel = 0

var levelArray=[]

var highestLevel = 1




// starting game

$(document).on("keypress", async function(){
    levelNum = 0
    levelNum++;
    titleChange();
    await computerPattern();
})

// computer pattern



async function computerPattern(){
    for (i=0; i<levelNum; i++){
        let randNum = Math.floor(Math.random()*4);
        let chosenColour = colourArray[randNum];
        patternArray.push(chosenColour);
        animate(chosenColour);
        sound(chosenColour);
        await delay(750)
    }
}

function delay(time){
    return new Promise((resolve) => setTimeout(() => resolve(), time))
}


// sound/animate

function animate(buttonColour){
    $("#" + buttonColour).animate({opacity: 0}).animate({opacity: 1})
}

function sound(soundColour){
    var audio = new Audio("sounds/" + soundColour + ".mp3")
    audio.play()
}

// user input

$(".btn").on("click", async function(){
    var colour = $(this).attr('id');
    userArray.push(colour);
    // animate(colour)
    clicked(colour)
    sound(colour)
    if (buttonsClicked < levelNum-1){
        buttonsClicked++
    }else{
        await compare()
        buttonsClicked=0
    }
})

// comparing user pattern to computer pattern

async function compare(){
    if (JSON.stringify(userArray) == JSON.stringify(patternArray)){
        await delay(1000)
        levelNum++;
        userArray=[]
        patternArray=[]
        titleChange()
        await computerPattern()
    } else{
        finalLevel = levelNum 
        if (finalLevel > highestLevel){
            highestLevel = finalLevel
            console.log(highestLevel)
        } 
        // levelArray.push(finalLevel)
        var wrongSound = new Audio("sounds/wrong.mp3")
        restart();
    }
}


function restart(){
    userArray=[];
    patternArray=[];
    var countTitle = "Your highest level is " + highestLevel +", press any button to restart"
    $("#level-title").text(countTitle);
    // winCount();
}

function clicked(btnColour){
    $('#' + btnColour).addClass("pressed")
    setTimeout(function (){
        $('#' + btnColour).removeClass("pressed")
    }, 100)
}





// function winCount(){
//     countTitle = "Your highest level is " + finalLevel +", press any button to restart"
//     if (levelArray.length==1){
//         $("#level-title").text(countTitle);
//         levelNum = 0;
//     } else{
//         var finalIndex = (levelArray.length)-1
//         levelArray.splice(finalIndex)
//         levelArray.sort((a,b) => {
//             return a-b
//         })
//         var finalNumber = (levelArray.length)-1
//         if (finalLevel > levelArray[finalNumber]){
//             $("#level-title").text(countTitle);
//             levelNum = 0;
//         } else{
//             $("#level-title").text("Your highscore is " + levelArray         [finalNumber] + ",press any button to restart")
//             levelNum = 0;
//         }
//     }
// }


// switch(color){
//     case blue:
//         $("#blue").animate({opacity: 0}).animate({opacity: 1})
//         blueSound = new Audio("sounds/blue.mp3")
//         blueSound.play()
//         break;
//     case red:
//         $("#red").animate({opacity: 0}).animate({opacity: 1})
//         redSound = new Audio("sounds/red.mp3")
//         redSound.play()
//         break;
//     case green:
//         $("#green").animate({opacity: 0}).animate({opacity: 1})
//         greenSound = new Audio("sounds/green.mp3")
//         greenSound.play()
//         break;
//     case yellow:
//         $("#yellow").animate({opacity: 0}).animate({opacity: 1})
//         yellowSound = new Audio("sounds/yellow.mp3")
//         yellowSound.play()
//         break;
// }



//         switch(randNum){
//         case 1:
//             $("#green").animate({opacity: 0}).animate({opacity: 1})
//             patternAudio = new Audio("sounds/green.mp3")
//             patternAudio.play()
//             patternArray.push("green")
//             break;
//         case 2:
//             $("#red").animate({opacity: 0}).animate({opacity: 1})
//             patternAudio = new Audio("sounds/red.mp3")
//             patternAudio.play()
//             patternArray.push("red")
//             break;
//         case 3:
//             $("#yellow").animate({opacity: 0}).animate({opacity: 1})
//             patternAudio = new Audio("sounds/yellow.mp3")
//             patternAudio.play()
//             patternArray.push("yellow")
//             break;
//         case 4:
//             $("#blue").animate({opacity: 0}).animate({opacity: 1})
//             patternAudio = new Audio("sounds/blue.mp3")
//             patternAudio.play()
//             patternArray.push("blue")
//             break;
//         }
//     }
// }
