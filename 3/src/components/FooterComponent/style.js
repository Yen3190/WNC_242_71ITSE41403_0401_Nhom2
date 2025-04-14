import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: var(--white);
  padding: 2rem 0;
  margin-top: auto; /* Đẩy Footer xuống dưới cùng */
  width: 100%;
  font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
`;

export const BoxContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
  gap: 1.5rem;
  align-items: flex-start;
`;

export const Box = styled.div`
  h3 {
    font-size: 2.5rem;
    color: black;
    font-weight: bolder;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }
`;

export const StyledLink = styled.a`
  font-size: 1.7rem;
  color: var(--light-color);
  padding: 1rem 0;
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #e76f8b;
  }
`;

export const ContactImage = styled.img`
  width: 300px;
  margin-top: 1rem;
`;

export const Credit = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 2.5rem;
  font-size: 2rem;
  color: #333;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);

  span {
    color: var(--pink);
  }
`;


export const EmailText = styled.p`
  text-transform: lowercase;
`;
