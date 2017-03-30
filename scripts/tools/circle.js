class Circle {

    static get canvas() { return ToolsManager.fabricCanvas; }

    static select() {
        let circle, isDown, origX, origY;

        Circle.canvas.observe('mouse:down', (o) => {
            isDown = true;
            let pointer = Circle.canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            circle = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                radius: 1,
                strokeWidth: 1,
                fill: ToolsManager.selectedColor,
                selectable: true,
                originX: 'center', originY: 'center'
            });
            Circle.canvas.add(circle);
        });

        Circle.canvas.observe('mouse:move', (o) => {
            if (!isDown) return;
            let pointer = Circle.canvas.getPointer(o.e);
            circle.set({ radius: Math.abs(origX - pointer.x) });
            Circle.canvas.renderAll();
        });

        Circle.canvas.on('mouse:up', (o) => {
            isDown = false;
        });
    }

    static unselect() {
        this.canvas.off();
    }
}