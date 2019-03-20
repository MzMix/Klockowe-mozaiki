Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

function forSquare2dLoop(max, fxn) {

    for (let j = 0; j < max; j++) {
        for (let i = 0; i < max; i++) {
            fxn(i, j);
        }
    }
}

function setup() {
    let c = createCanvas((Global.segmentsPerSide + 2) * Global.segmentSize + 1, (Global.segmentsPerSide + 2) * Global.segmentSize + 2);
    select('.box').child(c);

    Global['Gui'] = new Gui();
    Global.Gui.createBoard().generateColorPick();

}

function draw() {
    clear();
    background(color(0, 0, 0, 0));

    for (let s of Global.segments) {
        s.draw();
    }

}

function mouseClicked() {
    for (let seg of Global.segments) {
        if (!(seg instanceof Index) && seg.checkPointing()) {

            if (Global.pickedColor != '') seg.fill = Global.pickedColor;

            break;
        }
    }
}