import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => (
  <Card
    className="shadow flex-1 "
    border={
      status == "LEARNED"
        ? "success"
        : status === "LEARNING"
        ? "warning"
        : "danger"
    }
  >
    <Card.Body>
      <Card.Title className="text-left">
        <Row>
          <Col>
            <p className="post-title pl-1">{title}</p>
            <Badge
              pill
              bg={
                status === "LEARNED"
                  ? "success"
                  : status === "LEARNING"
                  ? "warning"
                  : "danger"
              }
            >
              {status}
            </Badge>
          </Col>
          <Col className="text-right">
            <div className="flex items-center justify-end">
            <ActionButtons url={url} _id={_id} />
            </div>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text className="text-left pl-1">{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default SinglePost;
