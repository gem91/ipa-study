const part = document.querySelectorAll(".box_poll_graph")
const questions = document.querySelectorAll(".list_poll_graph");
const color = ["rosybrown", "darkcyan", "tomato", "yellow", "violet", "grey", "orange"];
let rect = questions[0].offsetWidth;

//** X축 구하기 
for(let i = 0; i < part.length ; i++ ){
    const xArr = new Array();   //x축 수치 넣을 변수
    let xNum = document.createElement("div");
    xNum.className = "score_list";
    part[i].append(xNum);   // part 변수에 xNum "div" 넣기

    //5단위로 값 구하기
    for(let i = 0; i <= 100 ; i++ ){
        if( i % 5 === 0 )  xArr.push(i);    // 5나눠서 0으로 떨어진 값 x축 배열에 넣기
    }
    xArr.forEach( num => xNum.insertAdjacentHTML("beforeend", `<span>${num}</span>` ));
}


for(let i=0; i < questions.length ; i++ ){
    //** 그래프 그리기
    const lis = questions[i].querySelectorAll("li");
    const scoreValue = new Array();
    rect = questions[i].style.width = rect/rect * 100;  // 백점 만점 만들기
   
    for(let b = 0; b < lis.length ; b++ ){
        let bar = document.createElement("div")
        let num = null;
        let width = null;

        num = lis[b].querySelector(".txt_num").innerHTML;
        scoreValue.push(+ num); // string to number
        bar.className = "bar";
        bar.style.width = `${scoreValue[b] / rect * 100}%`; // bar 그래프 백분율로 계산하기
        bar.style.height = "20px";
        bar.style.backgroundColor = color[b];
        lis[b].append(bar);
    }
 
    //**합산 구하기
    let sum = 0;
    scoreValue.forEach( item => sum += item);   //sum 변수에 각각의 item을 더하며 대입하기

    let grades = document.querySelectorAll(".txt_total span");
    grades[i].innerText = Math.round(sum/lis.length * 100) / 100;   //합산 나눠서 반올림하기
}
 
 


