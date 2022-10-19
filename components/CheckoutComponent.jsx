import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Image from "next/image";

const CheckoutComponent = () => {
	const { data: session, status } = useSession();
	const [products, setProducts] = useState([]);

	const address = useSelector((state) => state.checkout.address);
	const number = useSelector((state) => state.checkout.number);
	const payment = useSelector((state) => state.checkout.payment);
	const cartItems = useSelector((state) => state.cart.cartItems);

	useEffect(() => {
		setProducts(cartItems);

		return () => {};
	}, [cartItems]);

	console.log(products);

	const totalNetPrice = products.reduce(
		(acc, item) => acc + item.cartQuantity * item.price,
		0
	);
	const shippingPrice = totalNetPrice + 60;

	return (
		<div className='h-screen grid grid-cols-3'>
			<div className='lg:col-span-2 col-span-3  space-y-8 px-12'>
				<div className='mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md'>
					<div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
						<div className='text-yellow-500'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 sm:w-5 h-6 sm:h-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<div className='text-sm font-medium ml-3'>Checkout</div>
					</div>
					<div className='text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4'>
						Complete your shipping and payment details below.
					</div>
					<div className='absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M6 18L18 6M6 6l12 12'
							></path>
						</svg>
					</div>
				</div>
				<div className='rounded-md'>
					<form id='payment-form' method='POST' action=''>
						<section>
							<h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
								Shipping & Billing Information
							</h2>
							<fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
								<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
									<span className='w-[120px] px-2'>Name</span>
									<h1 className='ml-4 bg-rose-300 w-full p-2 text-black'>
										{session.user.name}
									</h1>
								</label>
								<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
									<span className='w-[120px] px-2'>Email</span>
									<h1 className='ml-4 bg-rose-300 w-full p-2 text-black'>
										{session.user.email}
									</h1>
								</label>
								<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
									<span className='w-[120px] px-2'>Address</span>
									<h1 className='ml-4 bg-rose-300 w-full p-2 text-black'>
										{address}
									</h1>
								</label>
								<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
									<span className='w-[120px] px-2'>phone number</span>
									<h1 className='ml-4 bg-rose-300 w-full p-2 text-black'>
										{number}
									</h1>
								</label>
								<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
									<span className='w-[120px] px-2'>payment method</span>
									<h1 className='ml-4 bg-rose-300 w-full p-2 text-black'>
										{payment}
									</h1>
								</label>
							</fieldset>
						</section>
					</form>
				</div>

				<button className='submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'>
					Pay {shippingPrice.toFixed(2)}
				</button>
			</div>
			<div className='col-span-1 bg-white lg:block hidden'>
				<h1 className='py-6 border-b-2 text-xl text-gray-600 px-8'>
					Order Summary
				</h1>
				<ul className='py-6 border-b space-y-6 px-8'>
					{products?.map((product) => (
						<li className='grid grid-cols-6 gap-2 border-b-1' key={product._id}>
							<div className='col-span-1 self-center'>
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
							<div className='flex flex-col col-span-3 pt-2'>
								<span className='text-gray-600 text-md font-semi-bold'>
									{product.name}
								</span>
							</div>
							<div className='col-span-2 pt-3'>
								<div className='flex items-center space-x-2 text-sm justify-between'>
									<span className='text-gray-400'>
										{product.cartQuantity} x {product.price}
									</span>
									<span className='text-pink-400 font-semibold inline-block'>
										{product.cartQuantity * product.price}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
				<div className='px-8 border-b'>
					<div className='flex justify-between py-4 text-gray-600'>
						<span>Subtotal</span>
						<span className='font-semibold text-pink-500'>
							{" "}
							{totalNetPrice.toFixed(2)}
						</span>
					</div>
					<div className='flex justify-between py-4 text-gray-600'>
						<span>Shipping</span>
						<span className='font-semibold text-pink-500'>60</span>
					</div>
				</div>
				<div className='font-semibold text-xl px-8 flex justify-between py-8 text-gray-600'>
					<span>Total</span>
					<span>{shippingPrice.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
};

export default CheckoutComponent;
