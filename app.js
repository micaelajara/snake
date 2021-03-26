const myCanvas = document.getElementById("myCanvas");
const context = myCanvas.getContext("2d");

const SIZE = 20;
const body = []


const head = { x: 0, y: 0 };
let food = null

let dx = 0;
let dy = 0;

setInterval(main, 150);

function main() {
    update();
    draw();
}
function update() {
    const collisionDetected = checkSnakeCollision()
    if (collisionDetected) {
        gameOver()
        return;
    }

    let prevX, prevY;
    if (body.length >= 1) {
        prevX = body[body.length - 1].x;
        prevY = body[body.length - 1].y;
    }
    else {
        prevX = head.x
        prevY = head.y
    }

    for (let i = body.length - 1; i >= 1; --i) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }

    if (body.length >= 1) {
        body[0].x = head.x;
        body[0].y = head.y;
    }

    head.x += dx;
    head.y += dy;


    if (food && head.x === food.x && head.y === food.y) {
        food = null;
        increaseSnakeBody(prevX, prevY);
    }


    if (!food) {
        food = { x: getRandomX(), y: getRandomY() };
        food = randomFoodPosition();
    }

    function checkSnakeCollision() {
        for (let i = 0; i < body.length; ++i) {
            if (head.x == body[i].x && head.y == body[i].y) {
                return true;
            }
        }

        const topCollision = (head.y < 0);
        const buttomCollision = (head.y > 440);
        const rightCollision = (head.x < 0);
        const leftCollision = (head.x > 380);
        if (topCollision || buttomCollision || rightCollision || leftCollision) {
            return true;
        }
        return false;
    }

    function gameOver() {
        alert("Game Over");
        head.x = 0;
        head.y = 0;
        dy = 0; dx = 0
        body.length = 0;
    }
}
function increaseSnakeBody(prevX, prevY) {
    body.push({
        x: prevX,
        y: prevY
    })
}

function randomFoodPosition() {
    let position;
    do {
        position = { x: getRandomX(), y: getRandomY() }
    } while (checkFoodCollision(position));
    return position;
}

function checkFoodCollision(position) {
    for (let i = 0; i < body.length; ++i) {
        if (head.x == body[i].x && head.y == body[i].y) {
            return true;
        }
    }
    if (position.x == head.x && position.y == head.y) {
        return true;
    }
    return false;
}

function getRandomX() {
    return 20 * (parseInt(Math.random() * 20));
}

function getRandomY() {
    return 20 * parseInt(Math.random() * 23);
}

function draw() {
    context.fillStyle = "#616771";
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);
    drawObject(head, "#2d572c")
    body.forEach(
        elem => drawObject(elem, "#2d572c")
    )
    drawObject(food, "#ffd700")

}


function drawObject(obj, color) {
    context.fillStyle = color;
    context.fillRect(obj.x, obj.y, SIZE, SIZE);
}

document.addEventListener("keydown", moveSnake)

function moveSnake(event) {
    switch (event.key) {
        case "ArrowUp":
            if (dy === 0) {
                dx = 0;
                dy = -SIZE;
                console.log("Mover hacia arriba");
            }
            break;
        case "ArrowDown":
            if (dy === 0) {
                dx = 0;
                dy = +SIZE;
                console.log("Mover hacia abajo");
            }
            break;
        case "ArrowLeft":
            if (dx === 0) {
                dx = -SIZE
                dy = 0;
                console.log("Mover hacia la izq");

            }
            break;
        case "ArrowRight":
            if (dx === 0) {
                dx = +SIZE;
                dy = 0;
                console.log("Mover hacia la derecha");

            }
            break;
    }
}