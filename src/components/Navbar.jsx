import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import api from "../api/axios";

const links = [
  { to: "/", label: "Asosiy", end: true },
  { to: "/about", label: "Maktab haqida" },
  { to: "/news", label: "Yangiliklar" },
  { to: "/teachers", label: "O'qituvchilar" },
  { to: "/contact", label: "Aloqa" },
];

const SiteNavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ news: [], teachers: [] });
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchWrapRef = useRef(null);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults({ news: [], teachers: [] });
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const [newsRes, teachersRes] = await Promise.all([
          api.get("/news"),
          api.get("/teachers"),
        ]);

        const lower = term.toLowerCase();

        const matchedNews = newsRes.data.filter(
          (n) =>
            n.status === "published" &&
            (n.title?.toLowerCase().includes(lower) ||
              n.content?.toLowerCase().includes(lower)),
        );

        const matchedTeachers = teachersRes.data.filter(
          (t) =>
            `${t.name} ${t.surname}`.toLowerCase().includes(lower) ||
            t.subject?.toLowerCase().includes(lower),
        );

        setResults({ news: matchedNews, teachers: matchedTeachers });
        setShowDropdown(true);
      } catch (err) {
        console.error("Qidiruvda xato:", err);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalResults = results.news.length + results.teachers.length;

  const goTo = (path) => {
    setShowDropdown(false);
    setQuery("");
    navigate(path);
  };

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
            <div
              ref={searchWrapRef}
              className="position-relative d-none d-md-block"
              style={{ maxWidth: 220 }}
            >
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <Search size={14} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Qidiruv..."
                  className="border-start-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query.trim() && setShowDropdown(true)}
                />{" "}
              </InputGroup>

              {showDropdown && (
                <div
                  className="position-absolute bg-white border rounded shadow-sm mt-1"
                  style={{
                    width: 320,
                    right: 0,
                    maxHeight: 380,
                    overflowY: "auto",
                    zIndex: 1050,
                  }}
                >
                  {searching ? (
                    <p className="p-3 mb-0 small text-muted">Qidirilmoqda...</p>
                  ) : totalResults === 0 ? (
                    <p className="p-3 mb-0 small text-muted">
                      Hech narsa topilmadi
                    </p>
                  ) : (
                    <>
                      {results.news.length > 0 && (
                        <div>
                          <p className="px-3 pt-3 pb-1 mb-0 small fw-semibold text-muted text-uppercase">
                            Yangiliklar
                          </p>
                          {results.news.map((n) => (
                            <button
                              key={n._id}
                              type="button"
                              onClick={() => goTo(`/news/${n._id}`)}
                              className="d-block w-100 text-start px-3 py-2 border-0 bg-white"
                              style={{ fontSize: 13 }}
                            >
                              <div className="fw-semibold">{n.title}</div>
                              <div className="text-muted text-truncate">
                                {n.content}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {results.teachers.length > 0 && (
                        <div>
                          <p className="px-3 pt-3 pb-1 mb-0 small fw-semibold text-muted text-uppercase">
                            O'qituvchilar
                          </p>
                          {results.teachers.map((t) => (
                            <button
                              key={t._id}
                              type="button"
                              onClick={() => goTo("/teachers")}
                              className="d-block w-100 text-start px-3 py-2 border-0 bg-white"
                              style={{ fontSize: 13 }}
                            >
                              <div className="fw-semibold">
                                {t.name} {t.surname}
                              </div>
                              <div className="text-muted">{t.subject}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <Button
              className="btn-navy"
              size="sm"
              onClick={() =>
                (window.location.href =
                  "https://maktab16-admin.netlify.app/login")
              }
            >
              Kirish
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavBar;
