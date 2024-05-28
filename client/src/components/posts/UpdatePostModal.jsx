import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatePostData, setUpdatePostData] = useState(post);

  useEffect(() => {
    setUpdatePostData(post);
  }, [post]);

  const { title, description, url, status } = updatePostData || {};

  const onChangeUpdatePostForm = (e) =>
    setUpdatePostData({ ...updatePostData, [e.target.name]: e.target.value });

  const closeDialog = () => {
    setUpdatePostData(post)
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatePostData);
    setShowUpdatePostModal(false);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress</Modal.Title>
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
              onChange={onChangeUpdatePostForm}
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
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="YouTube Tutorial URL"
              name="url"
              required
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              as="select"
              name="status"
              required
              value={status}
              onChange={onChangeUpdatePostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="">
            {" "}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div className="" onClick={closeDialog}>
            <Button variant="secondary">Close</Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
