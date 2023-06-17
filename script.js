// x------------RULES------------x 

// There will be two players in this game. At the start of the game Player 1 will be the CurrentPlayer and Player 2 will be the in-active one.

// Roll the dice: The current player has to roll the dice and then a random number will be generated. If current player gets any number other than 1 on the dice then that number will be added to the current score (initially the current score will be 0) and then the new score will be displayed under Current Score section.  Note: If the current player gets 1 on the dice then the players will be switched i.e. the current player will become in-active and vice-versa.
// Hold: If the current player clicks on HOLD, then the Current Score will be added to the Total Score. When the active player clicks the Hold button then the total score is evaluated. If the Total Score >= 100 then the current player wins else the players are switched.
// Reset: All the scores are set to 0 and Player 1 is set as the starting player (current player).

(function(){
    "use strict";

    //Rule Box Animation---

    $('.fadeoutbox').click(function(){
        $('#box').fadeOut('normal');
    
    });
    $('.fadeinbox').click(function(){
        $('#box').fadeIn('2000','swing');
    });
    
    $('.acRuleBox').hide();
    
    $('.ruleBoxIcon').click(function(){
        $('.ruleBoxIcon').hide('normal');
        $('.acRuleBox').show('swing');
        $('.crossBtn').click(function(){
            $('.acRuleBox').hide('swing');
            $('.ruleBoxIcon').show('normal');
        })
    });

    // x-------------------------------x 

    let startPlayer=1;
    const dices=["1die.jpg","2die.jpg","3die.jpg","4die.jpg","5die.jpg","6die.jpg"];
    let Dice1User1,Dice2User1;
    let Dice1User2,Dice2User2;

    const cScoreUser1=document.querySelector('.container .box:nth-of-type(1) .cScore p');
    const tScoreUser1=document.querySelector('.container .box:nth-child(1) .tScore p');
    const cScoreUser2=document.querySelector('.container .box:nth-child(3) .cScore p');
    const tScoreUser2=document.querySelector('.container .box:nth-child(3) .tScore p');

    console.log(cScoreUser2);

    
    const rollBtn=document.querySelector('.btns .roll');
    const holdBtn=document.querySelector('.btns .hold');

    const firDice=document.querySelector('.images .dice1');
    const secDice=document.querySelector('.images .dice2');

    const qBtnUser1=document.querySelector('.ply1');
    const qBtnUser2=document.querySelector('.ply2');

    const comment=document.querySelector('.comment p');

    let currScoreUser1=0,currScoreUser2=0;
    let totScoreUser1=0,totScoreUser2=0;
    
    function getRandomNum1To6(){
        return Math.floor(Math.random()*6+1);
    }

    function rollDice(player){
        // while()
            console.log(`roll clicked,player - ${player}`);
            if(player===1){
                Dice1User1=getRandomNum1To6();
                Dice2User1=getRandomNum1To6();
                firDice.setAttribute('src',dices[Dice1User1-1]);
                secDice.setAttribute('src',dices[Dice2User1-1]);
                if(Dice1User1===1 && Dice2User1===1){
                    currScoreUser1=0;
                    totScoreUser1=0;
                    cScoreUser1.innerHTML="0";
                    tScoreUser1.innerHTML="0";
                    return 2;
                }
                else if(Dice1User1===1 || Dice2User1===1){
                    currScoreUser1=0;
                    return 2;
                }
                else{
                    currScoreUser1=Dice1User1+Dice2User1;
                }
                cScoreUser1.innerHTML=`${currScoreUser1}`;
                return 1;
            }
            else if(player===2){
                console.log("pl2//");
                Dice1User2=getRandomNum1To6();
                Dice2User2=getRandomNum1To6();
                firDice.setAttribute('src',dices[Dice1User2-1]);
                secDice.setAttribute('src',dices[Dice2User2-1]);
                if(Dice1User2===1 && Dice2User2===1){
                    currScoreUser2=0;
                    totScoreUser2=0;
                    cScoreUser2.innerHTML="0";
                    tScoreUser2.innerHTML="0";
                    return 1;
                }
                else if(Dice1User2===1 || Dice2User2===1){
                    currScoreUser2=0;
                    return 1;
                }
                else{
                    currScoreUser2=Dice1User2+Dice2User2;
                    console.log(currScoreUser2);
                }
                console.log(cScoreUser2);
                cScoreUser2.innerHTML=`${currScoreUser2}`;
                return 2;
            }
    }

    function resetGame(){
        cScoreUser1.innerHTML="0";
        cScoreUser2.innerHTML="0";
        tScoreUser1.innerHTML="0";
        tScoreUser2.innerHTML="0";
        currScoreUser1=0;
        currScoreUser2=0;
        totScoreUser1=0;
        totScoreUser2=0;
        playGame();
    }

    resetGame();

    function playGame(){
        let click;
        let holdActive;
        let gameOver=false;
        comment.innerHTML=`Player - ${startPlayer} starts...`;
        do{
            click=false;
            holdActive=false;
            qBtnUser1.addEventListener('click',function(){
                startPlayer=3-startPlayer;
                comment.innerHTML=`Player - ${startPlayer} chance...`;
            })
            qBtnUser2.addEventListener('click',function(){
                startPlayer=3-startPlayer;
                comment.innerHTML=`Player - ${startPlayer} chance...`;
            })
            rollBtn.addEventListener('click',function(){         
                firDice.style.display="block";
                secDice.style.display="block";
                document.querySelector('.box:nth-child(2) h2').style.display="none";
                let prevPlayer=startPlayer;
                startPlayer=rollDice(startPlayer);
                if(prevPlayer!=startPlayer)
                    comment.innerHTML=`Player - ${startPlayer} chance...`;
                click=true;
                holdActive=true;
            });
            holdBtn.addEventListener('click',function(){
                if(holdActive){
                    if(startPlayer===1){
                        totScoreUser1+=currScoreUser1;
                        tScoreUser1.innerHTML=`${totScoreUser1}`;
                    }
                    else if(startPlayer===2){
                        totScoreUser2+=currScoreUser2;
                        tScoreUser2.innerHTML=`${totScoreUser2}`;
                    }
                    if(totScoreUser1>=100 || totScoreUser2>=100){
                        if(totScoreUser1>=100){
                            comment.innerHTML="Player 1 Wins !!";
                        }
                        else if(totScoreUser2>=100){
                            comment.innerHTML="Player 2 Wins !!";
                        }
                        comment.innerHTML+='\nEnter a key to restart!';
                        window.addEventListener('keypress',resetGame);
                    }
                }
                holdActive=false;
            });
        }while(click && totScoreUser1<100 && totScoreUser2<100);
        
    }

})();
