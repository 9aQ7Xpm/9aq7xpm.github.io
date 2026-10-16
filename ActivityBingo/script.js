const cellsWrapper = document.querySelector('.ActBingo-CellsWrapper');
const cellsBtn = document.querySelector('#CellsTxt');

const rewardJson = {
    '1' : [
        ['StarCoin', '30'], ['StarCoin', '30'], ['StarCoin', '30'], ['Gift_77006', '1'],
        ['Gift_77003', '1'], ['Gift_77003', '1'], ['Gift_77003', '1'], ['Gift_77007', '1'],
        ['BlueBook', '1'], ['BlueBook', '1'], ['BlueBook', '1'], ['Gift_77008', '1'],
        ['Gift_77009', '1'], ['Gift_77010', '1'], ['Gacha_90001', '1'],['Gacha_90002', '1']
    ],
    '2' : [
        ['StarCoin', '30'], ['StarCoin', '30'], ['StarCoin', '30'], ['Gift_77006', '1'],
        ['Gift_77003', '1'], ['Gift_77003', '1'], ['Gift_77003', '1'], ['Gift_77007', '1'],
        ['BlueBook', '1'], ['BlueBook', '1'], ['BlueBook', '1'], ['Gift_77008', '1'],
        ['Gift_77009', '1'], ['Gift_77010', '1'], ['Gacha_90001', '1'],['Gacha_90002', '1']
    ],
    '3' : [
        ['StarCoin', '60'], ['StarCoin', '60'], ['StarCoin', '60'], ['Gift_77011', '1'],
        ['Gift_77009', '1'], ['Gift_77009', '1'], ['Gift_77009', '1'], ['Gift_77012', '1'],
        ['PurpleBook', '1'], ['PurpleBook', '1'], ['PurpleBook', '1'], ['Gift_77013', '1'],
        ['Gift_77014', '1'], ['Gift_77015', '1'], ['Gacha_90001', '1'], ['Gacha_90002', '1']
    ],
    '4' : [
        ['StarCoin', '60'], ['StarCoin', '60'], ['StarCoin', '60'], ['Gift_77011', '1'],
        ['Gift_77009', '1'], ['Gift_77009', '1'], ['Gift_77009', '1'], ['Gift_77012', '1'],
        ['PurpleBook', '1'], ['PurpleBook', '1'], ['PurpleBook', '1'], ['Gift_77013', '1'],
        ['Gift_77014', '1'], ['Gift_77015', '1'], ['Gacha_90001', '1'], ['Gacha_90002', '1']
    ],
    '5' : [
        ['StarCoin', '100'], ['StarCoin', '100'], ['StarCoin', '100'], ['StarDisc', '50'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['StarDisc', '30'], ['Chip', '100'],
        ['StarDisc', '30'], ['Chip', '50'], ['Chip', '50'], ['PurpleChest', '1'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['Gacha_90001', '1'], ['Gacha_90002', '1']
    ],
    '6' : [
        ['StarCoin', '100'], ['StarCoin', '100'], ['StarCoin', '100'], ['StarDisc', '50'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['StarDisc', '30'], ['Chip', '100'],
        ['StarDisc', '30'], ['Chip', '50'], ['Chip', '50'], ['PurpleChest', '1'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['Gacha_90001', '1'], ['Gacha_90002', '1']
    ],
    '7' : [
        ['StarCoin', '100'], ['StarCoin', '100'], ['StarCoin', '100'], ['StarDisc', '50'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['StarDisc', '30'], ['Chip', '100'],
        ['StarDisc', '30'], ['Chip', '50'], ['Chip', '50'], ['PurpleChest', '1'],
        ['PurpleChest', '1'], ['PurpleChest', '1'], ['Gacha_90001', '1'], ['Gacha_90002', '1']
    ]
};
const srcJson = {
    'StarCoin' : 'https://patchwiki.biligame.com/images/starengine/5/58/282l0ethlcwxdocu9t3cavb15fm8wj6.png',
    'StarDisc' : 'https://patchwiki.biligame.com/images/starengine/3/31/765u24zeim8u5p6fzfsdriflkspyhp1.png',
    'Chip' : 'https://patchwiki.biligame.com/images/starengine/5/5a/nhw4m493c0ivoo7pt26aup97csnibnw.png',
    'Gacha_90001' : 'https://patchwiki.biligame.com/images/starengine/3/3f/nqvqoyq27b15caca8xzv1ulh26q8u4l.png',
    'Gacha_90002' : 'https://patchwiki.biligame.com/images/starengine/6/6d/9zru4yt5a7z54luqaltjjy1jrsq2biw.png',
    'PurpleChest' : 'https://patchwiki.biligame.com/images/starengine/e/e3/9qj2v32wtx441ed7loxacbte5rdom4b.png',
    'BlueBook' : 'https://patchwiki.biligame.com/images/starengine/3/31/i76k7k8ybr7jveerc99iur74z1jxran.png',
    'PurpleBook' : 'https://patchwiki.biligame.com/images/starengine/9/9a/q673aw2f00xvv49buszttbm700rjbgr.png',
    'Gift_77003' : 'https://patchwiki.biligame.com/images/starengine/d/dd/6vjnqrf7p06ie1yklnsxkwrfquku023.png',
    'Gift_77006' : 'https://patchwiki.biligame.com/images/starengine/2/20/15sclduha42qmj5mreq5wcho7wl6zqs.png',
    'Gift_77007' : 'https://patchwiki.biligame.com/images/starengine/2/28/cy1kz1fen7umngi79p06dpqk5o1780d.png',
    'Gift_77008' : 'https://patchwiki.biligame.com/images/starengine/0/06/4kknv8jp2942dvv20djk4nr1iof4d6q.png',
    'Gift_77009' : 'https://patchwiki.biligame.com/images/starengine/9/9d/jo05ik6gt2krn01qmkok1p2iw5e1g60.png',
    'Gift_77010' : 'https://patchwiki.biligame.com/images/starengine/8/83/7m8pwtgci7pe0hakkmem8oflrxo13j7.png',
    'Gift_77011' : 'https://patchwiki.biligame.com/images/starengine/e/ee/6p6bjfallts6uwv5n6a4wtzum6xkiws.png',
    'Gift_77012' : 'https://patchwiki.biligame.com/images/starengine/4/4f/ql9lj4xy21jojnurn2a4dwgwpev3a4j.png',
    'Gift_77013' : 'https://patchwiki.biligame.com/images/starengine/9/95/ig0vkr6pailawcdwcpxiw089t9s1jy9.png',
    'Gift_77014' : 'https://patchwiki.biligame.com/images/starengine/8/8c/hnxrwypne0jy91arr7j23hnsxbxit3c.png',
    'Gift_77015' : 'https://patchwiki.biligame.com/images/starengine/8/8a/g72n2paz11n0ne7jx6coy4uotwa3f6f.png'
}

function init() {
    const appendDiv = `
    <div class='BingoCells' style='position:relative;'>
        <img alt src='https://patchwiki.biligame.com/images/starengine/e/e7/h3m1eh0v7brmeiixpksylz6zunchtfo.png' width='70px' height='70px'>
        <span style='position:absolute;bottom:1px;font-size:150%;font-family:"荆南波波黑";color:white;-webkit-text-stroke: 1px black;'></span>
    </div>
    `
    for (let i = 0; i < 16; i++){
        cellsWrapper.innerHTML += appendDiv;
    }

    cellsBtn.innerHTML = `当前进度&nbsp;1/7`;
}

init();

const images = document.querySelectorAll('.BingoCells img');
const spans = document.querySelectorAll('.BingoCells span');
for (let i = 0; i < 16; i++) {
    const item = rewardJson[1][i][0];
    const image = images[i];
    image.src = srcJson[item];
    const span = spans[i];
    span.innerHTML = `x${rewardJson[1][i][1]}`;
}
let times = 0;
cellsBtn.addEventListener('click', () => {
    times++
    times = times % 7;
    cellsBtn.innerHTML = `当前进度&nbsp;${times+1}/7`;
    for (let i = 0; i < 16; i++) {
        const item = rewardJson[times+1][i][0];
        const image = images[i];
        image.src = srcJson[item];
        const span = spans[i];
        span.innerHTML = `x${rewardJson[times+1][i][1]}`;
    }
})