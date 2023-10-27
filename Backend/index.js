import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import UserRoutes from "./Routes/user.js"
import PostRoutes from "./Routes/post.js"
import LikeRoutes from "./Routes/like.js"
import CommentRoutes from "./Routes/comment.js"
import AuthRoutes from "./Routes/auth.js"
import RelationRoutes from "./Routes/relation.js"
import UploadRoutes from "./Routes/uploadFile.js"
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors(
        {
            origin: "http://localhost:3001",
        }
    )
);
app.use(cookieParser())

app.use("/api/v1/users", UserRoutes)
app.use("/api/v1/posts", PostRoutes)
app.use("/api/v1/likes", LikeRoutes)
app.use("/api/v1/comments", CommentRoutes)
app.use("/api/v1/relations", RelationRoutes)
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/upload", UploadRoutes)
app.get('/', (req, res) => {
    res.send("<h1>Welcome to social NodeJs app</h1>");
});
app.listen(8800, () => {
    console.log("Api")
})