import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let articles = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { articles });
});

app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  const article = articles.find(article => article.id === parseInt(id));
  res.render("article.ejs", { article });
});

app.get("/articles", (req, res) => {
  res.render("articles.ejs", { articles });
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs", { articles });
});

app.post("/admin", (req, res) => {
  const { judul, konten } = req.body;
  const newArticle = {id: articles.length + 1, judul, konten };
  articles.push(newArticle);
  res.redirect("/admin");
});

app.get('/articles/:id/edit', (req, res) => {
  const id = req.params.id;
  const article = articles.find(article => article.id === parseInt(id));
  res.render('edit.ejs', { article });
});

app.post('/articles/:id/edit', (req, res) => {
  const id = req.params.id;
  const updatedArticle = {
    id: parseInt(id),
    judul: req.body.judul,
    konten: req.body.konten
  };

  const index = articles.findIndex(article => article.id === parseInt(id));
  articles[index] = updatedArticle;

  res.redirect('/admin');
});

app.post('/admin/articles/:id/delete', (req, res) => {
  const id = req.params.id;
  articles = articles.filter(article => article.id !== parseInt(id));
  res.redirect('/admin');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});