import { assertEquals } from "@std/assert";
import { firstPart, secondPart } from "./main.ts";

const testLeft = [3, 4, 2, 1, 3, 3];
const testRight = [4, 3, 5, 3, 9, 3];

Deno.test("firstPart test", () => {
    const result = firstPart(testLeft.slice(), testRight.slice());
    assertEquals(result, 11); // Sum of absolute differences after sorting
});

Deno.test("secondPart test", () => {
    const result = secondPart(testLeft.slice(), testRight.slice());
    assertEquals(result, 31); // Sum of similarity scores
});
