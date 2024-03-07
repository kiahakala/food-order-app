import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

// Request config needs to be set outside the function to prevent object recreation
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function checkoutCloseHandler() {
    userProgressCtx.hideCheckout();
  }

  function finishCheckout() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // Input name prop is required for FormData to work
  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={checkoutCloseHandler}>
        Sulje
      </Button>
      <Button>Tilaa</Button>
    </>
  );

  if (isSending) {
    actions = <span>Käsitellään...</span>;
  }

  // Success modal
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={finishCheckout}
      >
        <h2>Valmis!</h2>
        <p>Tilauksesi onnistui ja siirtyi käsittelyyn.</p>
        <p className="modal-actions">
          <Button onClick={finishCheckout}>Ok</Button>
        </p>
      </Modal>
    );
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
        {error && <Error title="Tilaus epäonnistui" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
