(function() {
    const changeBgBtn = document.querySelector('#ChangeBackground-Button');
    let bgtimes = 1; 
    let bgUrl = 0;

    function ChangeBackground() {
        const bgMap = {
            '0' : 'https://patchwiki.biligame.com/images/starengine/6/64/qz9xiyg1avff108fxfy1bed3lme69d2.png',
            '1' : 'https://patchwiki.biligame.com/images/starengine/6/6b/7de84oxc1tuyjdas7a9ax5fuqpk3h4b.png',
            '2' : 'https://patchwiki.biligame.com/images/starengine/b/be/qkylc8siom8mjiz17ewduaagm4pwu8k.jpg',
            '3' : 'https://patchwiki.biligame.com/images/starengine/7/77/0zwfdyufo7xbyss4n8i41sjy5ao64kp.png',
            '4' : 'https://patchwiki.biligame.com/images/starengine/8/8f/hhoczjhsffdefpmahyfcd3oeok81e15.png'
        }
        bgUrl = (bgtimes++) % Object.keys(bgMap).length;
        console.log(bgUrl);
        console.log(bgMap[bgUrl]);
        document.body.style.background = `url(${bgMap[bgUrl]})
            no-repeat fixed
            50%
            0`;
        document.body.style.backgroundSize = 'cover';
    }

    changeBgBtn.addEventListener('click', () => {
        ChangeBackground()
    })
})()