import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { removeFromCart } from "../slices/cartSlice";

export default function Example() {
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0.0);

	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.cartItems);

	useEffect(() => {
		setProducts(cartItems);

		return () => {};
	}, [cartItems]);

	return (
		<div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
			<div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
				<div className='mt-8'>
					<div className='flow-root'>
						<ul role='list' className='-my-6 divide-y divide-gray-200'>
							{products.map((product) => (
								<li key={product._id} className='flex py-6'>
									<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
										<Image
											src={
												"https://images.unsplash.com/photo-1545947597-7975c1d364eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
											}
											// src={product.productPictures[0]}
											alt={product.brand}
											className='h-full w-full object-cover object-center'
											width={100}
											height={100}
										/>
									</div>

									<div className='ml-4 flex flex-1 flex-col'>
										<div>
											<div className='flex justify-between text-base font-medium text-gray-900'>
												<h3>
													<a href={product.href}>{product.name}</a>
												</h3>
												<p className='ml-4'>{product.price}</p>
											</div>
											<p className='mt-1 text-sm text-gray-500'>
												{product.color}
											</p>
										</div>
										<div className='flex flex-1 items-end justify-between text-sm'>
											<p className='text-gray-500'>
												Qty {product.cartQuantity}
											</p>

											<div className='flex'>
												<button
													type='button'
													className='font-medium text-indigo-600 hover:text-indigo-500'
													onClick={() => dispatch(removeFromCart(product))}
												>
													Remove
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
				<div className='flex justify-between text-base font-medium text-gray-900'>
					<p>Subtotal</p>
					{/* <p>$262.00</p> */}
					<p>
						${" "}
						{products
							.reduce((acc, item) => acc + item.cartQuantity * item.price, 0)
							.toFixed(2)}
					</p>
				</div>
				<p className='mt-0.5 text-sm text-gray-500'>
					Shipping and taxes calculated at checkout.
				</p>
				<div className='mt-6'>
					{products.length > 0 ? (
						<Link href='/checkout'>
							<a className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
								Checkout
							</a>
						</Link>
					) : (
						<h1 className='text-center text-3xl font-bold text-red-800'>
							you have no items in cart
						</h1>
					)}
				</div>
				<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
					<p>
						<span>or </span>
						<Link href='/'>
							<button
								type='button'
								className='text-2xl font-medium text-indigo-600 hover:text-indigo-500'
							>
								Continue Shopping
								<span aria-hidden='true'> &rarr;</span>
							</button>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
