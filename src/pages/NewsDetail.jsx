import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Form, Button } from "react-bootstrap";
import { Calendar, Eye } from "react-bootstrap-icons";
import api from "../api/axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/news");
        const found = data.find((n) => n._id === id);
        setItem(found || null);
        setOthers(
          data
            .filter((n) => n._id !== id && n.status === "published")
            .slice(0, 3),
        );
      } catch (err) {
        console.error("Yangilikni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <p className="text-muted">Yangilik topilmadi.</p>
        <Link to="/news" className="fw-semibold">
          Yangiliklarga qaytish →
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="small text-muted mb-3">
        <Link to="/">Bosh sahifa</Link> / <Link to="/news">Yangiliklar</Link> /{" "}
        {item.title}
      </div>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <h1 className="fw-bold mb-3">{item.title}</h1>
          <div className="d-flex align-items-center gap-3 small text-muted mb-4">
            <span className="d-flex align-items-center gap-1">
              <Calendar size={14} />
              {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
            </span>
            <span className="d-flex align-items-center gap-1">
              <Eye size={14} /> {item.views || 0} marta ko'rildi
            </span>
          </div>

          {item.image && (
            <img
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `http://localhost:5001${item.image}`
              }
              alt={item.title}
              className="w-100 rounded-4 mb-4"
              style={{ maxHeight: 420, objectFit: "cover" }}
            />
          )}

          <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
            {item.content}
          </p>
        </Col>

        <Col xs={12} lg={4}>
          <div className="surface-card p-4 mb-4">
            <h6 className="fw-bold mb-3">Boshqa yangiliklar</h6>
            {others.length === 0 ? (
              <p className="small text-muted mb-0">Boshqa yangiliklar yo'q</p>
            ) : (
              others.map((o) => (
                <Link
                  key={o._id}
                  to={`/news/${o._id}`}
                  className="d-flex gap-2 mb-3 text-decoration-none"
                >
                  {o.image && (
                    <img
                      src={
                        o.image.startsWith("http")
                          ? o.image
                          : `http://localhost:5001${o.image}`
                      }
                      alt={o.title}
                      style={{ width: 64, height: 64, objectFit: "cover" }}
                      className="rounded-3 flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="small fw-semibold text-navy">{o.title}</div>
                    <div className="small text-muted">
                      {new Date(o.createdAt).toLocaleDateString("uz-UZ")}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="bg-navy text-white rounded-4 p-4">
            <h6 className="fw-bold mb-2">Yangiliklardan xabardor bo'ling</h6>
            <p className="small opacity-75">
              Eng so'nggi yangiliklar va e'lonlarni to'g'ridan-to'g'ri
              pochtangizga oling.
            </p>
            <Form className="d-flex flex-column gap-2">
              <Form.Control type="email" placeholder="Email manzilingiz" />
              <Button className="btn-gold">Obuna bo'lish</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;
