class Triangle {

    static get canvas() { return ToolsManager.fabricCanvas }

    static select() {
        $("#selec").click(function () {
            Triangle.canvas.isDrawingMode = false;
            Triangle.canvas.selection = true;
            Triangle.canvas.off('mouse:down');
            Triangle.canvas.off('mouse:move');
            Triangle.canvas.off('mouse:up');
            Triangle.canvas.forEachObject(function (o) { o.setCoords() })
        })
        var tri, isDown, origX, origY;

        Triangle.canvas.observe('mouse:down', function (o) {
            isDown = true;
            var pointer = Triangle.canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            tri = new fabric.Triangle({
                left: pointer.x,
                top: pointer.y,
                strokeWidth: 1,
                width: 2, height: 2,
                fill: ToolsManager.selectedColor,
                selectable: true,
                originX: 'center'

            });
            Triangle.canvas.add(tri);
        });

        Triangle.canvas.observe('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = Triangle.canvas.getPointer(o.e);
            tri.set({ width: Math.abs(origX - pointer.x), height: Math.abs(origY - pointer.y) });
            Triangle.canvas.renderAll();
        });

        Triangle.canvas.on('mouse:up', function (o) {
            isDown = false;
        });
    }

    static unselect() {
        this.canvas.off();
    }

}