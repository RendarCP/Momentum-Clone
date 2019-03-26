const clockContainer = document.querySelector(".js-clock"),
   clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const hours = date.getHours(); 
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText =  //각각 10보다 작을시 1로 표시되는걸 01 이렇게 표시되는걸로 변경 
    `${hours < 10 ? `0${hours}`: hours}:${
        minutes < 10 ? `0${minutes}`: minutes}:${
            seconds < 10 ? `0${seconds}`: seconds}`; 
}

function init(){
    getTime();
    setInterval(getTime,1000); //1초마다 반복해서 getTime 실행
}

init();