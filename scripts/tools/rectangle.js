class Rectangle {

    static get canvas() { return ToolsManager.fabricCanvas }

    static select() {
        let rect, isDown, origX, origY;

        Rectangle.canvas.on('mouse:down', (o) => {
            isDown = true;
            let pointer = Rectangle.canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
             pointer = Rectangle.canvas.getPointer(o.e);
            rect = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: pointer.x - origX,
                height: pointer.y - origY,
                angle: 0,
                fill: ToolsManager.selectedColor,
                transparentCorners: false
            });
            Rectangle.canvas.add(rect);
        });

        Rectangle.canvas.on('mouse:move', (o) => {
            if (!isDown) return;
            let pointer = Rectangle.canvas.getPointer(o.e);

            if (origX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(origX - pointer.x) });
            rect.set({ height: Math.abs(origY - pointer.y) });


            Rectangle.canvas.renderAll();
        });

        Rectangle.canvas.on('mouse:up', (o) => {
            isDown = false;
        });
    }

    static unselect() {
        this.canvas.off();
    }
}