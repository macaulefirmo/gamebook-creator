function generateUUID() {
    let rand = Math.floor(65536 * Math.random());
    let time = Date.now();

    return `${rand}-${time}`;
}

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

    ctx.font = `${content.fontSize}px ${content.fontName}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = content.color;
    ctx.fillText(content.text, x + w / 2, y + h / 2);

    ctx.closePath();
}

function drawCenteredTextWithLineBreaks(
    ctx,
    text,
    canvasWidth,
    y,
    boder,
    fontSize,
    fontName,
) {
    const maxWidth = canvasWidth - boder;
    const lineHeight = fontSize * 1.5;

    ctx.font = `${fontSize}px ${fontName}`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let words = line.split(' ');
        let currentLine = '';
        let x = canvasWidth / 2;

        for (let j = 0; j < words.length; j++) {
            let word = words[j];
            let testLine = currentLine === '' ? word : currentLine + ' ' + word;
            let testWidth = ctx.measureText(testLine).width;

            if (testWidth <= maxWidth || currentLine === '') {
                currentLine = testLine;
            } else {
                ctx.fillText(currentLine, x, y);
                y += lineHeight;
                currentLine = word;
            }
        }

        ctx.fillText(currentLine, x, y);
        y += lineHeight;
    }
}

function drawAlternative(canvas, alternative) {
    let ctx = canvas.context;

    ctx.font = `${alternative.fontSize}px ${alternative.fontName}`;
    ctx.textAlign = 'left';

    ctx.lineWidth = alternative.b;
    ctx.strokeStyle = alternative.color;
    ctx.strokeRect(alternative.x, alternative.y, alternative.w, alternative.h);

    ctx.fillText(
        alternative.text,
        alternative.x + alternative.w + 15,
        alternative.y + alternative.h / 2,
    );
}

function drawSelectedAlternative(canvas, alternative) {
    let ctx = canvas.context;

    ctx.font = `${alternative.fontSize}px ${alternative.fontName}`;
    ctx.textAlign = 'left';

    ctx.fillStyle = alternative.isCorrect ? 'green' : 'red';
    ctx.fillRect(alternative.x, alternative.y, alternative.w, alternative.h);

    ctx.strokeStyle = alternative.color;
    ctx.lineWidth = 1;
    ctx.strokeRect(alternative.x, alternative.y, alternative.w, alternative.h);

    ctx.fillStyle = alternative.isCorrect ? 'green' : 'red';
    ctx.fillText(
        alternative.text,
        alternative.x + alternative.w + 15,
        alternative.y + alternative.h / 2,
    );

    ctx.fillStyle = 'black';
}

function loadSound(filePath) {
    let sound = document.createElement('audio');

    sound.src = filePath;
    sound.controls = true;
    return sound;
}
