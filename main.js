const fs = require("fs");
const testCases = JSON.parse(fs.readFileSync("./input.json", "utf8"));

const directionVectors = {
    N: [0,  1],
    NE: [1,  1],
    E: [1,  0],
    SE: [1, -1],
    S: [0, -1],
    SW: [-1,-1],
    W: [-1,  0],
    NW: [-1, 1],
};

const directionOrder = ['N','NE','E','SE','S','SW','W','NW'];

const getOppositeDirectionKey = k => directionOrder[(directionOrder.indexOf(k) + 4) % 8];
const rotateDirectionKey = k => directionOrder[(directionOrder.indexOf(k) + 1) % 8];

const toKey = (x, y) => `${x},${y}`;
const areSameCoord = (a, b) => a[0] === b[0] && a[1] === b[1];
const getPlayerIndex = (p, list) => list.findIndex(q => areSameCoord(p, q)) + 1;

const findClosestTarget = (player, [dx, dy], remaining) => {
    const [x, y] = player;
    let best = null;
    let bestDist = 1e9;

    for (const pos of remaining) {
        const [px, py] = pos.split(',').map(Number);
        const rx = px - x;
        const ry = py - y;

        let onRay = false;
        if (dx === 0)       onRay = rx === 0 && Math.sign(dy) === Math.sign(ry);
        else if (dy === 0)  onRay = ry === 0 && Math.sign(dx) === Math.sign(rx);
        else                onRay = rx * dy === ry * dx && Math.sign(dx) === Math.sign(rx);

        if (!onRay) continue;

        const dist = Math.max(Math.abs(rx), Math.abs(ry));
        if (dist < bestDist) {
            bestDist = dist;
            best = [px, py];
        }
    }

    return best;
};

for (const test of testCases) {
    const { players: original, startingDirection, startingPlayer } = test;
    const remaining = new Set(original.map(([x,y]) => toKey(x,y)));

    let current = original[startingPlayer - 1];
    let facing  = startingDirection;
    let throws  = 0;

    remaining.delete(toKey(...current));

    while (remaining.size) {
        let found = false;
        let tryDirection = rotateDirectionKey(facing);

        for (const element of directionOrder) {
            const target = findClosestTarget(
                current,
                directionVectors[tryDirection],
                remaining
            );
            if (target) {
                facing = getOppositeDirectionKey(tryDirection);
                throws++;
                remaining.delete(toKey(...current));
                current = target;
                found = true;
                break;
            }
            tryDirection = rotateDirectionKey(tryDirection);
        }

        if (!found) break;
    }

    const last = getPlayerIndex(current, original);
    console.log(`${throws} ${last}`);
}
