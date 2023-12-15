

str.split(',').reduce((sum = 0, line) =>
    sum + line.split('').reduce(function (lineSum = 0, chart) {
        if (chart !== ',') {
            const ascii = chart.charCodeAt();
            lineSum = lineSum + ascii;
            return (lineSum * 17) % 256;
        } else {
            return lineSum;
        }
    }, 0)
    , 0)