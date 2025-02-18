"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";

const Facebook = () => {
  const router = useRouter();
  const handClick = () => {
    router.push("/");
  };
  return (
    <div>
      Facebook
      <div>
        <Button variant="danger">TiepBX</Button>
        <button onClick={handClick}>back home</button>
      </div>
    </div>
  );
};

export default Facebook;
