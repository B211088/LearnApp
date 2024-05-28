import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  // Contexts
  const {
    authState: { user },
  } = useContext(AuthContext);

  const username = user?.username || "Guest";

  const {
    postState: {post, posts = [], postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Bắt đầu lấy dữ liệu posts khi component được mount
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  let body = null;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Learnit</Card.Title>
            <Card.Text>
              You have no post yet. Please create a new post.
            </Card.Text>
            <div>
              <Button
                variant="primary"
                onClick={() => setShowAddPostModal(true)}
              >
                Learnit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="w-full row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 bg-white border-none flex justify-start flex-wrap">
          {posts.map((post) => {
            // Kiểm tra nếu post không tồn tại hoặc không có _id
            if (!post || !post._id) return null;
            return (
              <Col key={post._id} className="my-2 bg-white border-none">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>
        <Button
          className="btn-floating w-[80px] h-[80px] bg-transparent border-none flex items-center justify-center"
          onClick={() => setShowAddPostModal(true)}
        >
          <img src={addIcon} alt="add-post" className="w-[50px]" />
        </Button>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      { post !== null &&
        <UpdatePostModal />
      }
      <Toast
        show={show}
        className={`fixed top-[10%] right-[10px] bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
