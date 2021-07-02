var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 200;
var FOOD_SPEED = 2000;
var PROBLEM_SPEED = 5000;
var food_timer;
var snake = [];
var direction = 'y+';
var gameIsRunning = false;
var snake_timer;
var problem_timer;
var score = 0;


function init() {
    prepareGameField();

    var wrap = document.getElementsByClassName('wrap')[0];

    wrap.style.width = '400px';

    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    addEventListener('keydown', changeDirection);

}

function prepareGameField() {
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    for(var i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell);
        }
        game_table.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(game_table);
}

function startGame() {
    gameIsRunning = true;
    respawn();
    createFood();
    snake_timer = setInterval(move, SNAKE_SPEED);
    food_timer = setInterval(createFood, FOOD_SPEED);
    problem_timer = setInterval(createProblem, PROBLEM_SPEED);


}

function respawn() {
    var start_coord_x = Math.floor(FIELD_SIZE_X/2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y/2);

    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.classList.add('snake-unit');

    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.classList.add('snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);
}

function move() {
    var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');

    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    if (new_unit === undefined) {
        new_unit = teleport(coord_y, coord_x);
    }

    if (!isSnakeUnit(new_unit) && !haveProblem(new_unit)) {
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);

        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

function isSnakeUnit(unit) {
    var check = false;
    
    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}

function haveFood(unit) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');

    if (unit_classes.includes('food-unit')) {
        check = true;
        score++;
        FOOD_SPEED += 200;
        document.getElementById('score-point').innerHTML = score;
    }
    return check;
}

function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        var food_x = Math.floor(Math.random()*FIELD_SIZE_X);
        var food_y = Math.floor(Math.random()*FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        if (!food_cell_classes.includes('snake-unit')) {
            food_cell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

function haveProblem(prob) {
    var check = false;
    var prob_classes = prob.getAttribute('class').split(' ');

    if (prob_classes.includes('prob-unit')) {
        check = true;
    }
    return check;
}

function createProblem() {
    var problemCreated = false;
    while (!problemCreated) {
        var prob_x = Math.floor(Math.random()*FIELD_SIZE_X);
        var prob_y = Math.floor(Math.random()*FIELD_SIZE_Y);

        var prob_cell = document.getElementsByClassName('cell-' + prob_y + '-' + prob_x)[0];
        var prob_cell_classes = prob_cell.getAttribute('class').split(' ');

        if (!prob_cell_classes.includes('snake-unit') || !prob_cell_classes.includes('food-unit')) {
            prob_cell.classList.add('prob-unit');
            problemCreated = true;
        }
    }
}

function teleport(tele_y, tele_x) {
    var tele_unit;
    if (direction == 'x-') {
        tele_unit = document.getElementsByClassName('cell-' + (tele_y) + '-' + (FIELD_SIZE_X - 1))[0];
    }
    else if (direction == 'x+') {
        tele_unit = document.getElementsByClassName('cell-' + (tele_y) + '-' + 0)[0];
    }
    else if (direction == 'y+') {
        tele_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (tele_x))[0];
    }
    else if (direction == 'y-') {
        tele_unit = document.getElementsByClassName('cell-' + 0 + '-' + (tele_x))[0];
    }
    return tele_unit;
}

function changeDirection(e) {
    switch (e.keyCode) {
        case 37: //left case
            if (direction != 'x+'){
                direction = 'x-'
            }
            break;
        case 38://top case
            if (direction != 'y-'){
                direction = 'y+'
            }
            break;
        case 39://right case
            if (direction != 'x-'){
                direction = 'x+'
            }
            break;
        case 40://dawn case
            if (direction != 'y+'){
                direction = 'y-'
            }
            break;
    }
}

function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
    location.reload()
}

function refreshGame() {
    location.reload();
}

window.onload = init;

//ответы на 8-е задание

// 1. мне кажется, что замыкание можно применить, когда есть повторяющиеся функции со схожими параметрами. В змейке я бы его применил к функциям haveFood-createFood и haveProblem-createProblem, они почти одинаковые. До конца не продумал, чуть позже переписать попробую.

// 2. if (!("a" in window)) {
//     var a = 1;
// }
// alert(a);

//На сколько я понимаю строка: "a" in window возвращает 'true', значит в условии 'false', итого функция не выполняется, 'a' не задано, и не определено, значит alert(a) = undefined.

// var b = function a(x) {
//     x && a(--x);
// };
// alert(a);

// не совсем понял, но 'x' не задан через переменную и не определён, а тут условие, чтобы и 'x' был, и он уменьшился. Условие не выполняется, значит функция ничего не вернёт.

// function a(x) {
// //     return x * 2;
// // }
// // var a;
// // alert(a);

// Ну тут в переменную не записана функция, 'a' не определена, значит alert(a) = undefined

// function b(x, y, a) {
//     arguments[2] = 10;
//     alert(a);
// }
// b(1, 2, 3);

// Без разницы какие аргументы у 'b', внутри самой функции 'a' определена как '10', значит 'b' и вернёт '10'

// function a() {
//     alert(this);
// }
// a.call(null);

// это на последнем уроке было, если нет объекта для this, то this сошлётся на глобальный объект window.

// Так же прошу прощения, что не донёс оставшиеся домашки, прошу дать мне чуть-чуть времени (его у меня не было от слова 'совсем').