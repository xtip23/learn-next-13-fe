"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    if (!title) {
      toast.error("Not emptry title!");
      return;
    }
    if (!author) {
      toast.error("Not emptry author!");
      return;
    }
    if (!content) {
      toast.error("Not emptry content!");
      return;
    }
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Create new blog succeed!");
          handleClose();
          mutate("http://localhost:8000/blogs");
        } else {
          toast.error("Create new blog failed!");
        }
      });

    // toast.success("Create Succeed !!!!");
    // console.log("check data form: ", title, author, content);
  };

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="author"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
