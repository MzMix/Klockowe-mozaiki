Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

function for2dSquareLoop(max, fxn) {
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < max; j++) {
            fxn(i, j);
        }
    }
}

function setup() {
    createCanvas(Global.segmentsPerSide * Global.segmentSize + 1, Global.segmentsPerSide * Global.segmentSize + 1);

    Global['Gui'] = new Gui();
    Global.Gui.createBoard();

}

function draw() {
    background(175);

    for (let s of Global.segments) {
        s.draw();
    }

}