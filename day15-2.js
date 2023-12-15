function getBox(str) {
    return str.split('').reduce(function (lineSum = 0, chart) {
        if (chart !== ',') {
            const ascii = chart.charCodeAt();
            lineSum = lineSum + ascii;
            return (lineSum * 17) % 256;
        } else {
            return lineSum;
        }
    }, 0)
}

function equal(line, boxList) {
    const label = line.split('=')[0];
    const box = getBox(label);
    if (boxList[box] && boxList[box].length) {
        const i = boxList[box].findIndex((item) => item.includes(label));
        if (i !== -1) {
            boxList[box][i] = line;
        } else {
            boxList[box].push(line);
        }
    } else {
        boxList[box] = [line];
    }
}

function deleteItem(line, boxList) {
    const label = line.slice(0, -1);
    const box = getBox(label);
    if (boxList[box] && boxList[box].length) {
        const i = boxList[box].findIndex((item) => item.includes(label));
        if (i !== -1) {
            boxList[box].splice(i, 1);
        }
    }
}
const getBoxList = (str) => str.split(',').reduce((boxList, line) => {
    if (line.includes('=')) {
        equal(line, boxList);
    } else if (line.includes('-')) {
        deleteItem(line, boxList);
    }
    return boxList;
}, []);


const getFocusingPower = (str) => {
    return getBoxList(str).reduce((sum, box, boxIndex) => {
        return sum + box.reduce((lensSum, slot, slotIndex) => {
            const boxN = boxIndex + 1;
            const slotN = slotIndex + 1;
            const focalLength = +slot.split('=')[1];
            return lensSum + (boxN * slotN * focalLength);
        }, 0)
    }
        , 0)
}
console.log(getFocusingPower('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'))