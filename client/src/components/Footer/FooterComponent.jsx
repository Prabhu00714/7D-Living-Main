import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./style.css";

const FooterComponent = () => {
  const phoneNumber = "+919588440361";
  const instaID = "https://www.instagram.com/7dliving";
  const mailID = "contact@7dliving.com";

  return (
    <footer className="footer-container">
      <SocialIcon
        icon={`${process.env.PUBLIC_URL}/images/WhatsApp.png`}
        link={phoneNumber}
        isTel
      />
      <SocialIcon
        icon={`${process.env.PUBLIC_URL}/images/Instagram.png`}
        link={instaID}
      />
      <SocialIcon
        icon={`${process.env.PUBLIC_URL}/images/Email.png`}
        link={mailID}
        isMailto
      />
      {/* <div className="copyright-text">
        <Typography variant="body2">
          &copy; 2024 7D LIVING
        </Typography>
      </div> */}
    </footer>
  );
};

const SocialIcon = ({ icon, link, isTel, isMailto }) => {
  const formattedLink = isTel
    ? `tel:${link}`
    : isMailto
    ? `mailto:${link}`
    : link;

  return (
    <div className="social-icon">
      <img src={icon} alt="Icon" />
      <Typography variant="body2" sx={{ marginTop: "2px" }}>
        <Link
          href={formattedLink}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          {link}
        </Link>
      </Typography>
    </div>
  );
};

export default FooterComponent;
