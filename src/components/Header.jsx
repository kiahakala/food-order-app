import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {

const cartCtx = useContext(CartContext)
const userProgressCtx = useContext(UserProgressContext)

const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
	return totalNumberOfItems + item.quantity
}, 0)

function showCartHandler() {
	userProgressCtx.showCart()
}

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='Palvelun logo'/>
				<h1>FOOD APP</h1>
				</div>
				<nav>
					<Button onClick={showCartHandler} textOnly>Ostoskori ({totalCartItems})</Button>
				</nav>
		</header>
	)
}