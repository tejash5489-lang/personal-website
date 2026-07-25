const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const NOTES_DIR = path.join(__dirname, "..", "content", "notes");

function getAllNotes() {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || null,
        excerpt: data.excerpt || "",
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getNoteBySlug(slug) {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || null,
    excerpt: data.excerpt || "",
    html: marked.parse(content),
  };
}

module.exports = { getAllNotes, getNoteBySlug };
