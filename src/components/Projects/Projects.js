import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import YogaVideo from '../../assets/yoga.mp4';
import TaiChiVideo from '../../assets/tai_chi.mp4';
import StretchingVideo from '../../assets/stretching.mp4';
import DancingVideo from '../../assets/dancing.mp4';
import ProjectCard from "./ProjectCards";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Try some of our <strong className="purple"> Presets </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
              title="Yoga"
              description="Relax and explore your body."
              video= {YogaVideo}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOTtKr1QiIWs7JpNhAm7qkUeF47ddjsv8pw&usqp=CAU"}
              title="Tai Chi"
              description="Relax and explore your body."
              video= {TaiChiVideo}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              title="Stretching"
              description="Relax and explore your body."
              video= {StretchingVideo}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://www.shutterstock.com/image-photo/full-length-excited-funny-young-260nw-1967652817.jpg"}
              title="Dancing"
              description="Relax and explore your body."
              video= {DancingVideo}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
              title="Preset 5 "
              description="Relax and explore your body."
              video={YogaVideo}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
              title="Preset 6"
              description="Relax and explore your body."
              video={YogaVideo}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
