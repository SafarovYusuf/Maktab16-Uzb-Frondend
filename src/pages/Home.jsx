import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const Home = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [school, setSchool] = useState({
    studentCount: 0,
    teacherCount: 0,
    classRoomCount: 0,
    roomCount: 0,
  });

  useEffect(() => {
    const loadNews = async () => {
      try {
        const { data } = await api.get("/news");
        setNews(data.slice(0, 3));
      } catch (err) {
        console.error("Yangiliklarni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadSchool = async () => {
      try {
        const { data } = await api.get("/school");
        if (data) {
          setSchool({
            studentCount: data.studentCount || 0,
            teacherCount: data.teacherCount || 0,
            classRoomCount: data.classRoomCount || 0,
            roomCount: data.roomCount || 0,
          });
        }
      } catch (err) {
        console.error("Maktab statistikasini yuklashda xato:", err);
      }
    };

    loadNews();
    loadSchool();
  }, []);

  // ✅ Dinamik va har safar o'zgarganda qayta hisoblanadigan stats:
  const stats = [
    { value: school.studentCount, label: t("stat_students") },
    { value: school.teacherCount, label: t("stat_teachers") },
    { value: school.classRoomCount, label: t("stat_classrooms") },
    { value: school.roomCount, label: t("stat_clubs") },
  ];

  return (
    <div className="container">
      {/* ---------- HERO ---------- */}
      <Container className="pt-4">
        <div className="hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop"
            alt="Maktab binosi"
          />
          <div className="hero-overlay" />
          <div className="hero-content text-white" style={{ maxWidth: 560 }}>
            <h1 className="fw-bold display-6">{t("hero_title")}</h1>
            <p className="mb-4 opacity-75">{t("hero_desc")}</p>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/about" className="btn-gold">
                {t("btn_more")}
              </Button>
              <Button as={Link} to="/contact" variant="outline-light">
                {t("btn_contact")}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ---------- STATISTIKA ---------- */}
      <div className="stats-bar mx-2 rounded-5 mt-4 py-4">
        <Container>
          <Row className="text-center g-3">
            {stats.map((s, idx) => (
              <Col xs={6} md={3} key={idx}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ---------- SO'NGGI YANGILIKLAR ---------- */}
      <div className="bg-white py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title mb-0">{t("latest_news")}</h2>
            <Link to="/news" className="small fw-semibold">
              {t("all_news_link")}
            </Link>
          </div>

          {loading ? (
            <p className="text-muted">Yuklanmoqda...</p>
          ) : news.length === 0 ? (
            <p className="text-muted">{t("no_news")}</p>
          ) : (
            <Row className="g-4">
              {news.map((item) => (
                <Col xs={12} md={4} key={item._id}>
                  <Link
                    to={`/news/${item._id}`}
                    className="surface-card d-block h-100 overflow-hidden hover-lift text-decoration-none"
                  >
                    {item.image && (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `https://16.maktab16.uz${item.image}`
                        }
                        alt={item.title}
                        className="w-100"
                        style={{ height: 170, objectFit: "cover" }}
                      />
                    )}
                    <div className="p-3">
                      <div className="fw-bold text-navy mb-1">{item.title}</div>
                      <div className="small text-muted">
                        {item.content?.slice(0, 80)}...
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
