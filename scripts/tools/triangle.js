class Triangle {

    static get canvas() { return ToolsManager.fabricCanvas }

    static select() {
        let tri, isDown, origX, origY;

        Triangle.canvas.observe('mouse:down', (o) => {
            isDown = true;
            let pointer = Triangle.canvas.getPointer(o.e);
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

        Triangle.canvas.observe('mouse:move', (o) => {
            if (!isDown) return;
            let pointer = Triangle.canvas.getPointer(o.e);
            tri.set({ width: Math.abs(origX - pointer.x), height: Math.abs(origY - pointer.y) });
            Triangle.canvas.renderAll();
        });

        Triangle.canvas.on('mouse:up', (o) => {
            isDown = false;
        });
    }

    static unselect() {
        this.canvas.off();
    }

}