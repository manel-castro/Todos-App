import React from "react";
import {
  FooterContainer,
  FooterWrap,
  FooterText,
  FooterLink,
} from "./Footer.elements";
function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterText>
          Designed by{" "}
          <FooterLink href="https://github.com/mane936">Manel</FooterLink>.
        </FooterText>
      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
