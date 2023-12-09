const res = {
    red: 12,
    blue: 14,
    green: 13
};
a.split('\n').reduce((pre, cur, curI) => {
    const patternG = /\b(\d+) green\b/g;
    const patternR = /\b(\d+) red\b/g;
    const patternB = /\b(\d+) blue\b/g;
    let isPass = true;
    const setList = cur.substring(8).split(';');
    for (let i = 0; i < setList.length; i++) {
        let set = setList[i];
        const G = parseInt(set.match(patternG)) || 0;
        const R = parseInt(set.match(patternR)) || 0;
        const B = parseInt(set.match(patternB)) || 0;
        isPass = G <= 13 && R <= 12 && B <= 14;
        if (!isPass) {
            break;
        }
    }
    console.log('isPass:', isPass, 'Game;', curI + 1, 'total:', (isPass) ? curI + 1 + pre : pre)
    return (isPass) ? curI + 1 + pre : pre
}, 0)