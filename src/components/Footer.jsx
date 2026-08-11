import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, Telegram, Twitter } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next"; // ✅ i18n
import api from "../api/axios";

const Footer = () => {
  const { t } = useTranslation(); // ✅
  const year = new Date().getFullYear();

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        const { data } = await api.get("/school");
        setSchool(data);
      } catch (err) {
        console.error("Maktab ma'lumotlarini yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSchool();
  }, []);

  if (loading) return null;

  return (
    <footer className="site-footer pt-5 pb-4 mt-5">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <h5 className="text-white fw-bold mb-2">
              {school?.name || "School 16"}
            </h5>
            <p className="small mb-0">{t("footer_ministry")}</p>
          </Col>
          <Col xs={6} md={4}>
            <h6>{t("footer_menus")}</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/">{t("nav_home")}</a>
              </li>
              <li className="mb-2">
                <a href="/about">{t("nav_about")}</a>
              </li>
              <li className="mb-2">
                <a href="/news">{t("nav_news")}</a>
              </li>
              <li className="mb-2">
                <a href="/teachers">{t("nav_teachers")}</a>
              </li>
              <li className="mb-2">
                <a href="/students">{t("nav_students")}</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={4}>
            <h6>{t("nav_contact")}</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">{school?.address || "—"}</li>
              <li className="mb-2">{school?.phone || "—"}</li>
              <li className="mb-2">{school?.email || "—"}</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <Row className="align-items-center g-3">
          <Col xs={12} md={6} className="small">
            © {year} {school?.name || "School 16"}. {t("footer_rights")}
          </Col>
          <Col xs={12} md={6} className="d-flex gap-3 justify-content-md-end">
            <a href="#">
              <Facebook size={18} />
            </a>
            <a href="#">
              <Instagram size={18} />
            </a>
            <a href="#">
              <Telegram size={18} />
            </a>
            <a href="#">
              <Twitter size={18} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
