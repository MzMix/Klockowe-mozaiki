const Global = {
    segmentsPerSide: 10,
    segmentSize: 40,
    segments: [],
    indexFillColor: '#F64C72',
    indexStrokeColor: 'pink',
    segmentFillColor: '#C0C0C0',
    segmentStrokeColor: 'white',
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'h', 'i', 'j', ],
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0', ],
    colorsSet1: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0', ],
    colorsSet2: ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange', '#C0C0C0', ],
}

class Gui {
    createBoard() {

        forSquare2dLoop(Global.segmentsPerSide + 2, (i, j) => {
            if (((j == 0 || j == Global.segmentsPerSide + 1) && i > 0 && i < Global.segmentsPerSide + 1) ||
                ((i == 0 || i == Global.segmentsPerSide + 1) && j > 0 && j < Global.segmentsPerSide + 1)) {
                Global.segments.push(new Index({
                    i,
                    j
                }));
            } else if (j != 0 && j != Global.segmentsPerSide + 1) {
                Global.segments.push(new Segment({
                    i,
                    j
                }));
            }
        });

        return this;
    }

    generateColorPick() {

        for (let color of Global.colors) {

            let div = Global.colors.indexOf(color) == Global.colors.length - 1 ? createDiv('G') : createDiv('&nbsp;');
            div.style('background-color', color);
            div.addClass('colorIcon');
            div.attribute('onclick', 'Global.Gui.handleColorPick(color)');
            select('.colorPick').child(div);
        }

    }

    handleColorPick(color) {

    }

    saveImg() {
        let data = new Date();
        saveCanvas(`mozaika-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }

    //Imput list required!
    // changeSet() {
    //     let type = this.value();

    //     if (type == "Zestaw 1") {
    //         Global.colors = Global.mtmColors;
    //     } else if (type == "Zestaw 2") {
    //         Global.colors = Global.crColors;
    //     }

    //     let btns = selectAll('.paletteBtn');
    //     let i = 0;
    //     for (let b of btns) {
    //         b.style('background-color', Global.colors[i]);
    //         b.attribute("onclick", `pick('${Global.colors[i]}')`);
    //         i++;
    //     }
}

    constructor(pos) {
class Segment {
    constructor(iJ) {
        this.pos = {
            x: iJ.i * Global.segmentSize,
            y: iJ.j * Global.segmentSize
        };

        this.curve = 2;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(Global.segmentStrokeColor);
        fill(Global.segmentFillColor);
        rect(0, 0, Global.segmentSize, Global.segmentSize, this.curve)
        pop();
    }

    checkPointing() {
        return mouseX.between(this.pos.x, this.pos.x + this.dim) &&
            mouseY.between(this.pos.y, this.pos.y + this.dim);
    }
}

class Index extends Segment {
    constructor(iJ) {
        super(iJ);
        this.curve = 10;

        this.txt = iJ.i.between(0, Global.segmentsPerSide + 1) ? iJ.i : Global.letters[iJ.j - 1].toUpperCase();

    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(Global.indexFillColor)
        stroke(Global.indexStrokeColor);

        rect(0, 0, Global.segmentSize, Global.segmentSize, this.curve)

        textSize(15);
        fill(255);
        stroke(255);
        textAlign(CENTER, CENTER)
        strokeWeight(0);
        text(this.txt, 2, 2, Global.segmentSize, Global.segmentSize);

        pop();
    }
}