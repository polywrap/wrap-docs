import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [wrapUri, setWrapUri] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div>Welcome to wrap-docs!</div>
      <div>Wrap URI:</div>
      <div>
        <input onChange={(e) => setWrapUri(e.target.value)}></input>
        <button
          onClick={() => {
            navigate("wrap/" + encodeURIComponent(wrapUri));
          }}
        >
          Get docs
        </button>
      </div>
    </>
  );
}

export default Home;
