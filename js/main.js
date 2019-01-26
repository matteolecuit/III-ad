var scale = 16;
var arrowCodes = new Map([
    [37, "left"],
    [38, "up"],
    [39, "right"],
    [40, "down"],
    [83, "shoot"],
    [68, "bomb"],
    [16, "focus"]
]);
var trackKeys = (codes) => {
    var pressed = new Map();
    codes.forEach(code => { pressed.set(code, false); });
    var handler = (event) => {
        if (codes.get(event.keyCode) !== undefined) {
            var down = event.type === "keydown";
            pressed.set(codes.get(event.keyCode), down);
            event.preventDefault();
        }
    };
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
};
var arrows = trackKeys(arrowCodes);
var runAnimation = (level, display) => {
    var lastTime = null;
    var frame = (time) => {
        if (lastTime !== null) {
            var step = Math.min(time - lastTime, 100) / 1000;
            level.calculFrame(step, arrows);
            display.drawFrame(step);
        }
        lastTime = time;
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
};
var runGame = () => {
    var level = new Level();
    var display = new CanvasDisplay(document.body, level);
    runAnimation(level, display);
};
window.onload = () => {
    runGame();
};
