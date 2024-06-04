import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  color: white;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px;

  justify-content: center;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;

  gap: 15px;
  margin: 0;
  padding: 0;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  background: #61dafb;
  border: none;
  color: black;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #21a1f1;
  }
`;
