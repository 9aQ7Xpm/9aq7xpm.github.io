const ranMapButton = document.querySelector("#Start-Map-Button");
const mapImg = document.querySelector(".Map-Container img");
const mapText = document.querySelector(".Map-Container span")
const mapHashMap = {
    "007" : "星趴·梦想号",
    "008" : "御魂庆典",
    "010" : "水乡古镇",
    "012" : "魔法学院",
    "013" : "龙宫游乐园",
    "014" : "幽魂暗巷",
    "015" : "园林中庭",
    "016" : "异变图书馆"
}

async function getMapFileURL(ID = '007') {
    const filename = 'UT_MapScene_' + `${ID}` + '.png';
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

function randomMapId() {
    const mapLength = Object.keys(mapHashMap).length;
    let num = Math.floor(Math.random() * mapLength);
    let result = Object.keys(mapHashMap)[num];
    return result
}

async function randomMap() {
    let mapId = randomMapId();

    getMapFileURL(mapId)
    .then(res => {
        mapImg.src = res;
        mapText.innerHTML = `本次随机到的地图为：${mapHashMap[mapId]}`;
    })
}

let islockedMap = false;
async function clickMapEvent() {
    if (islockedMap) {
        console.log('Locked.');
        return
    }
    islockedMap = true;
    ranMapButton.style.filter = 'grayscale(100%)';

    try{
        await randomMap();
    } finally {
        islockedMap = false;
        ranMapButton.style.filter = 'grayscale(0%)';
    }
}

ranMapButton.addEventListener('click', () => {
    clickMapEvent();
})
