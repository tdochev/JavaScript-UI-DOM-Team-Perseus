class DrawingCanvas {
    static get canvas() { return document.getElementById('canvas'); }

    static get context() { return this.canvas.getContext('2d'); }

    static get mouseDown() { return this._mouseDown; }
    static set mouseDown(x) { this._mouseDown = x; }

    static get xPos() { return this._xPos; }
    static set xPos(x) { this._xPos = x; }

    static get yPos() { return this._yPos; }
    static set yPos(x) { this._yPos = x; }


    static init() {
        this.loadImage();

        $(this.canvas).on('mousemove', $.proxy(this.draw, DrawingCanvas));
        $(this.canvas).on('mousedown', $.proxy(this.mouseMoveEvent, DrawingCanvas));
        $(document.documentElement).on('mouseup', $.proxy(function () {
            this.mouseDown = false;
            localStorage.setItem("image", this.canvas.toDataURL());
        }, DrawingCanvas));

        return this;
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
        $(this.canvas).on('mousemove', this.draw);
    }

    static loadImage() {
        var img = new Image();
        img.onload = $.proxy(function() {
            this.context.drawImage(img, 0, 0);
        }, DrawingCanvas);
        var storedImage = localStorage.getItem("image");
        if(storedImage !== null) {
            img.src = storedImage;
        }
    }
}