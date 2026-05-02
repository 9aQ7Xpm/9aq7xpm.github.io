(function(){
    const Dice = $("#ActDice");
    const Lap = $("#ActDiceLap");
    const Trigger = $("#ActDiceTrigger");

    let Steps = 0;
    let Laps = 0;
    let CanTrigger = true; /* 确定是否可以触发点击事件 */ 

    // 定义移动函数
    function Movement(ResultNum){
        for(let step = 0; step < ResultNum; step++){
            Steps++;
            if([1, 2, 3, 4, 17, 18, 19].includes(Steps % 24)){
                Dice.animate({left:"+=130px"},200);
            } else if(Steps % 24 >= 5 && Steps % 24 <= 9){
                Dice.animate({top:"+=130px"},200);
            } else if([10, 13, 14, 15, 21, 22, 23].includes(Steps % 24)){
                Dice.animate({left:"-=130px"},200);
            } else {
                Dice.animate({top:"-=130px"},200);
            }
        }
    };

    // 模拟骰子取随机数
    function StartRolling(InputNum){
        let count = 0;
        const Duration = 1000;
        const IntervalTime = 25;
        let timer = null;
        let Result = 0;
        $('#ActDicePoints').css('display', 'flex');

        timer = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            $('#ActDicePoints').text(randomNum);

            count += IntervalTime;
            if (count >= Duration) {
                clearInterval(timer);
                Result = Math.floor(Math.random() * 6) + 1;
                $('#ActDicePoints').text(Result);

                setTimeout(() => {
                    $('#ActDicePoints').css('display', 'none');
                    if(InputNum) InputNum(Result);
                }, 1000)
            };
        },IntervalTime);
    };

    // 添加待机动画
    function IdleAnimation(){
        Dice.animate({
            width: '90px',
            height: '110px'
        },80)
        .animate({
            width: '100px',
            height: '100px'
        },50)
        .animate({
            width: '104px',
            height: '96px'
        },20)
        .animate({
            width: '100px',
            height: '100px'
        },50)
        .animate({
            width: '104px',
            height: '96px'
        },20)
        .animate({
            width: '100px',
            height: '100px'
        },50)
        .delay(175)
        .promise()
        .then(() => IdleAnimation());
    };

    // 点击按钮触发移动事件
    Trigger.on("click", function(){
        if(!CanTrigger) return;
        CanTrigger = false;

        StartRolling(function(ResultNum){
            let AnimateTime = 200 * ResultNum;
            Movement(ResultNum);

            // 防止连点
            setTimeout(() => {
                CanTrigger = true;
            }, AnimateTime + 500);
                    
            // 这是再动
            if([6, 12, 18].includes(Steps % 24)){
                setTimeout(() => {
                    Trigger.trigger('click');
                }, AnimateTime +  500);
            };

            // 计算完成了多少圈
            Laps = Math.floor(Steps/24);
            Lap.text(`第 ${Laps} 圈`);
        });
    });

    IdleAnimation();
})()