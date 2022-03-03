(()=>{

// let rect = answers[0].offsetWidth;


class Answer{
    constructor(selector, options, questionTit){
        this.id = document.querySelector(`#${selector}`); // selector값
        this.title = this.id.querySelector('.txt_question'); // 문항, 질문내용 넣기위한
        this.lists = this.id.querySelector(".list_poll_graph");
        this.list = this.lists.querySelectorAll("li");  //답변 리스트들
        this.title.innerHTML =  `<span class="txt_order">${questionTit[0]}</span>${questionTit[1]}`; // 타이틀에 내용 넣기

        this.unit = 5; // 5 단위로
        this.color = ["rosybrown", "darkcyan", "tomato", "yellow", "violet", "grey", "orange"]; // 컬러값
        this.countArr = new Array();  //인원수 뽑기
       
        // 사람들 숫자, 답안 별 점수 구하기
        this.manyPeople = this.getPeople(); // 사람 수 구하기
        this.sumFigure = this.getSum(options, this.countArr);  // (사람 수 * 점수)합산 구하기
        this.average = this.getAverage(this.sumFigure, this.countArr);  //평점 구하기
        console.log(this.manyPeople)
        this.maxNum = this.getMaxNum(this.countArr);
        this.Bar = this.createBar(this.countArr, this.maxNum); // 그래프 그리기

        this.getXAxis(this.lists, this.maxNum);  // 그래프 X축 구하기
    }
    //func 사람수 얻기
    getPeople() {  // 답변 리스트마다 인원 수 구하기
        let totalPeople = 0;
        for(let i = 0; i < this.list.length ; i++ ){
            let count = this.list[i].querySelector(".txt_num").innerText; //.txt_num에 있는 숫자 뽑아내기
            this.countArr.push(+ count); // string to number
            totalPeople += this.countArr[i]
        }
        console.log(totalPeople)
    }
    //func 그래프 만들기
    createBar(arr, test){
        for(let i = 0; i < this.list.length ; i++ ){
            const bar = this.newEl("div", "graph");
            let width = null;
            bar.style.width = `${(arr[i] / test ) * 100}%`; // bar 그래프 백분율로 계산하기
            bar.style.backgroundColor = this.color[i];
            bar.style.height = "20px";
            this.list[i].append(bar);
        }
    }
    // func 최대값
    getMaxNum(arr) {
        let max = Math.max.apply(null, arr);
        return max;
    };
    // func 합산
    getSum(options, countArr){  // 리스트 인원 * 점수 총합
        let sum = null;
        for(let i = 0; i < this.list.length ; i++ ){
            sum += options[i][0] * countArr[i];
        }
        return sum;
    }
    // func 평점 구하기
    getAverage(sumFigure, arr){  // 합산 나누기 질문갯수
        const grade = this.lists.nextSibling.nextSibling.querySelector('span');
        grade.innerText = Math.round(sumFigure/this.list.length * 100) / 100 ;  //합산 나눠서 반올림하기
        return grade;
    }

    // X축 구하기 
    getXAxis(ulBox, max){
        const xArr = new Array();   //x축 수치 넣을 변수
        let num = null;
        const xNum = this.newEl("div", "score_list");
        ulBox.append(xNum);   // answers 변수에 xNum "div" 넣기
        //최대값 5단위로 만들기
       num = max/this.unit;
       num = Math.ceil(num) * this.unit
        for(let i = 0; i <= num ; i++ ){
            if( i % this.unit === 0 )  xArr.push(i);    // 5나눠서 0으로 떨어진 값 x축 배열에 넣기
        }
        xArr.forEach( xValue => xNum.insertAdjacentHTML("beforeend", `<span>${xValue}</span>` ));
    }
   
    // 엘레멘트 만들기
    newEl(tagName, className) {
        const el = document.createElement(tagName)
        el.classList.add(className)
        return el
    };
}

new Answer('question01', 
    [ [ 1, '매우 아니다'], [ 2, '아니다'], [ 3, '보통이다'], [ 4, '그렇다'], [ 5, '매우 그렇다'] ], 
    ['문항 1','넷플릭스 사용에 만족하십니까?']
)
new Answer('question02', 
    [ [ 1, '매우 아니다'], [ 2, '아니다'], [ 3, '보통이다'], [ 4, '그렇다'], [ 5, '매우 그렇다'] ], 
    ['문항 2','새로운 채널은 마음에 드십니까?']
)
new Answer('question03', 
    [ [ 1, '매우 진짜 아니다'], [ 2, '매우 아니다'], [ 3, '아니다'], [ 4, '보통이다'], [ 5, '그렇다'], [ 6, '매우 그렇다'], [ 7, '매우 진짜 그렇다'] ], 
    ['문항 3','다른 친구들에게 소개할 의향이 있습니까?']
)

})()