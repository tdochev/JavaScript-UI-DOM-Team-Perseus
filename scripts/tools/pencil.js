class Pencil extends Tool {
    static get canvas() { return document.getElementById('canvas'); }

    static get context() { return this.canvas.getContext('2d'); }

    static get mouseDown() { return this._mouseDown; }
    static set mouseDown(x) { this._mouseDown = x; }

    static get xPos() { return this._xPos; }
    static set xPos(x) { this._xPos = x; }

    static get yPos() { return this._yPos; }
    static set yPos(x) { this._yPos = x; }


    static select() {
        let canvas = $(ToolsManager.canvas),
            context = ToolsManager.context;

        canvas.on('mousemove', $.proxy(this.draw, Pencil));
        canvas.on('mousedown', $.proxy(this.mouseMoveEvent, Pencil));
        canvas.on('mouseup mouseout', $.proxy(function () { this.mouseDown = false; }, Pencil));

        return this;
    }

    static unselect() {
        $('canvas').off();
    }

    static draw(e) {
        this.xPos = e.clientX - canvas.offsetLeft;
        this.yPos = e.clientY - canvas.offsetTop;

        if (this.mouseDown === true) {
            this.context.lineTo(this.xPos, this.yPos);
            this.context.stroke();
        }
    }

    static mouseMoveEvent() {
        this.mouseDown = true;
        this.context.beginPath();
        this.context.moveTo(this.xPos, this.yPos);
        canvas.on('mousemove', this.draw);
    }
}