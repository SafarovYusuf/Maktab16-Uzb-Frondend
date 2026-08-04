import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Search, EnvelopeFill, TelephoneFill } from "react-bootstrap-icons";
import api from "../api/axios";

const filters = [
  "Barchasi",
  "Aniq fanlar",
  "Tabiiy fanlar",
  "Gumanitar fanlar",
  "Chet tillari",
];

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/teachers");
        setTeachers(data);
      } catch (err) {
        console.error("O'qituvchilarni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = teachers.filter((t) => {
    const matchesQuery = `${t.name} ${t.surname} ${t.subject}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "Barchasi" || t.category === activeFilter;
    return matchesQuery && matchesFilter;
  });

  const [visibleContacts, setVisibleContacts] = useState({});

  const toggleContact = (id, field) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  return (
    <Container className="py-5">
      <h1 className="section-title mb-2">Bizning ahil va tajribali jamoamiz</h1>
      <p className="text-muted mb-4">
        Maktabimizning har bir o'qituvchisi o'z sohasi bo'yicha yuqori malakaga
        ega va o'quvchilarga sifatli ta'lim berish yo'lida tinimsiz mehnat
        qiladi.
      </p>

      <Row className="align-items-center g-3 mb-4">
        <Col xs={12} md={8}>
          <div className="d-flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`btn btn-sm rounded-pill px-3 ${
                  activeFilter === f ? "btn-navy" : "btn-outline-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Col>
        <Col xs={12} md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search size={14} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Ism yoki fan bo'yicha qidirish..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted text-center py-5">Hech kim topilmadi</p>
      ) : (
        <Row className="g-4">
          {filtered.map((t) => (
            <Col xs={12} sm={6} lg={3} key={t._id}>
              <div className="surface-card overflow-hidden h-100 hover-lift">
                <img
                  src={
                    t.img?.startsWith("http")
                      ? t.img
                      : `https://maktab16.uz${t.img}`
                  }
                  alt={`${t.name} ${t.surname}`}
                  className="w-100"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="tag-pill">{t.subject}</span>
                    <span className="small text-muted">
                      {t.experience} yil tajriba
                    </span>
                  </div>
                  <div className="fw-bold text-navy">
                    {t.name} {t.surname}
                  </div>
                  <div className="small text-muted mb-3">
                    {t.bio || t.subject}
                  </div>

                  <div className="d-online  border-top ">
                    <div className="d-flex gap-3">
                      <EnvelopeFill size={14} className="text-muted mt-1" />
                      <div>{t.email}</div>
                    </div>
                    <div className="d-flex gap-3">
                      <TelephoneFill size={14} className="text-muted mt-1" />
                      <div>{t.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Teachers;
