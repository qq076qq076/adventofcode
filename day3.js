function getNumberList(line, index) {
    const list = [];
    line.match(/\b\d+\b/g)?.forEach((match, matchIndex) => {
        const lastEnd = matchIndex > 0 ? list[matchIndex - 1].end : 0;
        const start = line.indexOf(match, lastEnd);
        list.push({
            number: parseInt(match),
            index,
            start,
            end: start + match.length
        })
    });
    return list;
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
            .filter((numberItem) => isPartNumber(numberItem, schematicList))
            .reduce((lineSum, numberItem) => lineSum + numberItem.number, 0);
        return sum + total;
    }, 0)
}