var map;

function getMap(map) {
    return map.split('\n').map(line => line.split(''));
}

function checkIsEnd(block, log) {
    const isOut = !(map[block.y] && map[block.y][block.x]);
    const isRepeat = log.has(block.y + ',' + block.x + ',' + block.direction);
    if (!isOut && !isRepeat) {
        log.add(block.y + ',' + block.x + ',' + block.direction);
    }
    return isOut || isRepeat;
}
// .
function empty(block, log) {
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
    getNext(nextBlock, log);
}
// \
function backslash(block, log) {
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
    getNext(nextBlock, log);
}
// /
function slash(block, log) {
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
    getNext(nextBlock, log);
}
// |
function vertical(block, log) {
    switch (block.direction) {
        case 'right':
        case 'left': {
            const upBlock = { ...block };
            const downBlock = { ...block };
            upBlock.direction = 'up';
            upBlock.y = block.y - 1;
            getNext(upBlock, log);
            downBlock.direction = 'down';
            downBlock.y = block.y + 1;
            getNext(downBlock, log);
            break;
        }
        case 'up': {
            const nextBlock = { ...block };
            nextBlock.y = block.y - 1;
            getNext(nextBlock, log);
            break;
        }
        case 'down': {
            const nextBlock = { ...block };
            nextBlock.y = block.y + 1;
            getNext(nextBlock, log);
            break;
        }
    }
}
// -
function hyphen(block, log) {
    switch (block.direction) {
        case 'right': {
            const nextBlock = { ...block };
            nextBlock.x = block.x + 1;
            getNext(nextBlock, log);
            break;
        }
        case 'left': {
            const nextBlock = { ...block };
            nextBlock.x = block.x - 1;
            getNext(nextBlock, log);
            break;
        }
        case 'up':
        case 'down': {
            const leftBlock = { ...block };
            const rightBlock = { ...block };
            leftBlock.direction = 'left';
            leftBlock.x = block.x - 1;
            getNext(leftBlock, log);
            rightBlock.direction = 'right';
            rightBlock.x = block.x + 1;
            getNext(rightBlock, log)
            break;
        }
    }
}

function getNext(block, log) {
    if (!checkIsEnd(block, log)) {
        switch (map[block.y][block.x]) {
            case '.':
                return empty(block, log);
            case '-':
                return hyphen(block, log);
            case '|':
                return vertical(block, log);
            case '\\':
                return backslash(block, log);
            case '/':
                return slash(block, log);
        }
    }
}

function start(input) {
    map = getMap(input);
    let max = 0;
    for (let x = 0; x < map[0].length; x++) {
        const firstBlock = {
            direction: "down",
            x,
            y: 0,
        };
        const log = new Set();
        getNext(firstBlock, log);
        const energized = new Set();
        log.forEach((item) => {
            const info = item.split(',');
            energized.add(info[0] + ',' + info[1]);
        });
        max = Math.max(max, energized.size)
    }
    for (let x = 0; x < map[0].length; x++) {
        const firstBlock = {
            direction: "up",
            x,
            y: map[0].length - 1,
        };
        const log = new Set();
        getNext(firstBlock, log);
        const energized = new Set();
        log.forEach((item) => {
            const info = item.split(',');
            energized.add(info[0] + ',' + info[1]);
        });
        max = Math.max(max, energized.size)
    }
    for (let y = 0; y < map.length; y++) {
        const firstBlock = {
            direction: "right",
            x: 0,
            y,
        };
        const log = new Set();
        getNext(firstBlock, log);
        const energized = new Set();
        log.forEach((item) => {
            const info = item.split(',');
            energized.add(info[0] + ',' + info[1]);
        });
        max = Math.max(max, energized.size)
    }
    for (let y = 0; y < map.length; y++) {
        const firstBlock = {
            direction: "left",
            x: map[0].length - 1,
            y,
        };
        const log = new Set();
        getNext(firstBlock, log);
        const energized = new Set();
        log.forEach((item) => {
            const info = item.split(',');
            energized.add(info[0] + ',' + info[1]);
        });
        max = Math.max(max, energized.size)
    }
    console.log('max', max)
}

start(input)