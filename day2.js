const res = {
    red: 12,
    blue: 14,
    green: 13
};
a.split('\n').reduce((pre, cur, curI) => {
    const patternG = /\b(\d+) green\b/g;
    const patternR = /\b(\d+) red\b/g;
    const patternB = /\b(\d+) blue\b/g;
    let r = 0, g = 0, b = 0;
    const setList = cur.substring(8).split(';');
    for (let i = 0; i < setList.length; i++) {
        let set = setList[i];
        const G = parseInt(set.match(patternG)) || 0;
        const R = parseInt(set.match(patternR)) || 0;
        const B = parseInt(set.match(patternB)) || 0;
        r = Math.max(r, R);
        b = Math.max(b, B);
        g = Math.max(g, G);
    }
    console.log('part sum:', r * b * g,)
    return r * b * g + pre
}, 0)