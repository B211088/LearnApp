import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      deletePost(postId);
    }
  };

  return (
    <>
      <div>
        <Button
          className="w-[30px] h-[30px] bg-white text-gray-800 border-[1px] border-gray-800 text-[0.9rem] leading-[30px] text-center p-0 hover:text-red-400"
          href={url}
        >
          <i className="fa-solid fa-play"></i>
        </Button>
      </div>
      <div>
        <Button
          className="w-[30px] h-[30px] bg-white text-gray-800 border-[1px] border-gray-800 text-[0.9rem] leading-[30px] text-center p-0 hover:text-red-400"
          onClick={() => choosePost(_id)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Button>
      </div>
      <div>
        <Button
          className="w-[30px] h-[30px] bg-white text-gray-800 border-[1px] border-gray-800 text-[0.9rem] leading-[30px] text-center p-0 hover:text-red-400"
          onClick={() => handleDelete(_id)}
        >
          <i className="fa-solid fa-circle-minus"></i>
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
