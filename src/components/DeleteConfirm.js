/*eslint-disable no-unused-vars*/
import { Modal, Button } from 'react-bootstrap';
/*eslint-enable no-unused-vars*/
import '../styles/DeleteConfirm.css';

const DeleteConfirm = ({
  deleteRecord: deleteTracking,
  trackingID: trackingID,
  ...rest
}) => {
  const DeletePressed = () => {
    rest.onHide();
    deleteTracking(trackingID);
  };

  return (
    <Modal {...rest}>
      <Modal.Body className="message">
        This record will be permanently deleted. Are you sure?
      </Modal.Body>
      <Modal.Footer className="footer">
        <Button variant="light" size="sm" onClick={rest.onHide}>
          Cancel
        </Button>
        <Button variant="secondary" size="sm" onClick={DeletePressed}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;
