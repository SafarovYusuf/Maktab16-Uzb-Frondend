import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Mortarboard, CalendarEvent, Book } from "react-bootstrap-icons";
import api from "../api/axios";

const quickLinks = [
  { icon: <Mortarboard size={22} />, title: "O'quv rejasi" },
  { icon: <CalendarEvent size={22} />, title: "Dars jadvali", active: true },
  { icon: <Book size={22} />, title: "Kutubxona" },
];

const Home = () => {
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
        const published = data
          .filter((item) => item.status === "published")
          .slice(0, 3);
        setNews(published);
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

  const stats = [
    { value: school.studentCount, label: "O'quvchilar" },
    { value: school.teacherCount, label: "O'qituvchilar" },
    { value: school.classRoomCount, label: "Sinfxonalar" },
    { value: school.roomCount, label: "To'garak xonalari" },
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
            <h1 className="fw-bold display-6">
              16-sonli umumta'lim maktabiga xush kelibsiz
            </h1>
            <p className="mb-4 opacity-75">
              Zamonaviy ta'lim standartlari, malakali pedagoglar jamoasi va
              farzandingiz porloq kelajagi uchun barcha qulayliklar.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/about" className="btn-gold">
                Batafsil
              </Button>
              <Button as={Link} to="/contact" variant="outline-light">
                Bog'lanish
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ---------- STATISTIKA ---------- */}
      <div className="stats-bar mx-2 rounded-5 mt-4 py-4">
        <Container>
          <Row className="text-center g-3">
            {stats.map((s) => (
              <Col xs={6} md={3} key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ---------- TEZKOR HAVOLALAR ---------- */}
      {/* <Container className="my-5">
        <h2 className="section-title mb-4">Tezkor havolalar</h2>
        <Row className="g-3">
          {quickLinks.map((q) => (
            <Col xs={12} md={4} key={q.title}>
              <div
                className={`p-4 rounded-4 h-100 d-flex flex-column justify-content-between hover-lift ${
                  q.active ? "bg-navy text-white" : "surface-card"
                }`}
              >
                <div>{q.icon}</div>
                <div className="fw-semibold mt-4">{q.title}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container> */}

      {/* ---------- SO'NGGI YANGILIKLAR ---------- */}
      <div className="bg-white py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title mb-0">So'nggi yangiliklar</h2>
            <Link to="/news" className="small fw-semibold">
              Barcha yangiliklar →
            </Link>
          </div>

          {loading ? (
            <p className="text-muted">Yuklanmoqda...</p>
          ) : news.length === 0 ? (
            <p className="text-muted">Hozircha yangiliklar yo'q</p>
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
                            : `https://maktab16.uz${item.image}`
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

      {/* ---------- OBUNA BLOKI ---------- */}
      {/* <Container className="my-5">
        <div className="bg-navy rounded-4 p-4 p-md-5 text-white">
          <Row className="align-items-center g-4">
            <Col xs={12} md={7}>
              <h3 className="fw-bold mb-2">Yangiliklardan xabardor bo'ling</h3>
              <p className="opacity-75 mb-0">
                Maktabimiz hayotidagi eng muhim voqealar va yangiliklarni
                elektron pochtangizga qabul qiling.
              </p>
            </Col>
            <Col xs={12} md={5}>
              <Form className="d-flex flex-column flex-sm-row gap-2">
                <Form.Control
                  type="email"
                  placeholder="Email manzilingiz"
                  className="flex-grow-1"
                />
                <Button className="btn-gold text-nowrap" >Obuna bo'lish</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container> */}
    </div>
  );
};

export default Home;
