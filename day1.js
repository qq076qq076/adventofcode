a.split('\n').reduce((pre, crr) => {
    let first, end;
    let str = crr.replace(/eight/ig, 'e8ight')
        .replace(/two/ig, 't2wo')
        .replace(/one/ig, 'o1ne')
        .replace(/three/ig, 't3hree')
        .replace(/five/ig, 'f5ive')
        .replace(/four/ig, 'f4our')
        .replace(/six/ig, 's6ix')
        .replace(/seven/ig, 's7even')
        .replace(/nine/ig, 'n9ine')
    console.log(str)
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i]) && first === undefined) {
            first = +str[i];
        }
        if (!isNaN(str[str.length - 1 - i]) && end === undefined) {
            end = +str[str.length - 1 - i];
        }
    }
    console.log(first * 10 + end)
    return pre + first * 10 + end;
}, 0)