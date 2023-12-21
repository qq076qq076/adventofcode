var input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;


function start(input) {
    const mapType = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity'];

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
            console.log('mapLine', mapLine, number)
            if (!mapLine || (mapLine[1] + mapLine[2] < number)) {
                return number;
            } else {
                console.log('number', number - mapLine[1] + mapLine[0])
                return number - mapLine[1] + mapLine[0];
            }
        }
    });
    return seedList.reduce((min, seed) => {
        const result = mapList.reduce((prev, fn) => fn(prev), seed);
        console.log('result',result)
        return Math.min(min, result);
    }, Infinity);
}

console.log(start(input));