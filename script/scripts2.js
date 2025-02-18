let computer = {
  score :0,
  percent2:0.5,
  percent3:0.33
};
let user = {
  score : 0,
  percent2 : 0.5,
  percent3 : 0.33
}
let game = {
  shootLeft :15,
  isComputerTurn:true
};

function showText(s){
  // let textElement = document.getElementById('text');
  // $textElement.innerHTML = s;
  let $textElement = $(`#text`)
  // 기존 깜빡이는 예시
  // $textElement.fadeOut();
  // $textElement.html(s);
  // $textElement.fadeIn();
  // 콜백함수를 통한 개선
  $textElement.fadeOut(500,function(){
    $textElement.html(s);
    $textElement.fadeIn(100);
  });
}
function updateComScore(score)
{// let comScoreElement = document.getElementById('computer-score');
// $comScoreElement.innerHTML = computer.score;
// let $comScoreElement = $(`#computer-score`)
// computer.score += score;
// $comScoreElement.html(computer.score)
  computer.score += score;
  let $comScoreElement = $(`#computer-score`)
  $comScoreElement.animateNumber({
    number : computer.score
  });
}

function updateUserScore(score){
  // let userScoreElement = document.getElementById('user-score');
  // $userScoreElement.innerHTML = user.score;
  
  //제이쿼리 적용 후(플러그 인 전)
  // let $userScoreElement = $(`#user-score`)
  // user.score += score;
  // $userScoreElement.html(user.score);

  // 플러그인 적용 후
  user.score += score;
  let $userScoreElement = $(`#user-score`)
  $userScoreElement.animateNumber({
    number: user.score
  });
}

function disableComButton(flag){
  // let computerButtons = document.getElementsByClassName('btn-computer'); 
  // for(let i = 0; i < computerButtons.length; i++){
  //   computerButtons[i].disabled = flag;
  // }
  $('.btn-computer').prop('disabled',flag)
}

function disablUserButton(flag){
  // let userButtons = document.getElementsByClassName('btn-user');
  // for(let i = 0; i < userButtons.length; i++){
  //   userButtons[i].disabled = flag;
  // }
  $('.btn-user').prop('disabled',flag)
}
// 시나리오 관련 함수 작성 예정
function updateAi(){
  let difference = user.score - computer.score;
  
  if(difference > 11){
    computer.percent2 = 0.7;
    computer.percent3 = 0.43;
  }else if(difference > 7){
    computer.percent2 = 0.6;
    computer.percent3 = 0.38;
  }else if(difference > -11){
    computer.percent2 = 0.3;
    computer.percent3 = 0.23;
  }else if(difference > -7){
    computer.percent2 = 0.4;
    computer.percent3 = 0.28;
  }
}


function onComputerShoot(){
 
  if(!game.isComputerTurn) return;

  updateAi();

  let shootType = Math.random() < 0.5 ? 2 : 3;

  if(Math.random() < computer['percent' + shootType]) { // 결과값은 percent2/percent3 가 되므로 computer['percent2'] 혹은 computer['percent3']가 산출 됨
    showText('컴퓨터의 ' +shootType+'점 슛이 성공했습니다');
    updateComScore(shootType);
  }else{
    showText('컴퓨터의 ' +shootType+'점 슛이 실패했습니다');
  }
  game.isComputerTurn = false;
  disableComButton(true);
  disablUserButton(false);
}

function onUserShoot(shootType){
  if(game.isComputerTurn) return;
  
  if (shootType === 2){
    if(Math.random() < user.percent2){
    
      showText('2점슛을 성공했습니다. now-computer');
      updateUserScore(2)

    }else{
      showText('2점슛을 실패했습니다. now-computer');
    }
  }else{
    if(Math.random() < user.percent2){

      showText('3점슛을 성공했습니다. now-computer');
      updateUserScore(3)
    }else{
      showText('3점슛을 실패했습니다. now-computer');
    }
  }  
  

  game.isComputerTurn = true;

  disableComButton(false);
  disablUserButton(true);


  game.shootLeft --;
  
  // let shootLeftElement = document.getElementById('shots-left');
  // $shootLeftElement.innerHTML = game.shootLeft;
  let $shootLeftElement = $(`#shots-left`)
  $shootLeftElement.html(game.shootLeft)

  if(game.shootLeft === 0){
    if(user.score > computer.score){
      showText('승리');
      alert('승리');
    }else if(user.score < computer.score){
      showText('패배')
      alert('패배');
    }else{
      showText('무승부')
      alert('무승부');
    }
    disableComButton(true);
    disablUserButton(true);
  }
}