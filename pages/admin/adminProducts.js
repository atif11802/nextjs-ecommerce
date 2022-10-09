import Layout from "../../components/Layout";
import AdminLayout from "../../layouts/adminLayout";
import { getSession, useSession } from "next-auth/react";
import { server } from "../config";
import { useEffect, useState } from "react";
import moment from "moment";
import swal from "sweetalert";

const adminProducts = ({ Allproducts }) => {
	const { data: session, status } = useSession();
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({
		name: "",
		_id: "",
		price: "",
		countInStock: "",
		brand: "",
		category: "",
		description: "",
	});

	useEffect(() => {
		setProducts(Allproducts);
	}, [Allproducts]);

	const handleModal = (product) => {
		setProduct({
			name: product.name,
			_id: product._id,
			price: product.price,
			countInStock: product.countInStock,
			brand: product.brand,
			category: product.category,
			description: product.description,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProduct((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleEdit = () => {
		swal({
			title: "Are you sure?",
			text: "do you want to edit this product?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const options = {
					method: "PATCH",
					headers: { id: session?.user._id },
					body: JSON.stringify({
						name: product.name,
						_id: product._id,
						price: product.price,
						countInStock: product.countInStock,
						brand: product.brand,
						category: product.category,
						description: product.description,
					}),
				};

				fetch(`${server}/api/db/product/updateProduct/${product._id}`, options)
					.then((response) => response.json())
					.then((response) => {
						var foundIndex = products.findIndex((x) => x._id == response._id);

						const newState = products.map((x) => {
							// 👇️ if id equals 2, update country property

							if (x._id === response._id) {
								console.log(x);
								console.log();
								return { ...response };
							}

							// 👇️ otherwise return object as is
							return x;
						});
						setProducts(newState);

						swal("successfully edited", {
							icon: "success",
						});
					})
					.catch((err) => console.error(err));
			} else {
				swal("product remains unchanged");
			}
		});
	};

	return (
		<Layout
			title={"admin-products"}
			content={"list of products accessed by admin"}
		>
			<div className=''>
				<h1 className='text-center text-2xl font-bold text-rose-900'>
					Products available {products && products.length}
				</h1>
				<div className='mt-5'>
					<div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
						<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th scope='col' className='py-3 px-6'>
										name
									</th>
									<th scope='col' className='py-3 px-6'>
										brand
									</th>
									<th scope='col' className='py-3 px-6'>
										category
									</th>
									<th scope='col' className='py-3 px-6 text-center'>
										countInStock
									</th>
									<th scope='col' className='py-3 px-6'>
										price
									</th>
									<th scope='col' className='py-3 px-6'>
										rating
									</th>
									<th scope='col' className='py-3 px-6'>
										createdAt
									</th>
									<th scope='col' className='py-3 px-6'>
										ACTION
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr
										className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
										key={product._id}
									>
										<td className='py-4 px-6'>{product.name}</td>
										<td className='py-4 px-6'>{product.brand}</td>
										<td className='py-4 px-6'>{product.category}</td>
										<td className='py-4 px-2'>{product.countInStock}</td>
										<td className='py-4 px-6'>{product.price}</td>
										<td className='py-4 px-6'>{product.rating.toFixed(2)}</td>
										<td className='py-4 px-6'>
											{moment(product.createdAt).format("MM-DD-YYYY")}
										</td>
										<td className='py-4 px-6 flex cursor-pointer'>
											<label
												htmlFor='my-modal-4'
												onClick={() => handleModal(product)}
												className='btn modal-button'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='currentColor'
													className='w-6 h-6'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
													/>
												</svg>
												<span>edit</span>
											</label>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<input type='checkbox' id='my-modal-4' className='modal-toggle' />
			<label htmlFor='my-modal-4' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<label
						htmlFor='message'
						className='block mb-2 text-sm font-medium text-white dark:text-gray-400'
					>
						Name
					</label>
					<input
						type='text'
						placeholder='name'
						className='input w-full text-white '
						value={product.name}
						name='name'
						onChange={handleChange}
					/>
					<label
						htmlFor='message'
						className='block mb-2  mt-3 text-sm font-medium text-white dark:text-gray-400'
					>
						Category
					</label>
					<input
						type='text'
						placeholder='category'
						className='input w-full text-white'
						value={product.category}
						name='category'
						onChange={handleChange}
					/>
					<label
						htmlFor='message'
						className='block mb-2 text-sm   mt-3font-medium text-white dark:text-gray-400'
					>
						Count In Stock
					</label>
					<input
						type='text'
						placeholder='countInStock'
						className='input w-full text-white'
						value={product.countInStock}
						name='countInStock'
						onChange={handleChange}
					/>
					<label
						htmlFor='message'
						className='block mb-2 text-sm font-medium text-white dark:text-gray-400  mt-3'
					>
						Price
					</label>

					<input
						type='text'
						placeholder='price'
						className='input w-full  text-white'
						value={product.price}
						name='price'
						onChange={handleChange}
					/>
					<label
						htmlFor='message'
						className='block mb-2 text-sm font-medium text-white dark:text-gray-400  mt-3'
					>
						Brand
					</label>
					<input
						type='text'
						placeholder='brand'
						className='input w-full text-white'
						value={product.brand}
						name='brand'
						onChange={handleChange}
					/>

					<label
						htmlFor='message'
						className='block mb-2 text-sm  mt-3 font-medium text-white dark:text-gray-400'
					>
						Description
					</label>

					<textarea
						id='message'
						rows='4'
						className='block p-2.5 w-full text-sm bg-slate-800 text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='description'
						value={product.description}
						name='description'
						onChange={handleChange}
					></textarea>

					<button
						onClick={handleEdit}
						className='px-8 py-2 mt-2 bg-red-600 hover:bg-rose-800 text-center text-sm text-white rounded duration-300'
					>
						edit
					</button>
				</label>
			</label>
		</Layout>
	);
};

export default adminProducts;

adminProducts.Layout = AdminLayout;

export async function getServerSideProps({ req }) {
	// Fetch users from external API

	const session = await getSession({ req });

	if (!session || session?.user?.role !== "admin") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const res = await fetch(`${server}/api/db/product/getAllProduct`, {
		method: "GET",
		headers: { id: session?.user?._id },
	});

	const Allproducts = await res.json();
	return { props: { Allproducts } };
}
