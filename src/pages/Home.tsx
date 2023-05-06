import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkButton = styled.div`
  padding: 1rem;
  color: #fff;
  font-size: 1.5rem;
`;

const links = ["http/http://localhost:3000/sample", "ens/wraps.eth:ens@1.1.0"];

function Home() {
  return (
    <>
      {links.map((link) => (
        <Link to={"wrap/" + encodeURIComponent(link)}>
          <LinkButton>{link}</LinkButton>
        </Link>
      ))}
    </>
  );
}

export default Home;
