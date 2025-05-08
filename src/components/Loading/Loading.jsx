import React from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

export default function Loading() {
  let { isLoading } = useSelector((state) => state.loadingSlice);
  console.log(" isLoading:", isLoading);

  if (!isLoading) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader color="#FFA725" size={200} speedMultiplier={3} />
    </div>
  );
}
