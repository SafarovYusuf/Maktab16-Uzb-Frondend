import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Trophy, Award, Dribbble, People } from "react-bootstrap-icons";
import api from "../api/axios";

const achievements = [
  {
    icon: <Trophy size={26} />,
    title: "Yil Maktabi",
    desc: "2022-yilda viloyat miqyosida eng yaxshi ko'rsatkichlar uchun.",
  },
  {
    icon: <Award size={26} />,
    title: "Olimpiada",
    desc: "Matematika va fizika fanlaridan 15 ta respublika g'oliblari.",
  },
  {
    icon: <Dribbble size={26} />,
    title: "Sport",
    desc: "Futbol bo'yicha \"Umid nihollari\" musobaqasida g'oliblik.",
  },
  {
    icon: <People size={26} />,
    title: "Ustozlar",
    desc: "O'qituvchilarning 80% dan ortig'i oliy toifaga ega.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500",
];

const About = () => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        const { data } = await api.get("/school");
        setSchool(data);
      } catch (err) {
        console.error("Maktab ma'lumotlarini yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        Yuklanmoqda...
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container py-5 text-center text-muted">
        Maktab ma'lumotlari topilmadi
      </div>
    );
  }

  return (
    <>
      <Container className="pt-4">
        <div className="hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop"
            alt="Maktab binosi"
          />
          <div className="hero-overlay" />
          <div className="hero-content text-white" style={{ maxWidth: 600 }}>
            <h1 className="fw-bold display-6">An'ana va Innovatsiya Maskani</h1>
            <p className="opacity-75 mb-0">
              {school.name} {school.formed}-yildan buyon bilim va ma'rifat
              ulashib kelmoqda. Biz kelajak yetakchilarini tarbiyalaymiz.
            </p>
          </div>
        </div>
      </Container>

      {/* Missiya */}
      <Container className="my-5">
        <Row className="g-4">
          <Col xs={12} md={7}>
            <div className="surface-card p-4 h-100">
              <h2 className="section-title mb-3">Bizning Missiyamiz</h2>
              <p className="text-muted">
                O'quvchilarimizga nafaqat akademik bilim berish, balki ularni
                barkamol shaxs, vatanparvar fuqaro va global darajadagi
                raqobatbardosh mutaxassis qilib yetishtirishdir. Biz har bir
                bolaning individual qobiliyatini kashf etishga ishonamiz.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  Sifatli ta'lim
                </Badge>
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  Intizom
                </Badge>
                <Badge
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  Kelajak
                </Badge>
              </div>
            </div>
          </Col>

          <Col xs={12} md={5}>
            <div className="bg-navy text-white rounded-4 p-4 h-100 d-flex flex-column justify-content-center gap-4">
              <div>
                <div className="fs-2 fw-bold">35+ Yillik</div>
                <div className="opacity-75 small">
                  Mukammal pedagogik tajriba va an'analar
                </div>
              </div>
              <div>
                <div className="fs-2 fw-bold">{school.studentCount}</div>
                <div className="opacity-75 small">
                  Hozirgi kunda tahsil olayotgan faol o'quvchilar
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Tarix */}
      <div className="bg-white py-5">
        <Container>
          <Row className="g-4 align-items-center">
            <Col xs={12} md={6}>
              <h2 className="section-title mb-3">Maktabimiz Tarixi</h2>
              <p className="text-muted">
                {school.name} o'z faoliyatini {school.formed}-yilda boshlagan.
                Dastlab kichik ta'lim muassasasi sifatida shakllangan
                maktabimiz, yillar davomida mintaqaning eng nufuzli ta'lim
                markazlaridan biriga aylandi.
              </p>
              <p className="text-muted mb-0">
                1990-yillarda maktabda ilk ixtisoslashtirilgan sinflar tashkil
                etildi. 2010-yilda binoda to'liq rekonstruksiya ishlari olib
                borilib, zamonaviy laboratoriyalar va sport majmuasi
                foydalanishga topshirildi.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800"
                alt="Maktab tarixi"
                className="w-100 rounded-4"
                style={{ height: 320, objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Yutuqlar */}
      <Container className="my-5">
        <h2 className="section-title text-center mb-4">Yutuqlarimiz</h2>
        <Row className="g-3">
          {achievements.map((a) => (
            <Col xs={6} md={3} key={a.title}>
              <div className="surface-card p-4 h-100 text-center hover-lift">
                <div className="text-navy mb-3">{a.icon}</div>
                <div className="fw-bold mb-1">{a.title}</div>
                <div className="small text-muted">{a.desc}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Galereya */}
      <div className="bg-white py-5">
        <Container>
          <h2 className="section-title mb-4">Maktab Hayotidan Lavhalar</h2>
          <Row className="g-3">
            {gallery.map((src, i) => (
              <Col xs={6} md={3} key={i}>
                <img
                  src={src}
                  alt={`Maktab hayoti ${i + 1}`}
                  className="w-100 rounded-4"
                  style={{ height: 200, objectFit: "cover" }}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA */}
      <Container className="my-5">
        <div className="bg-navy text-white rounded-4 p-5 text-center">
          <h3 className="fw-bold mb-2">Maktabimizga tashrif buyuring</h3>
          <p className="opacity-75 mb-0">
            Bizning muassasamiz bilan yaqinroq tanishish uchun ochiq eshiklar
            kuniga yoziling yoki biz bilan bog'laning.
          </p>
        </div>
      </Container>
    </>
  );
};

export default About;
