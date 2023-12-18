var map;
var log = new Set();

function getMap(map) {
    return map.split('\n').map(line => line.split(''));
}

function checkIsEnd(block) {
    const isOut = !(map[block.y] && map[block.y][block.x]);
    const isRepeat = log.has(block.y + ',' + block.x + ',' + block.direction);
    if (!isOut && !isRepeat) {
        log.add(block.y + ',' + block.x + ',' + block.direction);
    }
    return isOut || isRepeat;
}
// .
function empty(block) {
    const nextBlock = { ...block };
    switch (block.direction) {
        case 'right':
            nextBlock.x = block.x + 1;
            break;
        case 'left':
            nextBlock.x = block.x - 1;
            break;
        case 'up':
            nextBlock.y = block.y - 1;
            break;
        case 'down':
            nextBlock.y = block.y + 1;
            break;
    }
    getNext(nextBlock);
}
// \
function backslash(block) {
    const nextBlock = { ...block };
    switch (block.direction) {
        case 'right':
            nextBlock.direction = 'down';
            nextBlock.y = block.y + 1;
            break;
        case 'left':
            nextBlock.direction = 'up';
            nextBlock.y = block.y - 1;
            break;
        case 'up':
            nextBlock.direction = 'left';
            nextBlock.x = block.x - 1;
            break;
        case 'down':
            nextBlock.direction = 'right';
            nextBlock.x = block.x + 1;
            break;
    }
    getNext(nextBlock);
}
// /
function slash(block) {
    const nextBlock = { ...block };
    switch (block.direction) {
        case 'right':
            nextBlock.direction = 'up';
            nextBlock.y = block.y - 1;
            break;
        case 'left':
            nextBlock.direction = 'down';
            nextBlock.y = block.y + 1;
            break;
        case 'up':
            nextBlock.direction = 'right';
            nextBlock.x = block.x + 1;
            break;
        case 'down':
            nextBlock.direction = 'left';
            nextBlock.x = block.x - 1;
            break;
    }
    getNext(nextBlock);
}
// |
function vertical(block) {
    switch (block.direction) {
        case 'right':
        case 'left': {
            const upBlock = { ...block };
            const downBlock = { ...block };
            upBlock.direction = 'up';
            upBlock.y = block.y - 1;
            getNext(upBlock);
            downBlock.direction = 'down';
            downBlock.y = block.y + 1;
            getNext(downBlock);
            break;
        }
        case 'up': {
            const nextBlock = { ...block };
            nextBlock.y = block.y - 1;
            getNext(nextBlock);
            break;
        }
        case 'down': {
            const nextBlock = { ...block };
            nextBlock.y = block.y + 1;
            getNext(nextBlock);
            break;
        }
    }
}
// -
function hyphen(block) {
    switch (block.direction) {
        case 'right': {
            const nextBlock = { ...block };
            nextBlock.x = block.x + 1;
            getNext(nextBlock);
            break;
        }
        case 'left': {
            const nextBlock = { ...block };
            nextBlock.x = block.x - 1;
            getNext(nextBlock);
            break;
        }
        case 'up':
        case 'down': {
            const leftBlock = { ...block };
            const rightBlock = { ...block };
            leftBlock.direction = 'left';
            leftBlock.x = block.x - 1;
            getNext(leftBlock);
            rightBlock.direction = 'right';
            rightBlock.x = block.x + 1;
            getNext(rightBlock)
            break;
        }
    }
}

function getNext(block) {
    if (!checkIsEnd(block)) {
        switch (map[block.y][block.x]) {
            case '.':
                return empty(block);
            case '-':
                return hyphen(block);
            case '|':
                return vertical(block);
            case '\\':
                return backslash(block);
            case '/':
                return slash(block);
        }
    }
}

function start(input) {
    map = getMap(input);
    var firstBlock = {
        direction: "right",
        x: 0,
        y: 0,
    };
    getNext(firstBlock);
    console.log('log', log)
    const energized = new Set();
    log.forEach((item) => {
        const info = item.split(',');
        energized.add(info[0] + ',' + info[1]);
    });
    console.log('energized', energized.size)
}

var input = `.|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....\n`;
start(input)