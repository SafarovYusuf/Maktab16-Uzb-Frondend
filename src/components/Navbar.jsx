import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Globe } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const SiteNavBar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ news: [], teachers: [] });
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchWrapRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLangLabel =
    {
      uz: "UZ",
      ru: "RU",
      en: "EN",
    }[i18n.language?.slice(0, 2)] || "UZ";

  const links = [
    { to: "/", label: t("nav_home"), end: true },
    { to: "/about", label: t("nav_about") },
    { to: "/news", label: t("nav_news") },
    { to: "/teachers", label: t("nav_teachers") },
    { to: "/students", label: t("nav_students") },
    { to: "/contact", label: t("nav_contact") },
  ];

  return (
    <Navbar expand="lg" sticky="top" className="site-navbar py-2">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          School 16
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            {links.map((l) => (
              <Nav.Link
                key={l.to}
                as={NavLink}
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {l.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* 🌐 1 DONA CHIROYLI TIL SELEKTORI (DROPDOWN) */}
            <Dropdown align="end">
              <Dropdown.Toggle
                size="sm"
                variant="outline-secondary"
                className="d-flex align-items-center gap-1 border-slate-200 fw-semibold"
              >
                <Globe size={14} />
                <span>{currentLangLabel}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm border-0 mt-1">
                <Dropdown.Item
                  active={i18n.language?.startsWith("uz")}
                  onClick={() => changeLanguage("uz")}
                >
                  🇺🇿 O'zbekcha (UZ)
                </Dropdown.Item>
                <Dropdown.Item
                  active={i18n.language?.startsWith("ru")}
                  onClick={() => changeLanguage("ru")}
                >
                  🇷🇺 Русский (RU)
                </Dropdown.Item>
                <Dropdown.Item
                  active={i18n.language?.startsWith("en")}
                  onClick={() => changeLanguage("en")}
                >
                  🇬🇧 English (EN)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Kirish Tugmasi */}
            <Button
              className="btn-navy ms-1"
              size="sm"
              onClick={() =>
                (window.location.href =
                  "https://maktab16-admin.netlify.app/login")
              }
            >
              {t("nav_login")}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavBar;
