/*eslint-disable no-unused-vars*/
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ShipmentForm from '../components/ShipmentForm';
import SingleShipment from '../components/SingleShipment';
import OldShipment from '../components/OldShipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import '../styles/ShipmentListPage.css';
/*eslint-enable no-unused-vars*/

library.add(faShippingFast);

function ShipmentListPage() {
  const [trackings, setTrackings] = useState([]);
  const [tab, setTab] = useState('tracking');
  const getTrackings = async () => {
    let trackings = [];
    try {
      trackings = await fetch('/shipment').then((res) => res.json());
      console.log(`${trackings.length} shipments in the response.`);
    } catch (err) {
      console.log('error occurs ', err);
    }
    setTrackings(trackings);
  };

  useEffect(() => {
    getTrackings();
  }, []); // Only run the first time

  const inactiveTracking = async (id) => {
    let url = '/shipment/' + id;

    try {
      let result = await fetch(url, { method: 'PUT' }).then((res) =>
        res.json()
      );
      if (result.success) {
        for (let i = 0; i < trackings.length; i++) {
          if (trackings[i]._id === id) {
            const newTrackings = [...trackings];
            newTrackings[i].active = false;
            setTrackings(newTrackings);
            break;
          }
        }
      } else {
        alert(`Backend failed to deactivate shipment ID: [${id}]`);
      }
    } catch (err) {
      alert(
        `Failed to call ${url} [PUT]. Please check console to see error log.`
      );
      console.log(err);
    }
  };

  const deleteTracking = async (id) => {
    let url = '/shipment/' + id;

    try {
      let result = await fetch(url, { method: 'DELETE' }).then((res) =>
        res.json()
      );
      if (result.success) {
        for (let i = 0; i < trackings.length; i++) {
          if (trackings[i]._id === id) {
            const newTrackings = [...trackings];
            newTrackings.splice(i, 1);
            setTrackings(newTrackings);
            break;
          }
        }
      } else {
        alert(`Backend failed to delete shipment ID: [${id}]`);
      }
    } catch (err) {
      alert(
        `Failed to call ${url} [DELETE]. Please check console to see error log.`
      );
      console.log(err);
    }
  };

  function addTracking(value) {
    const newTrackings = [value, ...trackings];
    setTrackings(newTrackings);
    alert('One tracking record is added successfully!');
    setTab('tracking');
  }

  return (
    <main className="shipment-list">
      <Container>
        <h1 className="greeting">
          <FontAwesomeIcon icon="shipping-fast" /> Hello,{' '}
          {JSON.parse(localStorage.getItem('loginInfo')).username}
        </h1>
        <Tabs activeKey={tab} onSelect={(currTab) => setTab(currTab)}>
          <Tab eventKey="new-tracking" title="New Tracking">
            <ShipmentForm onCreateSuccess={addTracking} />
          </Tab>
          <Tab id="main-content" eventKey="tracking" title="Active Trackings">
            {trackings
              .filter((tracking) => tracking.active)
              .map((tracking) => (
                <SingleShipment
                  key={tracking._id}
                  tracking={tracking}
                  inactiveTracking={inactiveTracking}
                  deleteTracking={deleteTracking}
                />
              ))}
          </Tab>
          <Tab eventKey="history" title="Archived Trackings">
            {trackings
              .filter((tracking) => !tracking.active)
              .map((tracking) => (
                <OldShipment
                  key={tracking._id}
                  tracking={tracking}
                  deleteTracking={deleteTracking}
                />
              ))}
          </Tab>
        </Tabs>
      </Container>
    </main>
  );
}

export default ShipmentListPage;
