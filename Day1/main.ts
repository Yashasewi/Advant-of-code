const inputFile = await Deno.readTextFile("input.txt");

const input: string[][] = inputFile
    .split("\r\n")
    .map((line) => line.split("   "));

const left: number[] = [];
const right: number[] = [];

for (let i = 0; i < input.length; i++) {
    left.push(Number(input[i][0]));
    right.push(Number(input[i][1]));
}

export function firstPart(left: number[], right: number[]): number {
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < left.length; i++) {
        ans = ans + Math.abs(left[i] - right[i]);
    }
    console.log(ans);
    // write output to output.txt

    return ans;
}

export function secondPart(left: number[], right: number[]): number {
    const m: Map<number, number> = new Map();
    for (let i = 0; i < right.length; i++) {
        if (m.has(right[i])) {
            m.set(right[i], m.get(right[i])! + 1);
        } else {
            m.set(right[i], 1);
        }
    }
    let ans = 0;
    for (let i = 0; i < left.length; i++) {
        const similarity_score = left[i] * (m.get(left[i]) || 0);
        ans += similarity_score;
    }
    console.log(ans);
    // write output to output.txt and push on the end of the file
    return ans;
}

let ans = firstPart(left, right);
Deno.writeTextFile("output.txt", "Part 1 :" + ans.toString() + "\n");
ans = secondPart(left, right);
Deno.writeTextFile("output.txt", "Part 2: " + ans.toString(), { append: true });
