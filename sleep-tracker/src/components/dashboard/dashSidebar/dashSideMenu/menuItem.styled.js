import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  border-left: 3px solid
    ${(props) => (props.active ? props.theme.activeMenu : "transparent")};
  width: 100%;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  margin: 15% 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  text-align: center;
  color: #536dfe;
  transition: 0.2s color ease;
  &:visited,
  actiive {
    color: #536dfe;
  }
  &:hover {
    color: #00b0ff;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
