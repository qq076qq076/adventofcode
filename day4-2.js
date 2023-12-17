function getWiningNumber(text) {
    const pattern = /:(.*?)\|/;
    const match = text.match(pattern);
    return match[1].trim().split(/\s+/).map(Number);
}

function getHaveNumber(text) {
    return new Set(text.split('|')[1].trim().split(/\s+/).map(Number));
}

function getWinCards(line) {
    const winingList = getWiningNumber(line);
    const haveSet = getHaveNumber(line);
    return winingList.filter((winItem) => haveSet.has(winItem)).length;
}

function getAllCards(text) {
    const winCard = [];
    text.split('\n').forEach((line, index) => {
        winCard[index] = winCard[index] || 1;
        const lineWinCount = getWinCards(line);
        for (let i = 1; i <= lineWinCount; i++) {
            winCard[index + i] = (winCard[index + i] || 1) + winCard[index]
        }
    });
    return winCard.reduce((total, count) => total + count, 0);
}