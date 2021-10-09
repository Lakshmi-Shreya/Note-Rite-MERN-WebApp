import React, { useEffect, useState } from "react";
import CommonHeading from "../../components/CommonHeading";
import { Button, Card, Badge, Accordion } from "react-bootstrap";

// import notes from "../../../src/testData/notesList";
import { Link } from "react-router-dom";
import axios from "axios";

function MyNotes() {
  const [notes, setNotes] = useState([]);

  //function to confirm delete note
  async function deleteHandler(id) {
    const userToken = userData.token;

    if (window.confirm("Are you sure to delete the note?")) {
      const { data } = await axios.delete(`/deletenote/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(data);
      //redirecting to my notes screen once deletion is done
      const redirecting = async () => {
        window.location.reload();
      };
      await redirecting();
    }
  }
  // Taking user data from local storage
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  //function to fetch notes from backend through axios

  const fetchNotes = async () => {
    const userToken = userData.token;
    // console.log(token.token);
    const { data } = await axios.get("/allnotes", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(data);

    setNotes(data);
    // const resData = JSON.parse(data);
    // localStorage.setItem("notesInfo", JSON.stringify(resData));
  };
  console.log(notes);

  //useEffect hook to render certain functionality each time dependencies change,here no dependencies so renders each time the page is reloaded
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonHeading title={`Welcome Back ${userData && userData.name}`}>
      <Link to="/createNote">
        <Button size="md" style={{ margin: "15px 0" }}>
          Add New Note
        </Button>
      </Link>

      {notes.reverse().map((note) => (
        <Accordion key={note._id}>
          <Card style={{ marginBottom: "10px" }}>
            <Accordion.Toggle eventKey="0">
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    flex: 1,
                    fontSize: "20px",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {note.title}
                </span>
                <div>
                  {/* <Button
                    variant="success"
                    href={`/note/${note._id}`}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button> */}
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="warning" size="sm">
                    {note.category}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.body}</p>

                  <footer className="blockquote-footer">
                    {`Note Added on -${note.createdAt.substring(0, 10)}`}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </CommonHeading>
  );
}

export default MyNotes;
