const inputFile = await Deno.readTextFile("input.txt");
const firstRegex = /mul[(]+\d{1,3},\d{1,3}[)]/gm;


let m;
let arr = [];
let num1, num2;
let ans = 0;

while ((m = firstRegex.exec(inputFile)) !== null) {
    if (m.index === firstRegex.lastIndex) {
        firstRegex.lastIndex++;
    }
    
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        num1 = match.split("(")[1].split(",")[0];
        num2 = match.split("(")[1].split(",")[1].split(")")[0];
        ans = ans  + parseInt(num1) * parseInt(num2);
        
    });
}



type Operation = {
    num1: number;
    num2: number;
};

// Improved regex with named capture groups
const operationRegex = /(?:mul\((\d{1,3}),(\d{1,3})\)|(?:(don't|do)\(\)))/gm;


function processOperations(inputFile: string): number {
    let total = 0;
    let isSkipped = false;
    
    let match: RegExpExecArray | null;
    while ((match = operationRegex.exec(inputFile)) !== null) {
        // Prevent infinite loops
        if (match.index === operationRegex.lastIndex) {
            operationRegex.lastIndex++;
            continue;
        }

        const [fullMatch, num1, num2, control] = match;

        // Handle control operations
        if (control) {
            if (control === "do") {
                isSkipped = false;
            } else if (control === "don't") {
                isSkipped = true;
            }
            continue;
        }

        // Skip multiplication if in skip mode
        if (isSkipped) {
            continue;
        }

        // Process multiplication
        if (num1 && num2) {
            try {
                const operation: Operation = {
                    num1: parseInt(num1, 10),
                    num2: parseInt(num2, 10)
                };
                total += operation.num1 * operation.num2;
            } catch (error) {
                console.error(`Error processing numbers: ${num1}, ${num2}`, error);
            }
        }
    }

    return total;
}

// Usage
const result = processOperations(inputFile);
console.log(ans);
console.log(`Final result: ${result}`);

