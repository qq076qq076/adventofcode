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
56 93 4

`;

function start(input) {
    const mapType = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location'];

    const seedsPattern = /seeds: (.+)/;
    const seedsMatch = input.match(seedsPattern);
    const seedSource = seedsMatch[1].split(' ').map(Number);
    const map = {};
    mapType.forEach((type) => {
        const pattern = new RegExp(`${type} map:\n([\\s\\S]+?)\n\n`);
        const match = input.match(pattern);
        const list = match[1].split('\n').map((line) => line.split(' ').map(Number));
        list.forEach((line) => {
            for (let i = 0; i < line[2]; i++) {
                map[line[1] + i] = line[0] + i;
            }
        });
    });
    let min = Infinity;
    // for (let i = 0; i < seedSource.length; i = i + 2) {
    //     for (let j = 0; j < seedSource[i + 1]; j++) {
    //         console.log('seedSource[i] + j',seedSource[i] + j)
    //         min = Math.min(seedSource[i] + j, min);
    //     }
    //     console.log('min', min);
    // }
    console.log('map',map)
    for (let i = 0; i < seedSource.length; i++) {
        // for (let j = 0; j < seedSource[i + 1]; j++) {
        // console.log('seedSource[i] + j',seedSource[i] + j)
        const current = map[seedSource[i]] === undefined ? seedSource[i] : map[seedSource[i]];
        min = Math.min(current, min);
        // }
        console.log('min', min);
    }
    return min
}

console.log(start(input));