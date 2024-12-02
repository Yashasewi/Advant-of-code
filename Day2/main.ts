function isStrictlyIncreasing(levels: number[]): boolean {
    for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i] >= levels[i + 1]) {
            return false;
        }
    }
    return true;
}

function isStrictlyDecreasing(levels: number[]): boolean {
    for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i] <= levels[i + 1]) {
            return false;
        }
    }
    return true;
}

function areDifferencesValid(levels: number[]): boolean {
    for (let i = 0; i < levels.length - 1; i++) {
        const diff = Math.abs(levels[i + 1] - levels[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function isSafeReport(levels: number[]): boolean {
    const increasing = isStrictlyIncreasing(levels);
    const decreasing = isStrictlyDecreasing(levels);
    const validDifferences = areDifferencesValid(levels);

    return validDifferences && (increasing || decreasing);
}

function canBeMadeSafe(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
        const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeReport(newLevels)) {
            return true;
        }
    }
    return false;
}

async function part1() {
    const inputFile = await Deno.readTextFile('input.txt');
    const reports = inputFile.trim().split('\n');

    const safeReportsCount = reports.filter(report => isSafeReport(report.split(' ').map(Number))).length;

    console.log(`Part 1 - Number of safe reports: ${safeReportsCount}`);

    await Deno.writeTextFile("output.txt", `Part 1 - Number of safe reports: ${safeReportsCount}\n`);
}

async function part2() {
    const inputFile = await Deno.readTextFile('input.txt');
    const reports = inputFile.trim().split('\n');

    let safeReportsCount = 0;
    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(levels) || canBeMadeSafe(levels)) {
            safeReportsCount++;
        }
    }

    console.log(`Part 2 - Number of safe reports: ${safeReportsCount}`);

    await Deno.writeTextFile("output.txt", `Part 2 - Number of safe reports: ${safeReportsCount}\n`, { append: true });
}

await part1();
await part2();
