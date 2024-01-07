import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";
import Form from "react-bootstrap/Form";

function ShopOffcanvas() {
  const { showOffcanvas, setShowOffcanvas } = useUserStore();
  const [show, setShow] = useState(showOffcanvas);
  const handleClose = () => setShowOffcanvas(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zip.value,
      details: e.target.details.value,
    };

    fetch("/api/shop-data", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add A Shop</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="street">
              <Form.Control type="text" placeholder="Street address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <Form.Control type="text" placeholder="City" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="state">
              <Form.Control type="text" placeholder="State" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="zip">
              <Form.Control type="text" placeholder="Zip code" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="details">
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
