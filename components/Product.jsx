import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }) => {
	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();

	useEffect(() => {}, []);

	return (
		<>
			<div
				className='w-72 bg-white drop-shadow-md rounded-lg flex flex-col justify-center items-center
			transition ease-in-out delay-150 hover:-translate-y-2  duration-300'
			>
				<Image
					className='object-cover rounded-tl-lg rounded-tr-lg'
					src='https://images.unsplash.com/photo-1616332544207-7f3888d0373a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
					width={400}
					height={300}
					alt={product.name}
				/>
				<div className='px-5 py-3 space-y-2'>
					<h3 className='text-lg text-center'>{product.name}</h3>

					<p className='space-x-2'>
						<span className='text-2xl font-semibold'>$ {product.price}</span>
					</p>
					<div className='flex flex-col justify-between items-center pt-3 pb-2'>
						<button
							onClick={() => dispatch(addToCart({ product, qty: 1 }))}
							className='px-4 py-2  bg-red-600 hover:bg-amber-600 text-center text-sm text-white rounded duration-300'
						>
							Add to Cart
						</button>

						<Link href={`/product/${product._id}`}>
							<a className='px-4 py-2 mt-2 bg-red-600 hover:bg-amber-600 text-center text-sm text-white rounded duration-300'>
								product Details
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
