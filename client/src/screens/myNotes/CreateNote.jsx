import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import ToastMgs from "../../components/ToastMgs";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import CommonHeading from "../../components/CommonHeading";
function CreateNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  // Taking user data from local storage
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  // submitting users credentials to backend and receiving response from backend
  const submitHandler = async (e) => {
    const userToken = userData.token;
    //to prevent page reloading upon submission
    e.preventDefault();

    //using loading component for rotating slider
    setLoading(true);
    //making request to backend end point through axios
    try {
      const { data } = await axios.post(
        "/createnote",
        {
          title,
          body,
          category,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // calling actions to send user information to redux store

      //    setError(false);
      // console.log(data);
      //storing into local storage
      console.log(data);
      setLoading(false);
      //redirecting to login screen once registeration is done
      const redirecting = async () => {
        history.push("/MyNotes");
      };
      await redirecting();
      //showing error messages if any
    } catch (error) {
      setError(error.response.data.msg);
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setBody("");
  };
  return (
    <CommonHeading title={`Note Riter - ${userData.name}`}>
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ToastMgs variant="danger">{error}</ToastMgs>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={body}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </CommonHeading>
  );
}

export default CreateNote;
