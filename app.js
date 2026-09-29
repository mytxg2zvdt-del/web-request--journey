 const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const filePath = "./notes.json";

function readNotes() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data || "[]");
}

function writeNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const notes = readNotes();
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

app.post("/notes", (req, res) => {
  const notes = readNotes();

  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content
  };

  notes.push(newNote);
  writeNotes(notes);

  res.status(201).json(newNote);
});

app.put("/notes/:id", (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(
    (note) => note.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[index].title = req.body.title;
  notes[index].content = req.body.content;

  writeNotes(notes);

  res.json(notes[index]);
});

app.delete("/notes/:id", (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(
    (note) => note.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const deletedNote = notes.splice(index, 1)[0];
  writeNotes(notes);

  res.json(deletedNote);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});