(function(){
    const Dice = $("#ActDice");
    const Lap = $("#ActDiceLap");
    const Trigger = $("#ActDiceTrigger");

    let Steps = 0;
    let Laps = 0;
    let CanTrigger = true; /* 确定是否可以触发点击事件 */ 

    // 3D骰子 - 点数对应图片
    const faceImages = {
        '?': 'https://patchwiki.biligame.com/images/starengine/6/6f/j8ndy6ddgrhxv5s3atkswkcqku46ufk.png',
        1: 'https://patchwiki.biligame.com/images/starengine/5/58/8szr71uoyuz1rjuqos3oqscz58zg6ib.png',
        2: 'https://patchwiki.biligame.com/images/starengine/3/3c/k033h2mbnz4cyehmedm9c5dbbm3bfb8.png',
        3: 'https://patchwiki.biligame.com/images/starengine/7/74/o2o1a5fmudkp9jsv1l29nz5aa69m02d.png',
        4: 'https://patchwiki.biligame.com/images/starengine/4/45/1b9qvfvirxdv3g2tv5n6ghsjtcj7c8e.png',
        5: 'https://patchwiki.biligame.com/images/starengine/2/27/af74yr0wrv58e59robfvi8qdi00b71q.png',
        6: 'https://patchwiki.biligame.com/images/starengine/6/6c/1bvfq8zev96afp8svieig2updmxcg88.png'
    };

    // 3D骰子 - 面与基础角度
    const faceAngles = {
        1: [0, 0],
        2: [-90, 0],
        3: [0, -90],
        4: [0, 90],
        5: [90, 0],
        6: [0, 180]
    };

    // 3D骰子 - 点数对应面 CSS 类名
    const faceClassMap = {
        1: 'front',
        2: 'top',
        3: 'right',
        4: 'left',
        5: 'bottom',
        6: 'back'
    };

    // 3D骰子 - 工具：恢复所有面为 ？图片
    function resetAllFacesToQuestion(container) {
        container.querySelectorAll('.face img').forEach(img => {
            img.src = faceImages['?'];
        });
    }

    // 3D骰子 - 工具：将指定面设为点数图片
    function setFaceImage(container, className, imgUrl) {
        const face = container.querySelector('.face.' + className);
        if (face) {
            const img = face.querySelector('img');
            if (img) img.src = imgUrl;
        }
    }

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

    // 3D骰子转动 - 替换原来的 StartRolling
    function StartRolling(InputNum){
        const pointsContainer = document.getElementById('ActDicePoints');
        const diceEl = pointsContainer.querySelector('.dice');

        // 重置所有面为问号图片
        resetAllFacesToQuestion(pointsContainer);
        // 显示3D骰子容器
        pointsContainer.style.display = 'flex';

        // 随机目标点数
        const targetFace = Math.floor(Math.random() * 6) + 1;
        const [baseX, baseY] = faceAngles[targetFace];

        // 额外旋转圈数 + 微调
        const extraSpinsX = (Math.floor(Math.random() * 3) + 3) * 360;
        const extraSpinsY = (Math.floor(Math.random() * 3) + 3) * 360;
        const randOffsetX = (Math.random() - 0.5) * 30;
        const randOffsetY = (Math.random() - 0.5) * 30;

        const finalX = baseX + extraSpinsX + randOffsetX;
        const finalY = baseY + extraSpinsY + randOffsetY;

        // 保证动画启动
        requestAnimationFrame(() => {
            diceEl.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            diceEl.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg) rotateZ(0deg)`;
        });

        // 动画结束处理
        function onTransitionEnd() {
            diceEl.removeEventListener('transitionend', onTransitionEnd);

            // 目标面换成对应点数图片
            const targetClass = faceClassMap[targetFace];
            setFaceImage(pointsContainer, targetClass, faceImages[targetFace]);

            setTimeout(() => {
                pointsContainer.style.display = 'none';
                // 重置为问号，为下次做准备
                resetAllFacesToQuestion(pointsContainer);
                if (InputNum) InputNum(targetFace);
            }, 1000);
        }
        diceEl.addEventListener('transitionend', onTransitionEnd);
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
            console.log(Steps);

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