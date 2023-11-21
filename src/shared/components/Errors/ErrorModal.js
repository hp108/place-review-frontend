import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h2>Error</h2>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.error|| "Something went wrong!!"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ErrorModal(props) {
    const [modalShow, setModalShow] = React.useState(true);
    useEffect(()=>{
            setModalShow(true)
    },[props.cnt])
    return (
        <>
        <MyVerticallyCenteredModal
            
          show={modalShow}
          error={props.error}
          onHide={() => {setModalShow(false)
                        props.clear()
                    }}
        />
        </>
    );
}

export default ErrorModal;
