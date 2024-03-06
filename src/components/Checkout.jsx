import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function checkoutCloseHandler() {
    userProgressCtx.hideCheckout();
  }

  // Input name prop is required for FormData to work
  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={checkoutCloseHandler}
    >
      <form onSubmit={submitHandler}>
        <h2>Kassa</h2>
        <p>Hinta yhteensä: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Koko nimi" type="text" id="name" />
        <Input label="Sähköpostiosoite" type="email" id="email" />
        <Input label="Katuosoite" type="text" id="street" />
        <div className="control-row">
          <Input label="Postinumero" type="text" id="postal-code" />
          <Input label="Kaupunki" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={checkoutCloseHandler}>
            Sulje
          </Button>
          <Button>Tilaa</Button>
        </p>
      </form>
    </Modal>
  );
}
