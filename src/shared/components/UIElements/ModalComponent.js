import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Map from '../Map/Map';
import './ModalComponent.css'
import { BiCurrentLocation } from "react-icons/bi";
import { map } from '../Map/LocationMarker';


let b= false;

function MyVerticallyCenteredModal(props) {
    const clickHandler=()=>{
      b=false;
        map.locate();
        if(!b)
        {
        map.on('locationfound', (e) => {
              map.flyTo(e.latlng, map.getZoom(1555));
            });
            b=true;
        }
    }
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Map/>
          <BiCurrentLocation className='btn1' />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal> 
  );
}

function ModalComponent(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => {
        setModalShow(true)
        }}>
        {props.name}
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default ModalComponent;