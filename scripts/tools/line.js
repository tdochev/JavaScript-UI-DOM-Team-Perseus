class Line {

    static get canvas() { return ToolsManager.fabricCanvas; }

    static select() {
        var line, isDown;

        Line.canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = Line.canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: 5,
                fill: ToolsManager.selectedColor,
                stroke: ToolsManager.selectedColor,
                originX: 'center',
                originY: 'center'
            });
            Line.canvas.add(line);
        });

        Line.canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = Line.canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            Line.canvas.renderAll();
        });

        Line.canvas.on('mouse:up', function (o) {
            isDown = false;
        });
    }

    static unselect() {
        Line.canvas.off();
    }
}