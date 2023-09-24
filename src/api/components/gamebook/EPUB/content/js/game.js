SCREEN_W = 600;
SCREEN_H = 800;

const FPS = 30;
const FONT_NAME = 'Roboto';
const ON_CLICK = 'onClick';

var system = {
    mouse: {
        x: -1,
        y: -1,
        pressed: false,
        released: false,
        hasPressed: false,
        update: function () {
            system.mouse.x = mouse_x;
            system.mouse.y = mouse_y;
            system.mouse.pressed = mouse_pressed;
            system.mouse.released = mouse_released;
        },
        handleClick: function () {
            system.mouse.hasPressed = true;
            setTimeout(() => {
                system.mouse.hasPressed = false;
            }, 50);
        },
        isElementHovered(element) {
            return (
                system.mouse.x >= element.x &&
                system.mouse.x <= element.x + element.w &&
                system.mouse.y >= element.y &&
                system.mouse.y <= element.y + element.h
            );
        },
        isElementClicked(element) {
            return (
                system.mouse.isElementHovered(element) &&
                system.mouse.pressed &&
                !system.mouse.hasPressed
            );
        },
    },
};

var elements = {
    startButton: {
        id: generateUUID(),
        x: SCREEN_W / 2 - 130 / 2,
        y: SCREEN_H / 2 + 50,
        w: 130,
        h: 55,
        r: 20,
        b: 2,
        colorFill: '#42A5F5',
        colorBorder: '#42A5F5',
        content: {
            text: 'INICIAR',
            color: 'white',
            fontSize: 18,
            fontName: FONT_NAME,
        },
        isActive: true,
        callback: function () {
            nextStage();
        },
    },
    prevButton: {
        id: generateUUID(),
        x: SCREEN_W - 250,
        y: SCREEN_H - 90,
        w: 100,
        h: 45,
        r: 20,
        b: 2,
        colorFill: '#757575',
        colorBorder: '#757575',
        content: {
            text: 'Voltar',
            color: 'white',
            fontSize: 16,
            fontName: FONT_NAME,
        },
        isActive: false,
        callback: function () {
            prevStage();
        },
    },
    nextButton: {
        id: generateUUID(),
        x: SCREEN_W - 130,
        y: SCREEN_H - 90,
        w: 100,
        h: 45,
        r: 20,
        b: 2,
        colorFill: '#42A5F5',
        colorBorder: '#42A5F5',
        content: {
            text: 'AVANÇAR',
            color: 'white',
            fontSize: 16,
            fontName: FONT_NAME,
        },
        isActive: false,
        callback: function () {
            nextStage();
        },
    },
};

var events = [
    {
        name: ON_CLICK,
        idElement: elements.startButton.id,
    },
    {
        name: ON_CLICK,
        idElement: elements.prevButton.id,
    },
    {
        name: ON_CLICK,
        idElement: elements.nextButton.id,
    },
];

function update() {
    system.mouse.update();
    handleEvents();
}

function handleEvents() {
    for (let i in events) {
        let event = events[i];

        let element = getElementById(event.idElement);
        if (!element || !element.isActive) {
            continue;
        }

        if (event.name == ON_CLICK && system.mouse.isElementClicked(element)) {
            system.mouse.handleClick();
            element.callback();
        }
    }
}

function getElementById(id) {
    for (let i in elements) {
        let element = elements[i];

        if (element.id == id) {
            return element;
        }
    }

    return null;
}

function draw() {
    for (let i in stages) {
        let stage = stages[i];

        if (stage.isActive) {
            if (stage.type == 'start') {
                drawStart(stage);
                break;
            }

            if (stage.type == 'end') {
                drawEnd(stage);
                break;
            }

            if (stage.type == 'reading') {
                drawReading(stage);
                break;
            }

            if (stage.type == 'question') {
                drawQuestion(stage);
                break;
            }
        }
    }
}

function drawStart(stage) {
    textout_centre(
        canvas,
        FONT_NAME,
        stage.title,
        SCREEN_W / 2,
        SCREEN_H / 2 - 75,
        28,
        makecol(0, 0, 0),
    );
    drawButton(elements.startButton);
}

function drawEnd(stage) {
    textout_centre(
        canvas,
        FONT_NAME,
        'END',
        SCREEN_W / 2,
        SCREEN_H / 2 - 75,
        28,
        makecol(0, 0, 0),
    );
}

function drawReading(stage) {
    drawCenteredTextWithLineBreaks(
        canvas.context,
        stage.text,
        SCREEN_W,
        75,
        75,
        16,
        FONT_NAME,
    );
    drawButton(elements.prevButton);
    drawButton(elements.nextButton);
}

function drawQuestion(stage) {
    textout_centre(
        canvas,
        FONT_NAME,
        'QUESTION',
        SCREEN_W / 2,
        SCREEN_H / 2 - 75,
        28,
        makecol(0, 0, 0),
    );

    drawButton(elements.prevButton);
    drawButton(elements.nextButton);
}

function prevStage() {
    for (let i in stages) {
        let stage = stages[i];

        if (stage.isActive) {
            let prevId = stage.id - 1;

            for (let j in stages) {
                let prev = stages[j];

                if (prev.id == prevId) {
                    stages[j].isActive = true;
                    handlePrevStage(prev);
                    break;
                }
            }

            stages[i].isActive = false;
            break;
        }
    }
}

function handlePrevStage(prevStage) {
    if (prevStage.type == 'start') {
        elements.prevButton.isActive = false;
        elements.nextButton.isActive = false;
        elements.startButton.isActive = true;
        return;
    }

    if (prevStage.type == 'reading') {
        elements.prevButton.isActive = true;
        elements.nextButton.isActive = true;
        elements.startButton.isActive = false;
    }

    if (prevStage.type == 'question') {
        elements.prevButton.isActive = true;
        elements.nextButton.isActive = true;
        elements.startButton.isActive = false;
    }
}

function nextStage() {
    for (let i in stages) {
        let stage = stages[i];

        if (stage.isActive) {
            let nextId = stage.id + 1;

            for (let j in stages) {
                let next = stages[j];

                if (next.id == nextId) {
                    stages[j].isActive = true;
                    handleNextStage(next);
                    break;
                }
            }

            stages[i].isActive = false;
            break;
        }
    }
}

function handleNextStage(nextStage) {
    elements.startButton.isActive = false;

    if (nextStage.type == 'end') {
    }

    if (nextStage.type == 'reading') {
        elements.prevButton.isActive = true;
        elements.nextButton.isActive = true;
    }

    if (nextStage.type == 'question') {
        elements.prevButton.isActive = true;
        elements.nextButton.isActive = true;
    }
}

function initGame() {}

function main() {
    allegro_init_all('game_canvas', SCREEN_W, SCREEN_H);

    initGame();

    ready(function () {
        loop(function () {
            clear_to_color(canvas, makecol(255, 255, 255));
            update();
            draw();
        }, BPS_TO_TIMER(FPS));
    });

    return 0;
}
END_OF_MAIN();
