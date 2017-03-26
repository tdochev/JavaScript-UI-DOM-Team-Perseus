class Engine {
    constructor() {
        this._selectedColor = ControlsManager.colors[0];
        this._selectedTool;
        this._lineWidth;

        ControlsManager.initiateControls();
    }

    get selectedColor() {
        return this._selectedColor;
    }
    set selectedColor(x) {
        this._selectedColor = x
    }
    get selectedTool() {
        return this._selectedTool;
    }
    set selectedTool(x) {
        this._selectedTool = x
    }
    get lineWidth() {
        return this._lineWidth;
    }
    set lineWidth(x) {
        this._lineWidth = x
    }
}

let engine = new Engine();