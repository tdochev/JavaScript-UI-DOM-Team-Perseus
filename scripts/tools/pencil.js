class Pencil {
    static get canvas() { return ToolsManager.fabricCanvas; }

    static get mouseDown() { return this._mouseDown; }
    static set mouseDown(x) { this._mouseDown = x; }

    static get xPos() { return this._xPos; }
    static set xPos(x) { this._xPos = x; }

    static get yPos() { return this._yPos; }
    static set yPos(x) { this._yPos = x; }


    static select() {
        if(!ToolsManager.selectedColor) {return}
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.color = ToolsManager.selectedColor;
        this.canvas.freeDrawingBrush.width = 5;
        this.canvas.renderAll();
    }

    static unselect() {
        this.canvas.isDrawingMode = false;
    }
}