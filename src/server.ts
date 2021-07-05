import express from "express";
import path from "path";

import { renderFile } from "ejs";

import routes from "./routes";

const app = express();
const viewsPath = path.resolve(__dirname, "views");

app.use(express.json());
app.use(routes);
app.use(express.static("public"));

app.set("view engine", "html");
app.set("views", viewsPath);

app.engine("html", renderFile);

app.listen(3333, () => console.log("The server is running..."));
