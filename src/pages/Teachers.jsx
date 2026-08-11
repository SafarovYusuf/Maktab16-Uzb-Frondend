import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const Teachers = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get("/teachers")
      .then(({ data }) => setTeachers(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = teachers.filter((item) =>
    `${item.name} ${item.surname} ${item.subject}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <Container className="py-5">
      <h1 className="section-title mb-2">{t("teachers_title")}</h1>
      <p className="text-muted mb-4">{t("teachers_subtitle")}</p>

      <Row className="mb-4">
        <Col xs={12} md={6}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search size={14} />
            </InputGroup.Text>
            <Form.Control
              placeholder={t("search_teacher")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
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
                  alt={item.name}
                  className="w-100"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="p-3">
                  <span className="tag-pill">{item.subject}</span>
                  <div className="fw-bold text-navy mt-2">
                    {item.name} {item.surname}
                  </div>
                  <div className="small text-muted">
                    {item.experience} {t("experience_years")}
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
