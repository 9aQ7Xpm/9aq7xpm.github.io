const ranButton = document.querySelector('#Start-Button');
const charaContainer = document.querySelector('#Character-Container'); 
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
    "304" : "多萝西·海兹"
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
    const choice = rand(0, 1);
    let result = choice === 0 ? rand(101, 129) : rand(301, 304);
    return String(result)
}

function generateCharacterBox(src = null, ID = undefined, seat = -1){
    const altText = "Here happened some bugs. Plz connect with the admin 9aQ7Xpm!"
    const number2Chinese = {
        "-1" : "undefined",
        "0" : "一",
        "1" : "二",
        "2" : "三",
        "3" : "四"
    }
    charaContainer.innerHTML += `
        <div class="Character">
            <img src="${src}" alt = "${altText} Your Character is ${charaMap[ID]}">
            <span class="characterText">您的座次为${number2Chinese[seat]}号位</span>
            <span class="characterText">您的角色为${charaMap[ID]}</span>
        </div>
    `;
    console.log(`Generate charaContainer_${seat} succeeded.`)
}

function cleanUp(){
    charaContainer.innerHTML = '';
    console.log('Make cleanup succeed.');
}

async function init() {
    let examineMap = []
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
            generateCharacterBox(res, Number(characterID), i);
        })
        .catch(err => {
            console.log('Error:' + err.message);
        })
    }
    console.log('Job finished.');
}

ranButton.addEventListener('click', () => {
    init();
})