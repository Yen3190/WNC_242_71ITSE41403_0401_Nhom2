import React from "react";
import { FooterContainer, BoxContainer, Box, Credit, StyledLink, ContactImage } from "./style";
import c from "../../assets/images/c.png"

const Footer = () => {
  return (
    <FooterContainer>
      <BoxContainer>
        <Box>
          <h3>Quick links</h3>
          <StyledLink href="#home">Home</StyledLink>
          <StyledLink href="#about">About</StyledLink>
          <StyledLink href="#products">Products</StyledLink>
          <StyledLink href="#review">Review</StyledLink>
          <StyledLink href="#contact">Contact</StyledLink>
        </Box>

        <Box>
          <h3>Extra Links</h3>
          <StyledLink href="#home">My Account</StyledLink>
          <StyledLink href="#about">My Order</StyledLink>
          <StyledLink href="#products">My Favorite</StyledLink>
        </Box>

        <Box>
          <h3>Locations</h3>
          <StyledLink href="#home">USA</StyledLink>
          <StyledLink href="#about">Vietnam</StyledLink>
          <StyledLink href="#products">France</StyledLink>
          <StyledLink href="#review">England</StyledLink>
        </Box>

        <Box>
          <h3>Contact Info</h3>
          <StyledLink href="#home">+84-942-432-8492</StyledLink>
          <StyledLink href="#about" className="e1">yourflowersgarden@gmail.com</StyledLink>
          <StyledLink href="#products">Ho Chi Minh City, Vietnam</StyledLink>
          <ContactImage src={c} alt="Contact" />
        </Box>
      </BoxContainer>

      <Credit> Created By <span style={{color:"#e76f8b"}}> DangNgocHongYen - 2274802011043</span> || All Rights Reserved </Credit>
    </FooterContainer>
  );
};

export default Footer;
