import { useState, useRef, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  const [expanded, setExpanded] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const cardTextRef = useRef(null);

  useEffect(() => {
    const checkHeight = () => {
      if (cardTextRef.current) {
        setButtonVisible(cardTextRef.current.scrollHeight > 60);
      }
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [description]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="shadow flex-1"
      border={
        status === "LEARNED"
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
                className="rounded-[5px] px-[20px]"
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
              <div className="flex items-center justify-end gap-[10px]">
                <ActionButtons
                  className="border-[2px] border-b-gray-800"
                  url={url}
                  _id={_id}
                />
              </div>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text
          ref={cardTextRef}
          className={`text-left bg-slate-100 py-[5px] px-[20px] rounded-[5px] ${
            expanded ? "h-auto" : "h-[60px]"
          } overflow-hidden relative transition-height duration-300`}
        >
          {description}
          {isButtonVisible && (
            <div
              className="absolute bottom-[18%] right-[3%] h-[10px] w-[10px] text-[20px] leading-[10px] cursor-pointer"
              onClick={handleToggleExpand}
            >
              <i
                className={`fa-solid ${
                  expanded ? "fa-caret-up" : "fa-caret-down"
                }`}
              ></i>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
