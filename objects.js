const Global = {
    segmentsPerSide: 10,
    segmentSize: 40,
    segments: []
}

class Gui {
    createBoard() {
        for2dSquareLoop(Global.segmentsPerSide, this.addSegment);
    }

    addSegment(i, j) {

        let pos = { x: i, y: j }

        if (((j == 0 || j == Global.segN + 1) && i > 0 && i < Global.segN + 1) ||
            ((i == 0 || i == Global.segN + 1) && j > 0 && j < Global.segN + 1)) {
            Global.segments.push(new Segment(pos));
        } else if (j != 0 && j != Global.segN + 1) {
            // Global.segments.push(new Segment(pos));
        }
    }

    saveImg() {
        let data = new Date();
        saveCanvas(`mozaika-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }
}

class Index {
    constructor(pos) {
        this.pos = pos;
        this.x = this.pos.x * Global.segmentSize;
        this.y = this.pos.y * Global.segmentSize;
    }
}

class Segment extends Index {
    constructor(pos) {
        super(pos);
    }

    draw() {
        push();
        translate(this.x, this.y);
        noFill();
        stroke(0);
        square(0, 0, Global.segmentSize)
        pop();
    }

}