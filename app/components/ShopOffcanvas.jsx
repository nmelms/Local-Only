import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";
import Form from "react-bootstrap/Form";

function ShopOffcanvas() {
  const { showOffcanvas, setShowOffcanvas } = useUserStore();
  const [show, setShow] = useState(showOffcanvas);
  const handleClose = () => setShowOffcanvas(false);

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add A Shop</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStreet">
              <Form.Control type="text" placeholder="Street address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Control type="text" placeholder="City" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Control type="text" placeholder="State" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicZip">
              <Form.Control type="text" placeholder="Zip code" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDetails">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShopOffcanvas;
