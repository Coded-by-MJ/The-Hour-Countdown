const startBtn = $("#start");
const resetBtn = $("#reset");
const stopBtn = $("#stop");
const selectTime = $("#select-time");
const hourGlass = $(".hour-glass");
const popover = $("#time-popover")[0];




let milliseconds = [
    60000,  // 1 minute
    120000, // 2 minutes
    180000, // 3 minutes
    240000, // 4 minutes
    300000, // 5 minutes
    360000, // 6 minutes
    420000, // 7 minutes
    480000, // 8 minutes
    540000, // 9 minutes
    600000, // 10 minutes
    660000, // 11 minutes
    720000, // 12 minutes
    780000, // 13 minutes
    840000, // 14 minutes
    900000, // 15 minutes
    960000, // 16 minutes
    1020000, // 17 minutes
    1080000, // 18 minutes
    1140000, // 19 minutes
    1200000, // 20 minutes
    1260000, // 21 minutes
    1320000, // 22 minutes
    1380000, // 23 minutes
    1440000, // 24 minutes
    1500000, // 25 minutes
    1560000, // 26 minutes
    1620000, // 27 minutes
    1680000, // 28 minutes
    1740000, // 29 minutes
    1800000, // 30 minutes
    1860000, // 31 minutes
    1920000, // 32 minutes
    1980000, // 33 minutes
    2040000, // 34 minutes
    2100000, // 35 minutes
    2160000, // 36 minutes
    2220000, // 37 minutes
    2280000, // 38 minutes
    2340000, // 39 minutes
    2400000, // 40 minutes
    2460000, // 41 minutes
    2520000, // 42 minutes
    2580000, // 43 minutes
    2640000, // 44 minutes
    2700000, // 45 minutes
    2760000, // 46 minutes
    2820000, // 47 minutes
    2880000, // 48 minutes
    2940000, // 49 minutes
    3000000, // 50 minutes
    3060000, // 51 minutes
    3120000, // 52 minutes
    3180000, // 53 minutes
    3240000, // 54 minutes
    3300000, // 55 minutes
    3360000, // 56 minutes
    3420000, // 57 minutes
    3480000, // 58 minutes
    3540000, // 59 minutes
    3600000  // 60 minutes
];


for(let i = 1; i < milliseconds.length; i++){
    const option = $("<option>");
    option.val(milliseconds[i]);
    option.text(`${i + 1} minutes`);
    selectTime.append(option);
}



function updateMinuteNum(){
    const setMin = selectTime.val() / 60000;
    $("#minutes").text(`${ setMin < 10 ? "0" + setMin : setMin }`);
}







let remainingTime = parseInt(localStorage.getItem("timer")) || 0;
let interval;


function startCountdown() {

    if(remainingTime <= 0) return;

    let startTime = Date.now();
    let endTime = startTime + remainingTime;

  
    $(".form-control").hide();
    startBtn.hide();
    stopBtn.show();
    hourGlass.addClass("active");

    interval = setInterval(() => {
        let currentTime = Date.now();
        remainingTime = endTime - currentTime;

        // Convert remaining time to minutes and seconds
        let minutes = Math.floor(remainingTime / 60000);
        let seconds = Math.floor((remainingTime % 60000) / 1000);

        // console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds} remaining`);

        $("#minutes").text(`${ minutes < 10 ? "0" + minutes : minutes }`);
        $("#seconds").text(`${ seconds < 10 ? "0" + seconds : seconds }`);

        localStorage.setItem("timer", remainingTime);


        if (minutes <= 0 && seconds <= 0) {
            clearInterval(interval);
            hourGlass.removeClass("active");
            popover.showPopover();
        }
    }, 1000);


}




function stopCountdown() {
    clearInterval(interval);
    hourGlass.removeClass("active");
}



function resetCountdown(){
    stopCountdown();
    selectTime.val("");
    remainingTime = 0;
    localStorage.setItem("timer", remainingTime);

    $("#minutes").text(`00`);
    $("#seconds").text(`00`);
    $(".form-control").show("fast");
    stopBtn.hide();
    startBtn.show();
    // console.log("resets everything");

}









$("form").on("submit", function(e){
    e.preventDefault();
   // const duration =  parseInt(selectTime.val());
    remainingTime = parseInt(selectTime.val());
    startCountdown();
})







stopBtn.on("click", stopCountdown);

resetBtn.on("click", resetCountdown)

$(".dismiss-popover").on('click', resetCountdown)  //resets countdown when popover is dismissed




selectTime.on({
        "change": updateMinuteNum,
        "click": function(){
            $(this).siblings("span").toggleClass("up");
        }
});



$(window).on("keydown", function(e){
        if(popover.matches(":popover-open") && e.key == "Escape"){
            resetCountdown();
        }
})




popover.addEventListener("beforetoggle", (event) => {
    if (event.newState === "open") {
      $("audio")[0].play();
    } else {
        $("audio")[0].pause();
    }
});



$(".resume-box").on("click", (e) =>{
    if(!e.target.matches("button")) return;
    
    if(e.target.value == "yes"){
        startCountdown();
        $(".resume-box")[0].close();
    }else{
        $(".resume-box")[0].close();
    }
       

  
});


$(document).ready(() => {

   if(localStorage.getItem("timer") > 0){
       $(".resume-box")[0].showModal();
   }

})

