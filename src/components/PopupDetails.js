/*eslint-disable no-unused-vars*/
import { Modal, Container, Row, Col } from 'react-bootstrap';
/*eslint-enable no-unused-vars*/
import '../styles/PopupDetails.css';

const PopupDetails = (props) => {
  const renderDetail = () => {
    let events = [];
    if (props.events) {
      events = props.events;
    }

    return events.map((event) => (
      <Row key={event.occurred_at} className="event-detail">
        <Col>{event.occurred_at.replace(/[a-zA-Z]/g, ' ')}</Col>
        <Col>
          {event.city_locality +
            ' ' +
            event.state_province +
            ' ' +
            event.postal_code}
        </Col>
        <Col>{event.description}</Col>
      </Row>
    ));
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Shipment Progress
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="event-title">
            <Col>
              <strong>Time</strong>
            </Col>
            <Col>
              <strong>Location</strong>
            </Col>
            <Col>
              <strong>Description</strong>
            </Col>
          </Row>
          {renderDetail()}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDetails;
