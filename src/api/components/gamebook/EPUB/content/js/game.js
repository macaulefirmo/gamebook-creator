SCREEN_W = window.innerWidth > 600 ? 600 : window.innerWidth;
SCREEN_H = window.innerHeight > 800 ? 800 : window.innerHeight;

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
        x: SCREEN_W / 2 - 65,
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
            elements.startButton.isActive = false;
            nextStage();
        },
    },
    restartButton: {
        id: generateUUID(),
        x: SCREEN_W / 2 - 65,
        y: SCREEN_H / 2 + 150,
        w: 130,
        h: 55,
        r: 20,
        b: 2,
        colorFill: '#42A5F5',
        colorBorder: '#42A5F5',
        content: {
            text: 'REINICIAR',
            color: 'white',
            fontSize: 18,
            fontName: FONT_NAME,
        },
        isActive: true,
        callback: function () {
            restart();
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
        idElement: elements.restartButton.id,
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

var sounds = {
    success: loadSound('../sounds/success.mp3'),
    error: loadSound('../sounds/error.mp3'),
    defeat: loadSound('../sounds/defeat.mp3'),
    victory: loadSound('../sounds/victory.mp3'),
};

var images = [];

var memory = {
    total: 0,
    correct: 0,
};

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
            element.callback(element);
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
    const heightBase = 240;
    const multiplier = 35;

    textout_centre(
        canvas,
        FONT_NAME,
        'FIM DE JOGO!',
        SCREEN_W / 2,
        180,
        32,
        makecol(0, 0, 0),
    );
    textout_centre(
        canvas,
        FONT_NAME,
        'Total de Perguntas',
        SCREEN_W / 2,
        heightBase + multiplier * 2,
        20,
        makecol(0, 0, 0),
    );
    textout_centre(
        canvas,
        FONT_NAME,
        memory.total,
        SCREEN_W / 2,
        heightBase + multiplier * 3,
        18,
        makecol(0, 0, 0),
    );
    textout_centre(
        canvas,
        FONT_NAME,
        'Acertos',
        SCREEN_W / 2,
        heightBase + multiplier * 4 + 5,
        20,
        makecol(0, 0, 0),
    );
    textout_centre(
        canvas,
        FONT_NAME,
        memory.correct,
        SCREEN_W / 2,
        heightBase + multiplier * 5,
        18,
        makecol(0, 0, 0),
    );
    textout_centre(
        canvas,
        FONT_NAME,
        'Taxa de Acerto',
        SCREEN_W / 2,
        heightBase + multiplier * 6 + 5,
        20,
        makecol(0, 0, 0),
    );

    let percent = !memory.correct
        ? 0
        : ((memory.correct / memory.total) * 100).toFixed(2);
    textout_centre(
        canvas,
        FONT_NAME,
        `${percent}%`,
        SCREEN_W / 2,
        heightBase + multiplier * 7,
        18,
        makecol(0, 0, 0),
    );

    drawButton(elements.restartButton);
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

    if (stage.image) {
        let image = getImage(stage);
        canvas.context.drawImage(
            image.canvas,
            SCREEN_W / 2 - 350 / 2,
            SCREEN_H / 2 - 100,
            350,
            350,
        );
    }

    if (elements.prevButton.isActive) {
        drawButton(elements.prevButton);
    }

    if (elements.nextButton.isActive) {
        drawButton(elements.nextButton);
    }
}

function getImage(stage) {
    for (let i in images) {
        let image = images[i];

        if (image.idStage == stage.id) {
            return image.bmp;
        }
    }

    let bmp = loadImage(stage.image);
    images.push({
        idStage: stage.id,
        bmp: bmp,
    });

    return bmp;
}

function drawQuestion(stage) {
    drawCenteredTextWithLineBreaks(
        canvas.context,
        stage.text,
        SCREEN_W,
        75,
        75,
        16,
        FONT_NAME,
    );

    for (let i = 0; i < stage.alternatives.length; i++) {
        let element = elements[`stage-${stage.id}-alternative-${i}`];

        if (element) {
            if (element.isSelected) {
                drawSelectedAlternative(canvas, element);
                continue;
            }

            drawAlternative(canvas, element);
        }
    }

    if (elements.prevButton.isActive) {
        drawButton(elements.prevButton);
    }

    if (elements.nextButton.isActive) {
        drawButton(elements.nextButton);
    }
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
                    handleNextStage(next, stage.type == 'question');
                    break;
                }
            }

            stages[i].isActive = false;
            break;
        }
    }
}

function handleNextStage(nextStage, lastIsQuestion) {
    if (nextStage.type == 'end') {
        if (memory.correct == 0) {
            sounds.defeat.play();
        } else {
            sounds.victory.play();
        }

        elements.prevButton.isActive = false;
        elements.nextButton.isActive = false;
        elements.restartButton.isActive = true;
    }

    if (nextStage.type == 'reading') {
        elements.prevButton.isActive = !lastIsQuestion;
        elements.nextButton.isActive = true;
    }

    if (nextStage.type == 'question') {
        elements.prevButton.isActive = !lastIsQuestion;
        elements.nextButton.isActive = false;
        enableAlternatives(nextStage);
    }
}

function enableAlternatives(stage) {
    for (let i = 0; i < stage.alternatives.length; i++) {
        let name = `stage-${stage.id}-alternative-${i}`;

        if (!elements.hasOwnProperty(name)) {
            elements[name] = {
                id: generateUUID(),
                x: 50,
                y: SCREEN_H / 2 + i * 50,
                w: 35,
                h: 35,
                b: 1,
                text: stage.alternatives[i],
                color: 'black',
                fontSize: 16,
                fontName: FONT_NAME,
                isActive: true,
                isCorrect: stage.responseIndex == i,
                isSelected: false,
                callback: function (element) {
                    handleSelectAlternatives(element, stage);
                },
            };
            events.push({
                name: ON_CLICK,
                idElement: elements[name].id,
            });
            continue;
        }

        elements[name].isActive = true;
    }
}

function handleSelectAlternatives(element, stage) {
    for (let i = 0; i < stage.alternatives.length; i++) {
        let name = `stage-${stage.id}-alternative-${i}`;

        if (elements.hasOwnProperty(name)) {
            elements[name].isActive = false;

            if (elements[name].id == element.id) {
                memory.total++;
                if (stage.responseIndex == i) {
                    sounds.success.play();
                    memory.correct++;
                } else {
                    sounds.error.play();
                }

                elements[name].isSelected = true;
                continue;
            }
        }
    }

    elements.prevButton.isActive = false;
    elements.nextButton.isActive = true;
}

function restart() {
    for (let i in stages) {
        let stage = stages[i];

        if (stage.type == 'question') {
            for (let j = 0; j < stage.alternatives.length; j++) {
                let name = `stage-${stage.id}-alternative-${j}`;

                if (elements.hasOwnProperty(name)) {
                    elements[name].isSelected = false;
                }
            }
        }
    }

    memory = {
        total: 0,
        correct: 0,
    };

    stages[stages.length - 1].isActive = false;
    stages[0].isActive = true;

    elements.restartButton.isActive = false;
    elements.startButton.isActive = true;
}

function main() {
    allegro_init_all('game_canvas', SCREEN_W, SCREEN_H);

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
