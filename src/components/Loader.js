import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
        style={{ height: "100px", width: "100px", marginBottom: "40px" }}
        alt="Logo"
      />
      <Circles
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
