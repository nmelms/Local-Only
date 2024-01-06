import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";

function ShopOffcanvas() {
  const { showOffcanvas } = useUserStore();
  const [show, setShow] = useState(showOffcanvas);
  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShopOffcanvas;
