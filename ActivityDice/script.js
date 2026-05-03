(function(){
    const Dice = $("#ActDice");
    const Lap = $("#ActDiceLap");
    const Trigger = $("#ActDiceTrigger");
    const Reward = $(".ActDiceWrapper .RewardContainer")

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

    // 规定稀有度
    const Rarity = {
        Green: "https://patchwiki.biligame.com/images/starengine/1/18/6rb63pcyo44967hdhz93p5ykjvuilwt.png",
        Blue: "https://patchwiki.biligame.com/images/starengine/f/fe/0vfbwc0zty8ng946p593md62jestnnt.png",
        Purple: "https://patchwiki.biligame.com/images/starengine/0/06/70yjl5wtjohggzfow1ymncwc685iibr.png",
        Gold: "https://patchwiki.biligame.com/images/starengine/3/31/67ybp9rg6lhqjxxrgnt7dlu6v13vlko.png"
    };
    // 规定物品
    const Goods = {
        StarCoin: "https://patchwiki.biligame.com/images/starengine/5/58/282l0ethlcwxdocu9t3cavb15fm8wj6.png",
        StarDisc: "https://patchwiki.biligame.com/images/starengine/3/31/765u24zeim8u5p6fzfsdriflkspyhp1.png",
        Chip: "https://patchwiki.biligame.com/images/starengine/5/5a/nhw4m493c0ivoo7pt26aup97csnibnw.png",
        GreenBook: "https://patchwiki.biligame.com/images/starengine/3/31/i76k7k8ybr7jveerc99iur74z1jxran.png",
        BlueBook: "https://patchwiki.biligame.com/images/starengine/9/9a/q673aw2f00xvv49buszttbm700rjbgr.png",
        Progress: "https://patchwiki.biligame.com/images/starengine/6/64/k8amvg8mlf7klxtn0xifywyn0hbbedf.png",
    };

    // 这是Platform_2的奖励列表
    const PlatformTwo = [
        [Rarity.Blue, Goods.StarCoin, 10],
        [Rarity.Blue, Goods.StarCoin, 20],
        [Rarity.Green, Goods.GreenBook, 1],
        [Rarity.Green, Goods.GreenBook, 2],
        [Rarity.Green, Goods.GreenBook, 3],
        [Rarity.Purple, Goods.Progress, 20]
    ];
    // 这是Platform_3的奖励列表
    const PlatformThree = [
        [Rarity.Blue, Goods.StarCoin, 100],
        [Rarity.Purple, Goods.StarDisc, 10],
        [Rarity.Purple, Goods.StarDisc, 30],
        [Rarity.Blue, Goods.BlueBook, 1],
        [Rarity.Purple, Goods.Progress, 30]
    ];

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

            // 这是Platform_2
            if([1,4,5,8,10,11,13,15,17,19,20,22,23].includes(Steps % 24)){
                setTimeout(() => {
                    Reward.empty();
                    let RandomNum = Math.floor(Math.random() * PlatformTwo.length);
                    let Quailty = PlatformTwo[RandomNum][0];
                    let Item = PlatformTwo[RandomNum][1];
                    let Quantity = PlatformTwo[RandomNum][2];
                    Reward.append(`
                        <span style='font-size:40px;'>获得奖励</span>
                        <div style='width:80px; height:80px; overflow:clip; position: relative;'>
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Quailty}">
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Item}">
                            <img style='text-align:center;position: absolute;bottom: 0.25em;right: 0.25em;width:30px;' src="https://patchwiki.biligame.com/images/starengine/9/94/hy9u4mf71i30aty4lwdo0y81sp2wgoi.png">
                            <div style='text-align:center;position: absolute;bottom: 0.15em;right: 0.7em;font-size: 10px;color: #fff;font-weight: bold;'>×${Quantity}</div>
                        </div>`
                    );
                }, AnimateTime);
            }/* 这是Platform_3 */ else if([2,7,14,21].includes(Steps % 24)){
                setTimeout(() => {
                    Reward.empty();
                    let RandomNum = Math.floor(Math.random() * PlatformThree.length);
                    let Quailty = PlatformThree[RandomNum][0];
                    let Item = PlatformThree[RandomNum][1];
                    let Quantity = PlatformThree[RandomNum][2];
                    Reward.append(`
                        <span style='font-size:40px;'>获得奖励</span>
                        <div style='width:80px; height:80px; overflow:clip; position: relative;'>
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Quailty}">
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Item}">
                            <img style='text-align:center;position: absolute;bottom: 0.25em;right: 0.25em;width:30px;' src="https://patchwiki.biligame.com/images/starengine/9/94/hy9u4mf71i30aty4lwdo0y81sp2wgoi.png">
                            <div style='text-align:center;position: absolute;bottom: 0.15em;right: 0.7em;font-size: 10px;color: #fff;font-weight: bold;'>×${Quantity}</div>
                        </div>`
                    );
                }, AnimateTime);
            }/* 这是Platform_5 */ else if([3,9,16].includes(Steps % 24)){
                setTimeout(() => {
                    Reward.empty();
                    Reward.append(`
                        <span style='font-size:40px;'>获得奖励</span>
                        <div style='width:80px; height:80px; overflow:clip; position: relative;'>
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Rarity.Purple}">
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Goods.Chip}">
                            <img style='text-align:center;position: absolute;bottom: 0.25em;right: 0.25em;width:30px;' src="https://patchwiki.biligame.com/images/starengine/9/94/hy9u4mf71i30aty4lwdo0y81sp2wgoi.png">
                            <div style='text-align:center;position: absolute;bottom: 0.15em;right: 0.7em;font-size: 10px;color: #fff;font-weight: bold;'>×10</div>
                        </div>`
                    );
                }, AnimateTime);
            }/* 这是再动 */ else if([6, 12, 18].includes(Steps % 24)){
                setTimeout(() => {
                    Reward.empty();
                    Reward.append("<span style='font-size:40px;'>再行动一次！</span>");
                    Trigger.trigger('click');
                }, AnimateTime +  500);
            } else {
                setTimeout(() => {
                    Reward.empty();
                    Reward.append(`
                        <span style='font-size:40px;'>获得奖励</span>
                        <div style='width:80px; height:80px; overflow:clip; position: relative;'>
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Rarity.Purple}">
                            <img style='text-align:center;position: absolute;top: 0;left: 0;width:80px; height:80px;' src="${Goods.Progress}">
                            <img style='text-align:center;position: absolute;bottom: 0.25em;right: 0.25em;width:30px;' src="https://patchwiki.biligame.com/images/starengine/9/94/hy9u4mf71i30aty4lwdo0y81sp2wgoi.png">
                            <div style='text-align:center;position: absolute;bottom: 0.15em;right: 0.7em;font-size: 10px;color: #fff;font-weight: bold;'>×50</div>
                        </div>`
                    );
                }, AnimateTime);
            };

            // 计算完成了多少圈
            Laps = Math.floor(Steps/24);
            Lap.text(`第 ${Laps} 圈`);
        });
    });

    IdleAnimation();
})()