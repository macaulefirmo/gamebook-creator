SCREEN_W = 600;
SCREEN_H = 800;

const FPS = 30;
const FONT_NAME = 'Roboto';

const ON_CLICK = 'onClick';

var system = {
    mouse: {
        x: -1,
        y: -1,
        pressed: 0,
        released: 0,
    },
};

var events = [];

var stages = [
    {
        id: 0,
        type: 'start',
        image: null,
        title: 'New Game X',
        active: true,
    },
    {
        id: 1,
        type: 'reading',
        image: null,
        text: 'Color and Icon:\n\nThe type property acts as a shorthand for a color and icon combination, you can use both props individually to achieve the same effect. The following example produces the same result as using type=“success” by defining a custom color and using the icon lookup table to get the globally defined success icon.',
        active: false,
    },
    {
        id: 2,
        type: 'question',
        question: 'Quais são as cores?',
        alternatives: ['Azul', 'Vermelho', 'Amarelo'],
        responseIndex: 0,
        active: false,
    },
    {
        id: 3,
        type: 'end',
        active: false,
    },
];

function update() {
    handleMouse();
    handleEvents();
}

function handleMouse() {
    system.mouse = {
        x: mouse_x,
        y: mouse_y,
        pressed: mouse_pressed,
        released: mouse_released,
    };
}

function handleEvents() {
    for (var i in events) {
        var event = events[i];

        if (event.name == ON_CLICK && isClicked(event.element)) {
        }
    }
}

function isClicked(element) {
    return isHovered(element) && system.mouse.released;
}

function isHovered(element) {
    return (
        system.mouse.x >= element.x &&
        system.mouse.x <= element.x + element.w &&
        system.mouse.y >= element.y &&
        system.mouse.y <= element.y + element.h
    );
}

function draw() {
    for (var i in stages) {
        var stage = stages[i];
        if (stage.active) {
            if (stage.type == 'start') {
                drawStart(stage);
                break;
            }

            if (stage.type == 'end') {
                drawReading(stage);
                break;
            }

            if (stage.type == 'reading') {
                drawEnd(stage);
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

    let width = 130;
    button = {
        x: SCREEN_W / 2 - width / 2,
        y: SCREEN_H / 2 + 50,
        w: width,
        h: 55,
        r: 20,
        b: 2,
        colorFill: '#42A5F5',
        colorBorder: '#42A5F5',
        content: {
            text: 'INICIAR',
            fontSize: 18,
            color: 'white',
        },
    };
    drawButton(button);

    events.push({
        name: ON_CLICK,
        element: button,
    });
}

function drawEnd(stage) {}

function drawReading(stage) {}

function drawQuestion(stage) {}

function drawButton(button) {
    roundRect(
        canvas.context,
        button.x,
        button.y,
        button.w,
        button.h,
        button.r,
        button.b,
        button.colorFill,
        button.colorBorder,
        button.content,
    );
}

function roundRect(ctx, x, y, w, h, r, b, fillStyle, strokeStyle, content) {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = b;

    ctx.beginPath();

    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);

    ctx.fill();
    ctx.stroke();

    ctx.font = `${content.fontSize}px ${FONT_NAME}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = content.color;
    ctx.fillText(content.text, x + w / 2, y + h / 2);

    ctx.closePath();
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
