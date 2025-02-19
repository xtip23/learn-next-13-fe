"use client";
import Link from "next/link";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";

const ViewDetail = ({ params }: { params: { id: string } }) => {
  console.log("props", params);

  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="my-3">
        <Link href={"/blogs"}>Go Back</Link>
      </div>
      <Card className="text-center">
        <Card.Title>Title: {data?.title}</Card.Title>

        <Card.Body>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>

        <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
      </Card>
    </div>
  );
};

export default ViewDetail;
