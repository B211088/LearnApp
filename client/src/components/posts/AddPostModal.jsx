import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost,  setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (envent) => {
    envent.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({
      show: true,
      message,
      type: success? "success" : "danger",
    })
  };

  const resetAddPostData = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text className="pl-1 text-red-600" id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              required
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Youte Tutorial URL"
              name="url"
              required
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="">
            {" "}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div className="">
            <Button onClick={closeDialog} variant="secondary">
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
