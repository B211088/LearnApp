import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Kiểm tra xem các trường cần thiết có được điền đầy đủ không
    if (!title || !description || !url) {
      setShowToast({
        show: true,
        message: "Vui lòng điền đầy đủ thông tin.",
        type: "danger",
      });
      return;
    }

    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
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
              placeholder="Tiêu đề"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text className="pl-1 text-red-600" id="title-help" muted>
              *bắt buộc
            </Form.Text>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Mô tả"
              name="description"
              required
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Đường link đến khóa học"
              name="url"
              required
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
          <Button onClick={closeDialog} variant="secondary">
            Đóng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
