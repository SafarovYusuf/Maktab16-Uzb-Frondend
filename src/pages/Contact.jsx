import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  GeoAltFill,
  TelephoneFill,
  EnvelopeFill,
  ClockFill,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [school, setSchool] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      setStatus(err);
    }
  };

  useEffect(() => {
    api
      .get("/school")
      .then(({ data }) => setSchool(data))
      .catch(() => {});
  }, []);

  return (
    <Container className="py-5">
      <h1 className="section-title mb-2">{t("contact_title")}</h1>
      <p className="text-muted mb-4">{t("contact_subtitle")}</p>

      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="surface-card p-4 mb-4">
            <div className="d-flex gap-3 mb-3">
              <GeoAltFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">{t("info_address")}</div>
                <div className="small text-muted">{school?.address || "—"}</div>
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <TelephoneFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">{t("info_phone")}</div>
                <div className="small text-muted">{school?.phone || "—"}</div>
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <EnvelopeFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">{t("info_email")}</div>
                <div className="small text-muted">{school?.email || "—"}</div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <ClockFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">{t("info_hours")}</div>
                <div className="small text-muted">
                  {t("work_hours_val")} {school?.workstart || "08:00"} –{" "}
                  {school?.workend || "18:00"}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} lg={7}>
          <div className="surface-card p-4">
            <h5 className="fw-bold mb-4">{t("send_message_title")}</h5>
            {status === "sent" && (
              <Alert variant="success">{t("msg_sent_success")}</Alert>
            )}
            {status === "error" && (
              <Alert variant="danger">{t("msg_sent_error")}</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">
                  {t("label_name")}
                </Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">
                  {t("label_phone")}
                </Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">
                  {t("label_message")}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn-navy w-100"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("btn_sending") : t("btn_send")}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
