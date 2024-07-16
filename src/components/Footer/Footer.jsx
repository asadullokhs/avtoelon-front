// Footer.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #1E90FF; // Dodger Blue
  color: white;
  padding: 40px 0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin-top: 20px;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.3em;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  margin: 20px 0 0;
  font-size: 1em;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterLinks>
        <FooterText>
          © {new Date().getFullYear()} Asadullokh. All Rights Reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
