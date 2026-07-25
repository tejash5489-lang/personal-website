const path = require("path");
const fs = require("fs");
const express = require("express");

const projects = require("./data/projects");
const { getAllNotes, getNoteBySlug } = require("./lib/notes");

const app = express();
const PORT = process.env.PORT || 3000;

const profile = {
  name: "Tejash Gupta",
  role: "Full-Stack Developer",
  location: "Lucknow, India",
  education: "B.Tech, NSUT Delhi",
  status: "Final-year student at NSUT — open to internships & full-time roles",
  bio: "I'm a full-stack developer with a passion for creating high-quality web applications from concept to deployment. Currently pursuing a B.Tech at NSUT Delhi, I enjoy tackling challenging engineering problems, optimizing performance, and building products powered by modern technologies and AI. I'm always eager to learn, experiment, and ship impactful solutions.",
  backstageIntro:
    "I enjoy documenting what I build and the lessons I learn throughout the development process. My journal focuses on project architecture, debugging complex issues, performance optimizations, and experimenting with new technologies in full-stack development and AI. While I don't have a public engineering blog yet, I regularly maintain personal notes and project documentation to reflect on challenges, solutions, and best practices.",
  email: "tejash5489@gmail.com",
  github: "https://github.com/tejash5489-lang",
  linkedin: "https://www.linkedin.com/in/tejash-gupta-508c30287",
};

const resumePath = path.join(__dirname, "public", "resume", "resume.pdf");
const hasResume = fs.existsSync(resumePath);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const notes = getAllNotes().slice(0, 3);
  res.render("index", { profile, projects, notes, hasResume, page: "home" });
});

app.get("/notes", (req, res) => {
  const notes = getAllNotes();
  res.render("notes", { profile, notes, page: "notes" });
});

app.get("/notes/:slug", (req, res) => {
  const note = getNoteBySlug(req.params.slug);
  if (!note) return res.status(404).render("404", { profile, page: "" });
  res.render("note", { profile, note, page: "notes" });
});

app.use((req, res) => {
  res.status(404).render("404", { profile, page: "" });
});

app.listen(PORT, () => {
  console.log(`Tejash Gupta's site running at http://localhost:${PORT}`);
});
