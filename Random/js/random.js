const ranButton = document.querySelector('#Start-Button');
const charaContainer = document.querySelector('#Character-Container'); 
const charaImg = document.querySelectorAll('.Character-Img');
const playerText = document.querySelectorAll('.Player-Character');
// certain way which is more clever should be used to replace such an idiot hash map i think
// wtf can someone type such a long && useless one!?
const charaMap = {
    "101" : "帕露南",
    "102" : "伟大的蒸蛋大人",
    "103" : "阿兰娜",
    "104" : "小町",
    "105" : "派德曼",
    "106" : "帕帕拉",
    "107" : "恋",
    "108" : "米米",
    "109" : "Z3000",
    "110" : "潘大猛",
    "111" : "墨影",
    "112" : "璐璐",
    "113" : "姬梦枫",
    "114" : "蓝海晴",
    "115" : "美咲",
    "116" : "娜蒂斯",
    "117" : "茉莉",
    "118" : "阿尔",
    "119" : "星魅琉华",
    "120" : "南希露",
    "121" : "凛",
    "122" : "梅加斯",
    "123" : "姬梦朝",
    "124" : "照",
    "125" : "摩西",
    "126" : "真梦梓",
    "127" : "邦妮",
    "128" : "玲玲",
    "129" : "赛克斯",
    "301" : "超绝最可爱天使酱",
    "302" : "主播女孩",
    "303" : "吉尔·斯汀雷",
    "304" : "多萝西·海兹",
    "305" : "远野汉娜",
    "306" : "橘雪莉"
};

// Provide Account-Head Photo
async function getFileURL(ID = '102') {
    const filename = 'UT_Item_Hero_' + `${ID}` + '.png';
    const apiURL = 'https://wiki.biligame.com/starengine/api.php' +
        '?action=query' +
        '&titles=File:' + encodeURIComponent(filename) +
        '&prop=imageinfo' +
        '&iiprop=url' +
        '&format=json' +
        '&origin=*';
    return fetch(apiURL)
        .then(res => res.json())
        .then((data) => {
            const pages = data.query.pages;
            for (let pageId in pages) {
                const page = pages[pageId];
                if (page.imageinfo && page.imageinfo[0]) {
                    return page.imageinfo[0].url;
                }
            }
            // throw new Error('No imageinfo for file: ' + filename)
            return null;
        }
    )
}

function randomNumber2string(){
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const choice = rand(1, 35);
    let result = choice <= 29 ? rand(101, 129) : rand(301, 306);
    return String(result)
}

function generateCharacter(src = null, ID = undefined, seat = -1){
    const altText = "If you see this text, here might happen some bugs. Plz connect with the admin 9aQ7Xpm!"
    charaImg[seat].src = src;
    playerText[seat].innerHTML = `您的角色为${charaMap[ID]}`;
    console.log(`Generate Character Container ${seat} succeeded.`)
}

function cleanUp(){
    for (const text of playerText) {
        text.innerHTML = '正在随机角色……';
    }
    console.log('Make cleanup succeed.');
}

async function randomCharacter() {
    let examineMap = [];
    let characterSrcMap = {};
    let times = 0;
    cleanUp();
    for (let i = 0; i < 4; i++) {
        let characterID = "0";
        while (true){
            characterID = randomNumber2string();
            if (characterID !== "0" && !(examineMap.includes(characterID))) {
                examineMap.push(characterID);
                break
            }
        }
        await getFileURL(characterID)
        .then(res => {
            if (!res) throw new Error('Failed to fetch.');
            characterSrcMap[characterID] = res;
        })
        .catch(err => {
            console.log('Error:' + err.message);
        })
    }
    console.log(characterSrcMap);

    for (let key in characterSrcMap) {
        generateCharacter(characterSrcMap[key], key, times++);
    }

    console.log('Job finished.');
}

async function clickEvent() {
    if (islocked) {
        console.log('Locked.');
        return
    }
    islocked = true;
    ranButton.style.filter = 'grayscale(100%)';

    try{
        await randomCharacter();
    } finally {
        islocked = false;
        ranButton.style.filter = 'grayscale(0%)';
    }
}

let islocked = false;

ranButton.addEventListener('click', () => {
    clickEvent();
})