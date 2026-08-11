import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import {
  Trophy,
  Award,
  Dribbble,
  People,
  GeoAltFill,
  ShieldCheck,
  BookFill,
  CpuFill,
  CupHotFill,
  HeartPulseFill,
  ClockFill,
  TelephoneFill,
  CheckCircleFill,
  Quote,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const About = () => {
  const { t, i18n } = useTranslation();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        const { data } = await api.get("/school");
        setSchool(data);
      } catch (err) {
        console.error("Xato:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSchool();
  }, []);

  if (loading || !school) return null;

  const achievements = [
    {
      icon: <Trophy size={26} />,
      title: t("achiev_1_title"),
      desc: t("achiev_1_desc"),
    },
    {
      icon: <Award size={26} />,
      title: t("achiev_2_title"),
      desc: t("achiev_2_desc"),
    },
    {
      icon: <Dribbble size={26} />,
      title: t("achiev_3_title"),
      desc: t("achiev_3_desc"),
    },
    {
      icon: <People size={26} />,
      title: t("achiev_4_title"),
      desc: t("achiev_4_desc"),
    },
  ];

  // Qadriyatlar
  const values = [
    {
      icon: <BookFill size={26} />,
      title: t("val_1_title") || "Sifatli Ta'lim",
      desc:
        t("val_1_desc") ||
        "Zamonaviy standartlar va chuqurlashtirilgan o'quv dasturlari.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: t("val_2_title") || "Tarbiya va Intizom",
      desc:
        t("val_2_desc") ||
        "Sog'lom ma'naviy muhit va yuksak odob-ahloq qoidalari.",
    },
    {
      icon: <CpuFill size={26} />,
      title: t("val_3_title") || "STEM va IT",
      desc:
        t("val_3_desc") ||
        "Zamonaviy kompyuter va robototexnika laboratoriyalari.",
    },
    {
      icon: <People size={26} />,
      title: t("val_4_title") || "Malakali Ustozlar",
      desc:
        t("val_4_desc") ||
        "Ko'p yillik tajribaga ega bo'lgan oliy toifali pedagoglar.",
    },
    {
      icon: <HeartPulseFill size={26} />,
      title: t("val_5_title") || "Sog'lom Muhit",
      desc: t("val_5_desc") || "Sport to'garaklari va doimiy tibbiy nazorat.",
    },
    {
      icon: <Trophy size={26} />,
      title: t("val_6_title") || "Xalqaro Sertifikatlar",
      desc:
        t("val_6_desc") ||
        "IELTS, CEFR va fan olimpiadalariga maxsus tayyorlov.",
    },
  ];

  // Qulayliklar
  const facilities = [
    {
      icon: <CpuFill size={30} />,
      title: t("fac_1_title") || "IT laboratoriya",
      desc:
        t("fac_1_desc") || "Zamonaviy kompyuterlar bilan jihozlangan sinflar.",
    },
    {
      icon: <BookFill size={30} />,
      title: t("fac_2_title") || "Boy Kutubxona",
      desc:
        t("fac_2_desc") || "Minglab ilmiy va badiiy adabiyotlar jamlanmasi.",
    },
    {
      icon: <Dribbble size={30} />,
      title: t("fac_3_title") || "Sport Majmuasi",
      desc: t("fac_3_desc") || "Futbol, basketbol va gimnastika maydonchalari.",
    },
    {
      icon: <CupHotFill size={30} />,
      title: t("fac_4_title") || "Shinam Oshxona",
      desc: t("fac_4_desc") || "Issiq va sifatli taomlar oshxonasi.",
    },
  ];

  // Admin panelda kiritilgan latitude va longitude koordinatalari
  const lat = school.latitude || "41.311081";
  const lng = school.longitude || "69.240562";
  const currentLang = i18n.language || "uz";

  return (
    <>
      {/* 1. Banner */}
      <Container className="pt-4">
        <div className="hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600"
            alt="Maktab"
          />
          <div className="hero-overlay" />
          <div className="hero-content text-white" style={{ maxWidth: 600 }}>
            <h1 className="fw-bold display-6">{t("about_title")}</h1>
            <p className="opacity-75 mb-0">
              {school.name} {school.formed} {t("about_subtitle")}
            </p>
          </div>
        </div>
      </Container>

      {/* 2. Missiya */}
      <Container className="my-5">
        <Row className="g-4">
          <Col xs={12} md={7}>
            <div className="surface-card p-4 h-100">
              <h2 className="section-title mb-3">{t("mission_title")}</h2>
              <p className="text-muted">{t("mission_desc")}</p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  {t("tag_quality")}
                </Badge>
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  {t("tag_discipline")}
                </Badge>
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  {t("tag_future")}
                </Badge>
              </div>

              <div className="mt-4 pt-3 border-top d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <CheckCircleFill className="text-success" size={18} />
                  <span className="small text-secondary fw-semibold">
                    {t("bullet_standards") ||
                      "Xalqaro va milliy o'quv standartlari"}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <CheckCircleFill className="text-success" size={18} />
                  <span className="small text-secondary fw-semibold">
                    {t("bullet_individual") ||
                      "Har bir o'quvchiga individual yondashuv"}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className="bg-navy text-white rounded-4 p-4 h-100 d-flex flex-column justify-content-center gap-4">
              <div>
                <div className="fs-2 fw-bold">
                  {school.experienceYears || "35+"}
                </div>
                <div className="opacity-75 small">
                  {t("stat_experience") || "yillik tajriba"}
                </div>
              </div>
              <div>
                <div className="fs-2 fw-bold">{school.studentCount || 0}</div>
                <div className="opacity-75 small">{t("stat_students")}</div>
              </div>
              <div>
                <div className="fs-2 fw-bold">{school.teacherCount || 0}</div>
                <div className="opacity-75 small">{t("stat_teachers")}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 3. Yutuqlar */}
      <Container className="my-5">
        <h2 className="section-title text-center mb-4">
          {t("achievements_title")}
        </h2>
        <Row className="g-3">
          {achievements.map((a, i) => (
            <Col xs={6} md={3} key={i}>
              <div className="surface-card p-4 h-100 text-center hover-lift">
                <div className="text-navy mb-3">{a.icon}</div>
                <div className="fw-bold mb-1">{a.title}</div>
                <div className="small text-muted">{a.desc}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 4. Bizning Asosiy Qadriyatlarimiz */}
      <Container className="my-5">
        <div className="text-center mb-5">
          <span
            className="d-inline-block text-uppercase fw-bold"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "#2563eb",
            }}
          >
            {t("values_eyebrow") || "Nimalarga ishonamiz"}
          </span>
          <h2 className="section-title mt-2">
            {t("values_title") || "Bizning Qadriyatlarimiz"}
          </h2>
        </div>
        <Row className="g-4">
          {values.map((v, i) => (
            <Col xs={12} sm={6} md={4} key={i}>
              <div
                className="h-100 bg-white border rounded-4 p-4 hover-lift"
                style={{ borderColor: "#eef1f6", transition: "all 0.2s ease" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    background: "#e6f7ed",
                    color: "#16a34a",
                  }}
                >
                  {v.icon}
                </div>
                <div className="fw-bold mb-1 fs-5">{v.title}</div>
                <div className="small text-muted">{v.desc}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 5. Direktor Iqtibosi */}
      <Container className="my-5">
        <div
          className="position-relative overflow-hidden rounded-4 p-4 p-md-5 text-white shadow"
          style={{
            background: "linear-gradient(135deg, #0f2a52 0%, #1e3a6e 100%)",
          }}
        >
          <Quote
            size={80}
            className="position-absolute"
            style={{
              right: 24,
              bottom: 12,
              opacity: 0.08,
              pointerEvents: "none",
            }}
          />
          <Row className="align-items-center">
            <Col lg={9}>
              <p className="fs-4 fst-italic mb-4" style={{ lineHeight: 1.6 }}>
                "
                {t("director_quote_text") ||
                  "Ta'lim — bu kelajakka kiritilgan eng katta sarmoyadir. Biz har bir o'quvchimizning bilimli, intizomli va vatanparvar bo'lib kamol topishiga bor kuchimizni qaratamiz."}
                "
              </p>
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Quote size={18} />
                </div>
                <div>
                  <div className="fw-bold">
                    {t("director_quote_author") || "Maktab Rahbariyati"}
                  </div>
                  <div className="small opacity-75">
                    {t("director_quote_role") || "Direktor"}:<b> Mirzayev O'</b>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* 6. Maktab Qulayliklari */}
      <div className="bg-white py-5">
        <Container>
          <div className="text-center mb-5">
            <span
              className="d-inline-block text-uppercase fw-bold"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: "#2563eb",
              }}
            >
              {t("fac_eyebrow") || "Infratuzilma"}
            </span>
            <h2 className="section-title mt-2">
              {t("facilities_title") || "Maktab Imkoniyatlari va Qulayliklari"}
            </h2>
          </div>
          <Row className="g-4">
            {facilities.map((f, i) => (
              <Col xs={6} md={3} key={i}>
                <div
                  className="h-100 text-center rounded-4 p-4 hover-lift"
                  style={{ background: "#f8fafc", transition: "all 0.2s ease" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-4 mx-auto mb-3"
                    style={{
                      width: 56,
                      height: 56,
                      background: "#eaf1ff",
                      color: "#2563eb",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div className="fw-bold mb-1">{f.title}</div>
                  <div className="small text-muted">{f.desc}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* 7. Xarita va Aloqa Bo'limi */}
      <Container className="my-5">
        <div className="surface-card p-4 rounded-4 shadow-sm">
          <h2 className="section-title mb-3 d-flex align-items-center gap-2">
            <GeoAltFill className="text-danger" />
            {t("map_title") || "Maktab joylashuvi"}
          </h2>

          <Row className="g-4 mb-4">
            {school.address && (
              <Col md={4}>
                <div className="p-3 bg-light rounded-3 h-100">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                    <GeoAltFill className="text-success" />{" "}
                    {t("address_label") || "Manzil:"}
                  </div>
                  <div className="small text-muted">{school.address}</div>
                </div>
              </Col>
            )}

            {school.phone && (
              <Col md={4}>
                <div className="p-3 bg-light rounded-3 h-100">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                    <TelephoneFill className="text-success" />{" "}
                    {t("phone_label") || "Telefon:"}
                  </div>
                  <a
                    href={`tel:${school.phone}`}
                    className="small text-decoration-none text-dark"
                  >
                    {school.phone}
                  </a>
                </div>
              </Col>
            )}

            {(school.workstart || school.workend) && (
              <Col md={4}>
                <div className="p-3 bg-light rounded-3 h-100">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                    <ClockFill className="text-success" />{" "}
                    {t("worktime_label") || "Ish vaqti:"}
                  </div>
                  <div className="small text-muted">
                    {school.workstart || "08:00"} — {school.workend || "18:00"}
                  </div>
                </div>
              </Col>
            )}
          </Row>

          <div
            className="rounded-4 overflow-hidden shadow-sm"
            style={{ height: "420px", width: "100%" }}
          >
            <iframe
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=${currentLang}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maktab joylashuvi xaritasi"
            ></iframe>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
