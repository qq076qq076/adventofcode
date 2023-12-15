function getNumberList(line, index) {
    return line.match(/\b\d+\b/g)?.map(match => ({
        number: parseInt(match),
        index,
        start: line.indexOf(match),
        end: line.indexOf(match) + match.length
    })) || [];
}

function hasSymbol(numberItem, str) {
    const pattern = /[^0-9.]/g;
    const start = Math.max(numberItem.start - 1, 0);
    const end = Math.min(numberItem.end + 1, str.length);
    return pattern.test(str.slice(start, end));
}

function isPartNumber(numberItem, schematicList) {
    let isLastLineValid = false, isCurrentLineValid = false, isNextLineValid = false;
    if (numberItem.index > 0) {
        isLastLineValid = hasSymbol(numberItem, schematicList[numberItem.index - 1]);
    }
    isCurrentLineValid = hasSymbol(numberItem, schematicList[numberItem.index]);
    if (numberItem.index < schematicList.length - 1) {
        isNextLineValid = hasSymbol(numberItem, schematicList[numberItem.index + 1]);
    }
    return isLastLineValid || isCurrentLineValid || isNextLineValid;
}

function res(str) {
    const schematicList = str.split('\n');
    return schematicList.reduce((sum, curr, currIndex) => {
        const total = getNumberList(curr, currIndex)
            .filter((numberItem) => {
                const result = isPartNumber(numberItem, schematicList)
                console.log('numberItem', numberItem.number, 'result:', result)
                return result;
            })
            .reduce((lineSum, numberItem) => lineSum + numberItem.number, 0);
        console.log('total',total)
        console.log('sum',sum + total)
        console.log('-----------')
        return sum + total;
    }, 0)
}

var a = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
console.log(res(a))