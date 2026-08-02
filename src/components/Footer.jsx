import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, Telegram, Twitter } from "react-bootstrap-icons";
import api from "../api/axios";

const Footer = () => {
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

  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <footer className="site-footer pt-5 pb-4 mt-5">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <h5 className="text-white fw-bold mb-2">
              {school?.name || "School 16"}
            </h5>
            <p className="small mb-0">
              O'zbekiston Respublikasi Xalq ta'limi vazirligi tasarrufidagi
              16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi.
            </p>
          </Col>
          <Col xs={6} md={4}>
            <h6>Menyular</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/">Asosiy</a>
              </li>
              <li className="mb-2">
                <a href="/about">Maktab haqida</a>
              </li>
              <li className="mb-2">
                <a href="/news">Yangiliklar</a>
              </li>
              <li className="mb-2">
                <a href="/teachers">O'qituvchilar</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={4}>
            <h6>Bog'lanish</h6>
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
            © {year} {school?.name || "School 16"}. Barcha huquqlar
            himoyalangan.
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
