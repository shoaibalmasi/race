let main = document.getElementById("main");
let players = document.getElementById('players');
let info = document.getElementById('info');
let playerNumber;
let namesArray = [];
let CarNameObj = [];
let j = 1;
let posArr=[];
function Car(Name, carColor) {
    this.Name = Name;
    this.position = 1;
    this.carColor = carColor;
}
//func for makeing random number
function randomNum() {
    return Math.floor(Math.random() * 10) + 1;
}

//func for makeing color
function colorMaker() {
    let number;
    let colorArr = [];
    for (let i = 0; i < 3; i++) {
        number = Math.floor(Math.random() * 235 + 20);
        colorArr.push(number);
    }
    return `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})`;
}

// func for makeing road
function roadMaker() {
    let row;
    let col;
    for (i = 1; i <= 150; i++) {
        main.innerHTML += `<div class="cell" id=${i}></div>`;
        if (i % 16 === 0) {
            if ((i / 16) % 2 === 0) {
                $(`#${i}`).css('grid-area', `${(i/16)*2}/1/${((i/16)*2)+1}/2`);
                $(`#${i-1}`).css('border-top-left-radius','80%');
               
            } else {
                $(`#${i}`).css('grid-area', `${(i/16)*2}/15/${((i/16)*2)+1}/16`);
                $(`#${i-1}`).css('border-top-right-radius','80%');
                $(`#${i+1}`).css('border-bottom-right-radius','80%');
            }
            $(`#${i}`).html(`|`);
        } else {
            row = Math.floor(i / 16) * 2 + 1;
            if (Math.floor(i / 16) % 2 === 0) {
                if(i%16===1 && i!==1){
                    $(`#${i}`).css('border-bottom-left-radius','80%');
                }
                col = i - (Math.floor(i / 16) * 16);
            } else {
                if(i%16===1){
                    $(`#${i}`).css('border-bottom-right-radius','80%');
                }
                col = 16 - (i - Math.floor(row / 2) * 16);
            }
            $(`#${i}`).css('grid-area', `${row}/${col}/${row+1}/${col+1}`);
            $(`#${i}`).html(`- -`);
        }

    }
}

//func for get number of players
function getNumber() {
    playerNumber = $('#player-number').val();
    $('#player-names').prop('disabled', false);
}

//func for get name of players
function getNames(e) {
    if (e.keyCode === 13) {
        if($('#player-names').val()===""){
            alert("یک نام وارد کنید");
        }else{
            if(namesArray.includes($('#player-names').val())){
                alert("نام ها باید غیر تکراری باشند");
                $('#player-names').val("");
            }else{
                j++;
                $('#player-number').prop('disabled', true);
                namesArray.push($('#player-names').val());
                $('#player-names').val("");
                $('#player-names').attr("placeholder", ` نام بازیکن شماره ${j} را وارد کنید و enter را بزنید`);
                if (j > playerNumber) {
                    $('#player-names').prop('disabled', true);
                    $('#player-names').attr("placeholder", ` نام بازیکن ها تکمیل شد`);
                    $('#start-btn').prop('disabled', false);
                }
            }
        } 
    }
}
//func for start game
///////////////////////////////
function startGame() {
    $('#game-info').css("display", "none");
    $('#parent').css("display", "block");
    info.style.visibility="visible";
    roadMaker();
    for (let i = 0; i < namesArray.length; i++) {
        CarNameObj.push(new Car(namesArray[i], colorMaker()));
        players.innerHTML += `<div class='player' id='car-${CarNameObj[i].Name}'><i class='fa fa-motorcycle'></i></div>`;
        info.innerHTML+=`<div class='info-child' id='car-info-${CarNameObj[i].Name}'><h3>${CarNameObj[i].Name}</h3></div>`;
        $(`#car-${CarNameObj[i].Name}`).css('color', `${CarNameObj[i].carColor}`);
        $(`#car-info-${CarNameObj[i].Name}`).css('background-color',`${CarNameObj[i].carColor}`);
    }
}

//func for shuffle array
function shuffle(array) {
    var copy = [],
        n = array.length,
        i;
    while (n) {
        i = Math.floor(Math.random() * array.length);
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }
    return copy;
}


//func for start again
function startAgain(){
    $('.player').css('display', 'block');
    for(i=0;i<CarNameObj.length;i++){
        CarNameObj[i].position=1;  
    } 
    $('#buts h2').html("");
        main.innerHTML="";
        roadMaker();
        $('#nextBtn').attr("onclick","nextMove()");
}


//func for next move
function nextMove() {
    let flag=true;
    $('.player').css('display', 'none');
    $('#1').html("- -");
    $('#1').css('color','yellow');
    info.innerHTML="";
    CarNameObj = shuffle(CarNameObj);
    for (i = 0; i < posArr.length; i++) {
        if(posArr[i]%16===0){
            $(`#${posArr[i]}`).html("|");
        }else{
            $(`#${posArr[i]}`).html("- -");
        }
        $(`#${posArr[i]}`).css('color', 'yellow');
    }
     posArr = [];
    for (i = 0; i < CarNameObj.length; i++) {
        CarNameObj[i].position += randomNum();
        if (posArr.includes(CarNameObj[i].position)) {
            let index = posArr.indexOf(CarNameObj[i].position);
            $('#1').html("<i class='fa fa-motorcycle'></i>");
            $('#1').css('color', `${CarNameObj[index].carColor}`);
            CarNameObj[index].position=1;
        }
        $(`#${CarNameObj[i].position}`).html("<i class='fa fa-motorcycle'></i>");
        $(`#${CarNameObj[i].position}`).css('color', `${CarNameObj[i].carColor}`);
        if(CarNameObj[i].position%16===0){
            $(`#${CarNameObj[i].position} i`).css('transform','rotate(90deg)');
        
        }else if (Math.floor(CarNameObj[i].position / 16) % 2 !== 0) {
            $(`#${CarNameObj[i].position } i`).css('transform','scaleX(-1)');
        }
        posArr.push(CarNameObj[i].position);
        
        if (CarNameObj[i].position >= 150 && flag===true) {
            $('#buts').html(`${$('#buts').html()}<h2>${CarNameObj[i].Name} is winner</h2>`);
            $('#nextBtn').removeAttr("onclick");
            flag=false;
     } 
    }
    CarNameObj.sort(function(a, b){return b.position - a.position});
    for(i=0;i<CarNameObj.length;i++){
        info.innerHTML+=`<div class='info-child' id='car-info-${CarNameObj[i].Name}'><h3>${CarNameObj[i].Name}</h3></div>`;
        $(`#car-info-${CarNameObj[i].Name}`).css('background-color',`${CarNameObj[i].carColor}`);
    }  
console.log(posArr);

}