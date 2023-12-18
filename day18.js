var input;

function getDigPlan(input) {
    return input.split('\n')
        .map((line) => {
            const info = line.split(' ')
            return {
                direction: info[0],
                count: +info[1],
                color: info[2]
            }
        })
}

function toNext(digPlan, position, result) {
    if (!digPlan[0].count) {
        digPlan.shift();
    }
    if (!digPlan.length) {
        return;
    }
    switch (digPlan[0].direction) {
        case 'U':
            position.y = position.y - 1;
            break;
        case 'D':
            position.y = position.y + 1;
            break;
        case 'L':
            position.x = position.x - 1;
            break;
        case 'R':
            position.x = position.x + 1;
            break;
    }
    digPlan[0].count = digPlan[0].count - 1;
    dig(digPlan, position, result)
}

function dig(digPlan, position, result) {
    if (!result[position.y]) {
        result[position.y] = [];
    }
    result[position.y][position.x] = '#';
    toNext(digPlan, position, result);
}

function start(input) {
    const digPlan = getDigPlan(input);
    const result = [];
    let position = { x: 0, y: 0 };
    dig(digPlan, position, result);
    result.forEach((line, y) => {
        let isDig = false;
        for (let x = 0; x < line.length - 1; x++) {
            if (isDig && line[x] === '' && line[x] != line[x + 1]) {
                isDig = false;
            }
            if (line[x] === '#' && line[x] != line[x + 1]) {
                isDig = true;
            }
            if (isDig) {
                line[x] = '#';
            }
        }
    })
    console.log(result.map((line) => line.join('')).join('').length)
}

var input = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;
start(input)