const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

let firstContent = "";
let secondContent = "";

fs.readFile("first.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    firstContent = data;

    if (secondContent !== "") {
        emitter.emit("filesReady");
    }
});

fs.readFile("second.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    secondContent = data;

    if (firstContent !== "") {
        emitter.emit("filesReady");
    }
});

emitter.on("filesReady", () => {
    const combinedContent = firstContent + "\n" + secondContent;

    fs.writeFile("combined.txt", combinedContent, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Files combined successfully!");
    });
});