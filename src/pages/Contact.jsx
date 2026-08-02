import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  GeoAltFill,
  TelephoneFill,
  EnvelopeFill,
  ClockFill,
} from "react-bootstrap-icons";
import api from "../api/axios";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error" | "captcha-error"
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // reCAPTCHA widget'ini render qilish
  useEffect(() => {
    const renderCaptcha = () => {
      if (
        window.grecaptcha &&
        captchaRef.current &&
        widgetIdRef.current === null
      ) {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
      }
    };

    // Script hali yuklanmagan bo'lishi mumkin, shuning uchun kutamiz
    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha();
    } else {
      const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderCaptcha();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaToken = window.grecaptcha?.getResponse(widgetIdRef.current);
    if (!captchaToken) {
      setStatus("captcha-error");
      return;
    }

    setStatus("sending");
    try {
      await api.post("/contact", { ...form, captchaToken });
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
      window.grecaptcha?.reset(widgetIdRef.current);
    } catch (err) {
      console.error("Xabar yuborishda xato:", err);
      setStatus("error");
      window.grecaptcha?.reset(widgetIdRef.current);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/school");
        setSchool(data);
      } catch (err) {
        console.error("Maktab ma'lumotlarini yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="section-title mb-2">Biz bilan bog'laning</h1>
      <p className="text-muted mb-4">
        Savollaringiz bormi? Bizga xabar qoldiring yoki ko'rsatilgan manzillar
        orqali bog'laning. Biz har doim yordam berishga tayyormiz.
      </p>

      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="surface-card p-4 mb-4">
            <h5 className="fw-bold mb-4">Aloqa ma'lumotlari</h5>

            <div className="d-flex gap-3 mb-3">
              <GeoAltFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">Manzilimiz</div>
                <div className="small text-muted">
                  {loading ? "Yuklanmoqda..." : school?.address || "—"}
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
              <TelephoneFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">Telefon raqamlari</div>
                <div className="small text-muted">
                  {loading ? "Yuklanmoqda..." : school?.phone || "—"}
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
              <EnvelopeFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">Elektron pochta</div>
                <div className="small text-muted">
                  {loading ? "Yuklanmoqda..." : school?.email || "—"}
                </div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <ClockFill className="text-navy flex-shrink-0" size={18} />
              <div>
                <div className="fw-semibold small">Ish vaqti</div>
                <div className="small text-muted">
                  Dushanba – Shanba: 08:00 – 18:00
                  <br />
                  Yakshanba: Dam olish kuni
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy text-white rounded-4 p-4">
            <h6 className="fw-bold mb-2">Ijtimoiy tarmoqlar</h6>
            <p className="small opacity-75 mb-0">
              Yangiliklardan xabardor bo'lish uchun bizni kuzatib boring.
            </p>
          </div>
        </Col>

        <Col xs={12} lg={7}>
          <div className="surface-card p-4">
            <h5 className="fw-bold mb-4">Xabar yuborish</h5>

            {status === "sent" && (
              <Alert variant="success">
                Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan
                bog'lanamiz!
              </Alert>
            )}
            {status === "error" && (
              <Alert variant="danger">
                Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib
                ko'ring.
              </Alert>
            )}
            {status === "captcha-error" && (
              <Alert variant="warning">
                Iltimos, "Men robot emasman" katagini belgilang.
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Ism</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ismingizni kiriting"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Telefon</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Xabar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Xabaringizni yozing..."
                  required
                />
              </Form.Group>

              <div ref={captchaRef} className="mb-4"></div>

              <Button
                type="submit"
                className="btn-navy w-100"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
