import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import ProgressBar from "react-bootstrap/ProgressBar";

const Dashboard = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const username = user?.username || "Guest";

  const {
    postState: { post, posts = [], postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  
  const completedPosts = useMemo(
    () =>
      (posts || []).filter((post) => post && post.status === "LEARNED").length,
    [posts]
  );

  const progress = useMemo(
    () => (completedPosts / posts.length) * 100,
    [completedPosts, posts]
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = posts.filter((post) => 
    post && post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let body = null;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Card className="text-center mx-5 my-5">
        <Card.Header as="h1">Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to Learn App</Card.Title>
          <Card.Text>
            Bạn hiện đang không có bài học nào, hãy tạo bài học mới
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => setShowAddPostModal(true)}
          >
            Thêm bài học đầu tiên
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <div className="w-full px-[10px] mt-[30px]">
          <div className="search-container flex items-center py-[10px] px-[10px] border-[1px] border-gray-400 rounded-[5px] ">
            <div className="h-[38px] flex items-center gap-[5px] ">
                <h6 className=" text-gray-700 ">Tiến độ: </h6>
                <ProgressBar
                  className="w-[140px]"
                  now={progress}
                  label={`${Math.round(progress)}%`}
                />
              </div>
          </div>
        </div>
        <Row className="w-full row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 bg-white border-none flex justify-start flex-wrap">
          {filteredPosts.length === 0 ? (
            <Col className="my-2 text-center" style={{ width: "100%" }}>
              <p>Không tìm thấy bài học nào!</p>
            </Col>
          ) : (
            filteredPosts.map((post) => {
              if (!post || !post._id) return null;

              return (
                <Col key={post._id} className="my-2 bg-white border-none">
                  <SinglePost post={post} />
                </Col>
              );
            })
          )}
        </Row>

        <Button
          className="fixed bottom-[10%] right-[2%] w-[50px] h-[50px] bg-slate-400 border-none flex items-center justify-center rounded-full text-[1.4rem]"
          onClick={() => setShowAddPostModal(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
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
