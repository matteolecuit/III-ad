var scale: number = 16;

var arrowCodes = new Map<number, string>([
    [37, "left"],
    [38, "up"],
    [39, "right"],
    [40, "down"],
    [83, "shoot"],
    [68, "bomb"],
    [16, "focus"]
]);

var trackKeys = (codes: Map<number, string>): Map<string, boolean> => {
    var pressed = new Map<string, boolean>();
    codes.forEach(code => { pressed.set(code, false); });
    var handler = (event: KeyboardEvent): void => {
        if (codes.get(event.keyCode) !== undefined) {
            var down: boolean = event.type === "keydown";
            pressed.set(codes.get(event.keyCode), down);
            event.preventDefault();
        }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
}

var arrows: Map<string, boolean> = trackKeys(arrowCodes);

var runAnimation = (level: Level, display: CanvasDisplay): void => {
    var lastTime: number = null;
    var frame = (time: number): void => {
        if (lastTime !== null) {
            var step: number = Math.min(time - lastTime, 100) / 1000;
            level.calculFrame(step, arrows);
            display.drawFrame(step);
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

var runGame = (): void => {
    var level: Level = new Level();
    var display: CanvasDisplay = new CanvasDisplay(document.body, level);
    runAnimation(level, display);
}

window.onload = (): void => {
    runGame();
};