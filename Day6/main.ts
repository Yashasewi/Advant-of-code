const input = await Deno.readFile("./input.txt");
const lines = new TextDecoder().decode(input).split("\r\n");

const row = lines.length;
const col = lines[0].length;

lines.map((line) => {
    console.log(line);
});

const strDir = "^>v<"
const guard = {
    x: 0,
    y: 0,
    direction: "right",
}

for (let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        if (strDir.includes(lines[i][j])){
            guard.x = i;
            guard.y = j;
            if(lines[i][j] == "^"){
                guard.direction = "up";
            }
            if(lines[i][j] == ">"){
                guard.direction = "right";
            }
            if(lines[i][j] == "v"){
                guard.direction = "down";
            }
            if(lines[i][j] == "<"){
                guard.direction = "left";
            }
        }
    }
}

console.log(guard);

function moveGuard(move, direction) {
    
}