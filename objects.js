const Global = {
    segmentsPerSide: 10, //MAX 24, default 10
    segmentSize: 40,
    segments: [],
    indexFillColor: '#F64C72',
    indexStrokeColor: 'pink',
    segmentFillColor: 'white',
    segmentStrokeColor: 'black',
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y', 'z', ],
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'saddlebrown', 'darkorange', 'white', ],
    colorsSet1: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'saddlebrown', 'darkorange', 'white', ],
    colorsSet2: ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'blue', 'darkorange', 'white', ],
    pickedColor: '',
    listOfPickedColors: [],
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

        for (let col of Global.colors) {

            let div = createDiv('&nbsp;');
            div.style('background-color', col);
            div.addClass('colorIcon');
            div.attribute('onclick', `Global.Gui.handleColorPick('${col}')`);
            select('.colorPick').child(div);
        }

    }

    handleColorPick(col) {
        Global.pickedColor = col;

        if (col == "white") return;

        if (!Global.listOfPickedColors.includes(col)) {
            Global.listOfPickedColors.push(col);
            this.updateListOfColors();
        }
    }

    updateListOfColors() {
        let div = select('.colorsUsed');
        let htmlInsert = 'Użyte kolory:';

        for (let col of Global.listOfPickedColors) {
            htmlInsert += `<div class = "color" style="background-color: ${col}" onclick="Global.Gui.handleColorPick('${col}')"> ${Global.listOfPickedColors.indexOf(col) +1} </div>`;
        }

        div.html(htmlInsert);
    }

    saveImg() {
        let data = new Date();
        saveCanvas(`mozaika-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }

    toogleBoardView() {
        for (let seg of Global.segments) {
            seg.toogleView();
        }
    }

    hideElements() {
        let elements = selectAll('.hide');

        for (let e of elements) {
            if (Global.infoHide) {
                e.show();
            } else {
                e.hide();
            }
        }

        if (Global.infoHide) {
            select('.container').style('margin-top', '0px')
        } else {
            select('.container').style('margin-top', '75px')
        }

        Global.infoHide = !Global.infoHide;
    }

    showOptions() {

    }

}

class Segment {
    constructor(iJ) {
        this.pos = {
            x: iJ.i * Global.segmentSize,
            y: iJ.j * Global.segmentSize
        };

        this.curve = 2;
        this.fill = Global.segmentFillColor;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(Global.segmentStrokeColor);
        fill(this.fill);
        rect(0, 0, Global.segmentSize, Global.segmentSize, this.curve)

        if (this.txt) {
            stroke(0);
            fill(0);
            textAlign(CENTER, CENTER);
            text(this.txt, 0, 0, Global.segmentSize, Global.segmentSize);
        }

        pop();
    }

    checkPointing() {
        return mouseX.between(this.pos.x, this.pos.x + Global.segmentSize) &&
            mouseY.between(this.pos.y, this.pos.y + Global.segmentSize);
    }

    toogleView() {
        if (this.fill != 'white') {
            this.txt = Global.listOfPickedColors.indexOf(this.fill) + 1;
            this.prevFill = this.fill;
            this.fill = Global.segmentFillColor;
        }
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
    toogleView() {}
}