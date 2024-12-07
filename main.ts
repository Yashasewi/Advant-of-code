const input = await Deno.readFile("./input.txt");
const lines = new TextDecoder().decode(input).split("\r\n");

const map = new Map<number, number[]>();

lines.forEach((line) => {
    const [key, value] = line.split(": ");
    map.set(parseInt(key), value.split(" ").map(Number));
});

console.log("Map:", map.size);

function calibrateValues(value: number, arr: number[], total: number , c : boolean = false): boolean {
    // if(c)
    // console.log(value, arr)
    if (arr.length === 0) {
        return value === total;
    }
    if (c == false)
        return calibrateValues(value + arr[0], arr.slice(1), total) || calibrateValues(value * arr[0], arr.slice(1), total); 
    return calibrateValues(parseInt(value.toString() + arr[0].toString()), arr.slice(1), total , c) || calibrateValues(value + arr[0], arr.slice(1), total,c) || calibrateValues(value * arr[0], arr.slice(1), total,c)  ;
} 

let ans = 0;
let t = Date.now();

for (let [key, value] of map) {
    let temp = calibrateValues(value[0], value.slice(1), key,true);
    if (temp)
        ans = ans + key;
    
    console.log(key + " : " + temp);
}
console.log(ans)

console.log(Date.now() - t);
