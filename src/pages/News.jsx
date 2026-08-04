import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api/axios";

const categories = ["Barchasi", "Tadbirlar", "E'lonlar", "Yutuqlar"];

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Barchasi");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/news");
        setNews(data.filter((n) => n.status === "published"));
      } catch (err) {
        console.error("Yangiliklarni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (active === "Barchasi") return news;
    return news.filter((n) => n.category === active);
  }, [news, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleCategory = (cat) => {
    setActive(cat);
    setPage(1);
  };

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-1">Yangiliklar</h1>
      <p className="text-muted mb-4">
        Maktabimizdagi eng so'nggi voqealar, e'lonlar va o'quvchilarimizning
        yutuqlari bilan tanishing.
      </p>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            className={
              active === cat
                ? "btn-navy rounded-pill px-3"
                : "rounded-pill px-3"
            }
            variant={active === cat ? undefined : "outline-secondary"}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : paginated.length === 0 ? (
        <p className="text-muted text-center py-5">Hozircha yangiliklar yo'q</p>
      ) : (
        <Row className="g-4">
          {paginated.map((item) => (
            <Col xs={12} sm={6} lg={4} key={item._id}>
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
                    style={{ height: 180, objectFit: "cover" }}
                  />
                )}
                <div className="p-3">
                  <div className="small text-muted mb-1">
                    {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                  </div>
                  <div className="fw-bold text-navy mb-1">{item.title}</div>
                  <div className="small text-muted">
                    {item.content?.slice(0, 90)}...
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-5">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n}
              size="sm"
              className={n === page ? "btn-navy" : ""}
              variant={n === page ? undefined : "outline-secondary"}
              onClick={() => setPage(n)}
            >
              {n}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ›
          </Button>
        </div>
      )}
    </Container>
  );
};

export default News;
