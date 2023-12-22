function start(input) {
    const mapType = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location'];

    const seedsPattern = /seeds: (.+)/;
    const seedsMatch = input.match(seedsPattern);
    const seedList = seedsMatch[1].split(' ').map(item => parseInt(item));
    const mapList = mapType.map((type) => {
        const pattern = new RegExp(`${type} map:\n([\\s\\S]+?)\n\n`);
        const match = input.match(pattern);
        const list = match[1].split('\n').map((line) => line.split(' ').map(item => parseInt(item)));
        list.sort((a, b) => b[1] - a[1]);
        return function (number) {
            const mapLine = list.find((map) => map[1] <= number);
            // console.log('mapLine', mapLine, number)
            if (!mapLine || (mapLine[1] + mapLine[2] < number)) {
                return number;
            } else {
                // console.log('number', number - mapLine[1] + mapLine[0])
                return number - mapLine[1] + mapLine[0];
            }
        }
    });
    return seedList.reduce((min, seed) => {
        const result = mapList.reduce((prev, fn) => fn(prev), seed);
        console.log('result', result)
        return Math.min(min, result);
    }, Infinity);
}

console.log(start(input));