import { useContext } from "react"
import { currencyFormatter } from "../util/formatting"

export default function CartItem({ name, price, quantity, onIncrease, onDecrease }) {

// Button actions can be implemented with useContext, 
// but the necessary functions can also be passed as props 

	return <li className="cart-item">
		<p>
			{name} - {quantity} x {currencyFormatter.format(price)}
		</p>
		<p className="cart-item-actions">
			<button onClick={onDecrease}>-</button>
			<span>{quantity}</span>
			<button onClick={onIncrease}>+</button>
		</p>
	</li>
}