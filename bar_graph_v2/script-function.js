const answers = document.querySelectorAll(".list_poll_graph");
let rect = answers[0].offsetWidth;
const unit = 5;
const color = ["rosybrown", "darkcyan", "tomato", "yellow", "violet", "grey", "orange"];



answers.forEach( answer => {
    const lists = answer.querySelectorAll("li");
    const len = lists.length;
    let sumFigure = null;  //합산 변수
    const countArr = new Array();
    
    for(let li = 0; li < len; li++ ){
        let count = lists[li].querySelector(".txt_num").innerText;
        countArr.push(+ count); // string to number

        const bar = newEl("div", "graph")
        createBar(bar, li, countArr) // 그래프 그리기
        lists[li].append(bar);
    }
    xAxis(answer);  // X축 구하기
    sumFigure = sum(countArr, sumFigure);  //합산 구하기

    average(answer, len, sumFigure);  //평점 구하기
})


function xAxis(answer){
    // X축 구하기 
    const xArr = new Array();   //x축 수치 넣을 변수
    const xNum = newEl("div", "score_list");
    answer.append(xNum);   // answers 변수에 xNum "div" 넣기

    //5단위로 값 구하기
    for(let i = 0; i <= 100 ; i++ ){
        if( i % unit === 0 )  xArr.push(i);    // 5나눠서 0으로 떨어진 값 x축 배열에 넣기
    }
    xArr.forEach( xValue => xNum.insertAdjacentHTML("beforeend", `<span>${xValue}</span>` ));
}

function createBar(bar, index, countArr){
    let width = null;
    bar.style.width = `${countArr[index] / 100 * 100}%`; // bar 그래프 백분율로 계산하기
    bar.style.backgroundColor = color[index];
    bar.style.height = "20px";
}
function sum(countArr, sumFigure){
    countArr.forEach( item => sumFigure += item);   //sum 변수에 각각의 item을 더하며 대입하기
    return sumFigure;
}
function average(answer, len, sumFigure){
    const grades = answer.nextSibling.nextSibling.querySelector("span");
    grades.innerText = Math.round(sumFigure/len * 100) / 100;   //합산 나눠서 반올림하기
    // grades
    return grades;
}

// 엘레멘트 만들기
function newEl(tagName, className) {
    const el = document.createElement(tagName)
    el.classList.add(className)
    return el
};







// for(let i=0; i < answers.length ; i++ ){
//     //** 그래프 그리기
//     const lists = answers[i].querySelectorAll("li");
//     const len = lists.length;
//     let sumFigure = 0;
//     const countArr = new Array();
    
//     rect = answers[i].style.width = rect/rect * 100;  // 백점 만점 만들기
   
//     for(let list = 0; list < len; list++ ){
//         let count = null;
//         count = lists[list].querySelector(".txt_num").innerHTML;
//         countArr.push(+ count); // string to number

//         const bar = newEl("div", "graph")
//         createBar(bar, list, countArr) // 그래프 그리기
//         lists[list].append(bar);
//     }

//     xAxis(i);  // X축 구하기
//     sum(countArr, sumFigure);  //합산 구하기
//     average(i, len, sumFigure);  //평점 구하기
// }