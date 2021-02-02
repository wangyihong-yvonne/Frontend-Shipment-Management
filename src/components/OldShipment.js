/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteConfirm from './DeleteConfirm';
/*eslint-enable no-unused-vars*/
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/OldShipment.css';

library.add(faTrashAlt);

const OldShipment = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const tracking = props.tracking;
  const deleteTracking = props.deleteTracking;
  const statusMap = {
    AC: 'Accepted',
    IT: 'In Transit',
    DE: 'Delivered',
    EX: 'Exception',
    UN: 'Unknown',
    AT: 'Delivery Attempt',
    NY: 'Not Yet In System',
  };

  let comment;
  if (tracking.order_url) {
    comment = (
      <a href={tracking.order_url} target="_blank" rel="noreferrer">
        {tracking.comment}
      </a>
    );
  } else {
    comment = tracking.comment;
  }

  let updateTime = '';
  let address = '';
  let desc = '';
  if (tracking.event) {
    let singleEvent = tracking.event[0];
    updateTime = singleEvent['carrier_occurred_at'].replace(/[a-zA-Z]/g, ' ');
    address =
      singleEvent['city_locality'] +
      ' ' +
      singleEvent['state_province'] +
      ',' +
      singleEvent['postal_code'];
    desc = singleEvent['description'];
  }

  return (
    <Container className="inactive-record">
      <Row>
        <Col lg={3} className="comment">
          {comment}
        </Col>
        <Col lg={6} className="tracking-num">
          {tracking.carrier.toUpperCase()} {tracking.tracking_num}
        </Col>
        <Col lg={3} className="action d-flex justify-content-end">
          <div
            className="delete-icon"
            onClick={() => setDeleteModal(true)}
            tabIndex={0}
            onKeyPress={(event) => {
              if (event.key === 'Enter') setDeleteModal(true);
            }}
          >
            <FontAwesomeIcon icon="trash-alt" />
            <span className="delete-icon-text">Delete</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="update-time">{updateTime}</Col>
        <Col className="traking-status">{statusMap[tracking.status]}</Col>
        <Col className="address">{address}</Col>
        <Col className="desc">{desc}</Col>
      </Row>
      <DeleteConfirm
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        trackingID={tracking._id}
        deleteRecord={deleteTracking}
      />
    </Container>
  );
};

export default OldShipment;
