import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LinkButton = styled.div`
  padding: 1rem;
  color: #fff;
  font-size: 1.5rem;
`;

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
