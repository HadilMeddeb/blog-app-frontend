import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const publicFolder= "localhost:3000/images/"
  return (
    <div className="post">
      {post.photo && (<img
        className="postImg"
        src={publicFolder+post.photo}
        alt={post.title}
      />)}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category)=>{return <span key={category._id} className="postCat">
            <Link className="link" to={"/posts/category/" + category._id}>
                {category.name}         
            </Link>
          </span>})}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {post.desc}
      </p>
    </div>
  );
}