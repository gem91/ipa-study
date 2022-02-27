(()=>{
   const questionBox = document.querySelector(".box_poll");
   const lists = questionBox.querySelector(".list_poll_graph");
   const list = lists.querySelectorAll("li");
   const listText = lists.querySelectorAll(".txt");

   const answers = [
        { key : 1, text : "매우 아니다" },
        { key : 2, text : "아니다" },
        { key : 3, text : "보통이다" },
        { key : 4, text : "그렇다" },
        { key : 5, text : "매우 그렇다" }
    ];

    const scoreValue = new Array();
   for(let i=0; i < list.length ; i++ ){
        if(listText[i].textContent.includes(answers[i].text)){
            listText[i].setAttribute("data-num", answers[i].key);
        }
        sumCount(i);
        
    };
    function maxData() {
        const maxData = Math.max(...this.eachAnswerLengthMap.values())
        return maxData
      }
    function sumCount(index){
        let num = null;
        let sum = 0;
        
        num = list[index].querySelector(".txt_num").innerHTML;
        scoreValue.push(+ num); // string to number
        scoreValue.forEach( item => sum += item);   //sum 변수에 각각의 item을 더하며 대입하기
        console.log(sum)
    }

})()