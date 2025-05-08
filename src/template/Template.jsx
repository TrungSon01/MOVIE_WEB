import React from "react";
import Header from "../components/Header/Header";

export default function Template({ content }) {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className=" space-y-10 flex flex-col"
    >
      <Header />
      <div className="grow ">{content}</div>
      <footer className="h-20 bg-black">Footer</footer>
    </div>
  );
}
