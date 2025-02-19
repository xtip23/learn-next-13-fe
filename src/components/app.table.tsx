"use client";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
}

const AppTable = (props: IProps) => {
  const { blogs } = props;
  console.log("blogs", props);

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    if (confirm(`Do you want to delete blog have id: ${id}?`) == true) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.info("Delete blog succeed!");
            mutate("http://localhost:8000/blogs");
          } else {
            toast.error("Delete blog failed!");
          }
        });
    } else {
    }
  };

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link href={`/blogs/${item.id}`}>
                    <Button>View</Button>
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setBlog(item);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default AppTable;
