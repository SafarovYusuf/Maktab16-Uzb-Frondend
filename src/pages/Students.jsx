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
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const filters = [
  { value: "Barchasi", key: "cat_all" },
  { value: "A'lochilar", key: "student_cat_excellent" },
  { value: "Olimpiada g'oliblari", key: "student_cat_olympiad" },
  { value: "Sportchilar", key: "student_cat_athletes" },
  { value: "Faollar", key: "student_cat_active" },
];

const Students = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]); // ✅ studentds -> students deb to'g'rilandi
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/students");
        setStudents(data);
      } catch (err) {
        console.error("O'quvchilarni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = students.filter((item) => {
    const matchesQuery = `${item.name} ${item.surname} ${item.subject || ""}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "Barchasi" || item.category === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <Container className="py-5">
      <h1 className="section-title mb-2">{t("students_title")}</h1>
      <p className="text-muted mb-4">{t("students_subtitle")}</p>

      <Row className="align-items-center g-3 mb-4">
        <Col xs={12} md={8}>
          <div className="d-flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`btn btn-sm rounded-pill px-3 ${
                  activeFilter === f.value ? "btn-navy" : "btn-outline-secondary"
                }`}
              >
                {t(f.key)}
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
              placeholder={t("search_student")}
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
        <p className="text-muted text-center py-5">{t("no_students_found")}</p>
      ) : (
        <Row className="g-4">
          {filtered.map((item) => (
            <Col xs={12} sm={6} lg={3} key={item._id}>
              <div className="surface-card overflow-hidden h-100 hover-lift">
                <img
                  src={
                    item.img?.startsWith("http")
                      ? item.img
                      : `https://16.maktab16.uz${item.img}`
                  }
                  alt={`${item.name} ${item.surname}`}
                  className="w-100"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="tag-pill">
                      {item.subject || t("default_class")}
                    </span>
                  </div>
                  <div className="fw-bold text-navy">
                    {item.name} {item.surname}
                  </div>
                  <div className="small text-muted mb-3">
                    {item.bio || t("default_student_bio")}
                  </div>

                  {(item.email || item.phone) && (
                    <div className="border-top pt-2">
                      {item.email && (
                        <div className="d-flex gap-2 small text-muted">
                          <EnvelopeFill
                            size={14}
                            className="mt-1 flex-shrink-0"
                          />
                          <div className="text-truncate">{item.email}</div>
                        </div>
                      )}
                      {item.phone && (
                        <div className="d-flex gap-2 small text-muted">
                          <TelephoneFill
                            size={14}
                            className="mt-1 flex-shrink-0"
                          />
                          <div>{item.phone}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Students;
