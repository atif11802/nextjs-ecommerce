import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { addToCart } from "../../slices/cartSlice";
import { useSession } from "next-auth/react";
import { server } from "../../config";

const ProductDetails = ({ data }) => {
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(1);
	const { data: session, status } = useSession();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		setComments(data.reviews);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!rating) return;

		const options = {
			method: "POST",
			headers: { id: session.user._id },
			body: JSON.stringify({ rating, comment }),
		};

		fetch(
			`http://localhost:3000/api/db/product/createReviewProduct/${data._id}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				if (comments.length === 0) {
					setComments([
						{
							comment,
							rating: parseInt(rating),
							name: session?.user?.name,
							user: session?.user?._id,
						},
					]);
				}
				setComments([
					...comments,
					{
						comment,
						rating: parseInt(rating),
						name: session?.user?.name,
						user: session?.user?._id,
					},
				]);
			})
			.catch((err) => console.error(err));
		setComment("");
	};

	return (
		<>
			<Layout title={data.name} content={data.description}>
				<div className='md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4'>
					<div className='xl:w-2/6 lg:w-2/5 w-80 md:block hidden'>
						<img
							className='w-full'
							alt='img of a girl posing'
							src={data.productPictures[0].res}
						/>
						<img
							className='mt-6 w-full'
							alt='img of a girl posing'
							src={data.productPictures[1].res}
						/>
					</div>
					<div className='md:hidden'>
						<img
							className='w-full'
							alt='img of a girl posing'
							src={data.productPictures[2].res}
						/>
						<div className='flex items-center justify-between mt-3 space-x-4 md:space-x-0'>
							{data.productPictures &&
								data.productPictures.map((pic, index) => (
									<div key={index}>
										<img
											alt='img-tag-one'
											className='md:w-48 md:h-48 w-full'
											src={pic.res}
										/>
									</div>
								))}
							{/* <img
								alt='img-tag-one'
								className='md:w-48 md:h-48 w-full'
								src='https://i.ibb.co/cYDrVGh/Rectangle-245.png'
							/>
							<img
								alt='img-tag-one'
								className='md:w-48 md:h-48 w-full'
								src='https://i.ibb.co/f17NXrW/Rectangle-244.png'
							/>
							<img
								alt='img-tag-one'
								className='md:w-48 md:h-48 w-full'
								src='https://i.ibb.co/cYDrVGh/Rectangle-245.png'
							/>
							<img
								alt='img-tag-one'
								className='md:w-48 md:h-48 w-full'
								src='https://i.ibb.co/f17NXrW/Rectangle-244.png'
							/> */}
						</div>
					</div>
					<div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
						<div className='border-b border-gray-200 pb-6'>
							<h1
								className='
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						'
							>
								{data.name}
							</h1>
						</div>

						<div>
							<p className='xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7'>
								{data.description}
							</p>
						</div>
						<div>
							<div className='border-t border-b py-4 mt-7 border-gray-200'>
								<div
									onClick={() => setShow(!show)}
									className='flex justify-between items-center cursor-pointer'
								>
									<p className='text-base leading-4 text-gray-800'>
										Shipping and returns
									</p>
									<button
										className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
										aria-label='show or hide'
									>
										<svg
											className={
												"transform " + (show ? "rotate-180" : "rotate-0")
											}
											width='10'
											height='6'
											viewBox='0 0 10 6'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M9 1L5 5L1 1'
												stroke='#4B5563'
												strokeWidth='1.25'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>
								</div>
								<div
									className={
										"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
										(show ? "block" : "hidden")
									}
									id='sect'
								>
									You will be responsible for paying for your own shipping costs
									for returning your item. Shipping costs are nonrefundable
								</div>
							</div>
						</div>
						<div>
							<div className='border-b py-4 border-gray-200'>
								<div
									onClick={() => setShow2(!show2)}
									className='flex justify-between items-center cursor-pointer'
								>
									<p className='text-base leading-4 text-gray-800'>
										Contact us
									</p>
									<button
										className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
										aria-label='show or hide'
									>
										<svg
											className={
												"transform " + (show2 ? "rotate-180" : "rotate-0")
											}
											width='10'
											height='6'
											viewBox='0 0 10 6'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M9 1L5 5L1 1'
												stroke='#4B5563'
												strokeWidth='1.25'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>
								</div>
								<div
									className={
										"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
										(show2 ? "block" : "hidden")
									}
									id='sect'
								>
									If you have any questions on how to return your item to us,
									contact us. you can mail us to:ratul0947@gmail.com or call
									01763-973727
								</div>

								{data?.countInStock > 0 && (
									<div
										className={
											"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 "
										}
									>
										<select
											as='select'
											value={qty}
											onChange={(e) => setQty(e.target.value)}
											id='quantity'
											className='bg-red-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										>
											{[...Array(data.countInStock).keys()]
												.splice(0, 5)
												.map((x, i) => (
													<option key={i + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
										</select>
									</div>
								)}
								{data?.countInStock === 0 && (
									<div
										className=' pr-12 mt-4 flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3'
										role='alert'
									>
										<svg
											className='fill-current w-4 h-4 mr-2'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
										>
											<path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
										</svg>
										<p>Stock Out</p>
									</div>
								)}
							</div>
							{data?.countInStock >= 1 && (
								<div className='py-4 '>
									<div className='flex justify-between items-center cursor-pointer'>
										<button
											onClick={() =>
												dispatch(
													addToCart({ product: data, qty: parseInt(qty) })
												)
											}
											type='button'
											className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
										>
											Add to Cart
										</button>
									</div>
								</div>
							)}

							{/* comment section */}
							{session && (
								<div className=''>
									<h1 className='my-2'>Write A Customer Review</h1>
									<form className='w-full '>
										<div className='mb-2'>
											<label
												htmlFor='comment'
												className='text-lg text-gray-600'
											>
												Add a comment
											</label>
											<textarea
												className='w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1'
												name='comment'
												placeholder=''
												value={comment}
												onChange={(e) => {
													setComment(e.target.value);
												}}
											></textarea>
										</div>
										<div className='mb-2'>
											<label
												htmlFor='ratings'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
											>
												Select an option
											</label>
											<select
												value={rating}
												id='rating'
												className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												onChange={(e) => setRating(e.target.value)}
											>
												<option value='1'>1 poor</option>
												<option value='2'>2 Fair</option>
												<option value='3'>3 good</option>
												<option value='4'>4 Very good</option>
												<option value='5'>5 Excellent</option>
											</select>
										</div>

										<button
											onClick={handleSubmit}
											className='px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded'
										>
											Comment
										</button>
									</form>
								</div>
							)}

							{comments.length > 0 && (
								<div className='flex flex-col border border-white rounded-md p-3 mt-3'>
									<h1 className='my-2 text-2xl'>Review Section</h1>
									{comments.map((review, i) => (
										<div className='border-b-2 border-sky-500' key={i}>
											<p>{review.name}</p>
											<div className='flex'>
												{[...Array(review.rating).keys()].map((r, i) => (
													<div key={i}>
														<svg
															aria-hidden='true'
															className='w-3 h-3 text-yellow-400'
															fill='currentColor'
															viewBox='0 0 20 20'
															xmlns='http://www.w3.org/2000/svg'
														>
															<title>First star</title>
															<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
														</svg>
													</div>
												))}
											</div>

											<p className='text-gray-600 text-sm'>{review.comment}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default ProductDetails;

export async function getServerSideProps(context) {
	const { query } = context;

	// Fetch data from external API
	const res = await fetch(
		`${server}/api/db/product/getSingleProduct/${query.productDetails}`
	);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}
