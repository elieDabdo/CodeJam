import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import ScrollToTop from "../ScrollToTop";
import Navbar from "../Navbar";
import Footer from "../Footer";

import yoga from "../../assets/yogagirlie.gif"

function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <section>
        
        <Container fluid className="home-section" id="home">
          <Particle />
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                {/* <h1 style={{ paddingBottom: 15 }} className="heading">
                  Hello there!{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1> */}

                <h1 className="heading-name">
                  Welcome to 
                  <strong className="main-name"> MyTrainer </strong>
                </h1>

                <div style={{ padding: 50, textAlign: "left" }}>
                  <Type />
                </div>
              </Col>

              <Col md={5} style={{ paddingBottom: 20 }}>
                <img
                  src={yoga}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Col>
            </Row>
        </Container>
      </Container>
      </section>
      <Footer />
    </>
  );
}

export default Home;