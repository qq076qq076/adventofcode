function getWiningNumber(text) {
    const pattern = /:(.*?)\|/;
    const match = text.match(pattern);
    return match[1].trim().split(/\s+/).map(Number);
}

function getHaveNumber(text) {
    return new Set(text.split('|')[1].trim().split(/\s+/).map(Number));
}

function getLinePoint(line) {
    const winingList = getWiningNumber(line);
    const haveSet = getHaveNumber(line);
    const count = winingList.filter((winItem) => haveSet.has(winItem)).length;
    if (count > 0) {
        return Math.pow(2, count - 1);
    } else {
        return 0;
    }
}

function getPoint(text) {
    return text.split('\n').reduce((total, line) => {
        return total + getLinePoint(line)
    }, 0)
}