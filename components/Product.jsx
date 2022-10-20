import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }) => {
	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();

	return (
		<>
			<div
				className='w-72 bg-white drop-shadow-md rounded-lg flex flex-col justify-center items-center
			transition ease-in-out delay-150 hover:-translate-y-2  duration-300 cursor-pointer'
			>
				{" "}
				{product.productPictures.length > 0 ? (
					<Image
						className='object-cover rounded-tl-lg rounded-tr-lg'
						src={product.productPictures[0].res}
						width={400}
						height={300}
						alt={product.name}
					/>
				) : (
					<Image
						className='object-cover rounded-tl-lg rounded-tr-lg'
						src={
							"https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
						}
						width={400}
						height={300}
						alt={product.name}
					/>
				)}
				<div className='px-5 py-3 space-y-2 text-rose-600'>
					<h3 className='text-lg text-center'>{product.name}</h3>

					<p className='space-x-2'>
						<span className='text-2xl font-semibold text-center text-rose-600'>
							$ {product.price}
						</span>
					</p>
					<div className='flex flex-col justify-between items-center pt-3 pb-2'>
						{product.countInStock > 0 && (
							<button
								onClick={() => dispatch(addToCart({ product, qty: 1 }))}
								className='px-4 py-2  bg-red-600 hover:bg-rose-800 text-center text-sm text-white rounded duration-300'
							>
								Add to Cart
							</button>
						)}

						{product.countInStock === 0 && (
							<button className='px-4 py-2  opacity-50 cursor-not-allowed bg-red-600 hover:bg-rose-800 text-center text-sm text-white rounded duration-300'>
								Add to Cart
							</button>
						)}

						<Link href={`/product/${product._id}`}>
							<a className='px-4 py-2 mt-2 bg-red-600 hover:bg-rose-800 text-center text-sm text-white rounded duration-300'>
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
