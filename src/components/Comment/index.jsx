import { useState } from "react";
import { getUserById } from "../../api/users";
import { getNaming } from "../../utils";
import "./styles.css";


const Comment = ( { nickname, text, author }) => {

const [username, setUsername] = useState(author)
getNaming(author).then(data => setUsername(data))

  return (
    <div className="cnCommentRoot">
      <span className="cnCommentName">{username}:</span>
      <span>{text}</span>
    </div>
  );
};

export default Comment;
