

var input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

function getMap(input) {
    return input.split('\n')
        .map((line) => line.split(''))
}

function render(result, way) {
    let html = '';
    for (let y = 0; y < result.length; y++) {
        html += '<div class="row">'
        for (let x = 0; x < result[y].length; x++) {
            const isWar = way.includes(x + ',' + y)
            html += `<div class="block ${isWar ? 'way' : ''}">${result[y][x]}</div>`;
        }
        html += '</div>';
    }
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = html;
}

function getNodeList(map) {
    const nodeList = {};
    map.forEach((line, y) => {
        line.forEach((number, x) => {
            if (!nodeList[x + ',' + y]) {
                nodeList[x + ',' + y] = [];
            }
            if (map[y - 1] && map[y - 1][x]) {
                nodeList[x + ',' + y].push({
                    to: x + ',' + (y - 1),
                    count: +map[y - 1][x],
                    d: 'U'
                });
            }
            if (map[y + 1] && map[y + 1][x]) {
                nodeList[x + ',' + y].push({
                    to: x + ',' + (y + 1),
                    count: +map[y + 1][x],
                    d: 'D'
                });
            }
            if (map[y] && map[y][x - 1]) {
                nodeList[x + ',' + y].push({
                    to: (x - 1) + ',' + y,
                    count: +map[y][x - 1],
                    d: 'L'
                });
            }
            if (map[y] && map[y][x + 1]) {
                nodeList[x + ',' + y].push({
                    to: (x + 1) + ',' + y,
                    count: +map[y][x + 1],
                    d: 'R'
                });
            }

        });
    });
    return nodeList;
}

function prepareShortestList(map) {
    const shortest = {};
    map.forEach((line, y) => {
        line.forEach((number, x) => {
            shortest[x + ',' + y] = {
                previous: null,
                count: Infinity,
                check: false,
            }
        });
    });
    return shortest;
}

// function checkPoint(nodeList, shortest, point) {
//     console.log(point)
//     nodeList[point].forEach((node) => {
//         console.log('node', node)
//         console.log('shortest[point]', shortest[point])
//         console.log('shortest[node.to]', shortest[node.to])
//         console.log('shortest[node.to]', node.count + shortest[point].count < shortest[node.to].count)
//         if (node.count + shortest[point].count < shortest[node.to]) {
//             shortest[node.to].count = node.count + shortest[point].count;
//             shortest[node.to].previous = node.to
//         }
//     });
//     return shortest;
// }

function minNoCheckList(shortest) {
    let minPointTo;
    let minCount = Infinity;
    Object.keys(shortest).forEach((key) => {
        if (!shortest[key].check && minCount > shortest[key].count) {
            minPointTo = key;
        }
    });
    return minPointTo;
}

function start(map) {
    const nodeList = getNodeList(map);
    console.log('nodeList', nodeList);
    let shortest = prepareShortestList(map);
    shortest['0,0'].count = 0;
    while (minNode = minNoCheckList(shortest)) {
        shortest[minNode].check = true;
        nodeList[minNode].forEach((node) => {
            if ((node.count + shortest[minNode].count) < shortest[node.to].count) {
                shortest[node.to].count = node.count + shortest[minNode].count;
                shortest[node.to].previous = minNode
            }
        });
    }
    console.log('shortest', shortest)
    const way = [];
    let point = '12,12';
    while (shortest[point].previous !== '0,0') {
        point = shortest[point].previous
        way.push(point)
    }
    console.log('way', way)
    render(map, way)
}

console.log(start(getMap(input)))