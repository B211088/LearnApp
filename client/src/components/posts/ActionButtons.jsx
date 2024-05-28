import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);

  const chossePost =  (postId) => {
    findPost(postId)
    setShowUpdatePostModal(true);
  }

  return (
    <>
      <div className="">
        {" "}
        <Button
          className="post-button bg-white border-none"
          href={url}
          target="_blank"
        >
          <img src={playIcon} alt="play" className="w-[32px] h-[32px]" />
        </Button>
      </div>
      <div className="">
        <Button className="post-button bg-white border-none" onClick={chossePost.bind(this, _id)}>
          <img src={editIcon} alt="edit" className="w-[24px] h-[24px]" />
        </Button>
      </div>
      <div className="">
        <Button
          className="post-button bg-white border-none"
          onClick={deletePost.bind(this, _id)}
        >
          <img src={deleteIcon} alt="delete" className="w-[24px] h-[24px]" />
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
