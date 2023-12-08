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
    const setList = cur.split(';');
    for (let i = 0; i < setList.length - 1; i++) {
        let set = setList[i];
        const G = parseInt(set.match(patternG)) || 0;
        const R = parseInt(set.match(patternR)) || 0;
        const B = parseInt(set.match(patternB)) || 0;
        console.log(R,G,B)
        isPass = G <= 13 && R <= 12 && B <= 14;
        if (!isPass) {
            break;
        }
    }
    console.log('isPass:', isPass, 'index;', curI)
    return (isPass) ? curI + pre : pre
}, 0)