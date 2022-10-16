import Layout from "../../components/Layout";
import AdminLayout from "../../layouts/adminLayout";
import { getSession, useSession } from "next-auth/react";
import { server } from "../config";
import { useEffect, useState } from "react";
import moment from "moment";
import swal from "sweetalert";
import Dropzone from "react-dropzone";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

const adminProducts = ({ Allproducts }) => {
	const { data: session, status } = useSession();
	const [products, setProducts] = useState([]);
	const [images, setImages] = useState([]);
	const [product, setProduct] = useState({
		name: "",
		_id: "",
		price: "",
		countInStock: "",
		brand: "",
		category: "",
		description: "",
		productPictures: [],
	});

	const [newProduct, setNewProduct] = useState({
		name: "",
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
			productPictures: product.productPictures,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProduct((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleNewProductChange = (e) => {
		const { name, value } = e.target;

		setNewProduct((prevState) => ({
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

	const handleDelete = (deleteProduct) => {
		console.log(deleteProduct, session?.user._id);
		swal({
			title: "Are you sure?",
			text: "you want to delete this user",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const options = {
					method: "DELETE",
					headers: { id: session?.user._id },
				};

				fetch(
					`${server}/api/db/product/deleteProduct/${deleteProduct._id}`,
					options
				)
					.then((response) => response.json())
					.then((response) => {
						swal("User Deleted!", {
							icon: "success",
						});
						setProducts(
							products.filter(function (item) {
								return item._id !== response._id;
							})
						);
					})
					.catch((err) => {
						swal("user not deleted");
						console.error(err);
					});
			} else {
				swal("happy admininja");
			}
		});
	};

	const handleDrop = async () => {
		// Push all the axios request promise into a single array
		const uploaders = Object.values(images).map((file) => {
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `codeinfuse, medium, gist`);
			formData.append("upload_preset", "chatapp"); // Replace the preset name with your own
			formData.append("api_key", "182276719267498"); // Replace API key with your own Cloudinary key
			formData.append("timestamp", (Date.now() / 1000) | 0);

			// Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
			return axios
				.post("https://api.cloudinary.com/v1_1/ratul/image/upload", formData, {
					headers: { "X-Requested-With": "XMLHttpRequest" },
				})
				.then((response) => {
					const data = response.data;

					return data;
				});
		});

		// Once all the files are uploaded
		return await axios.all(uploaders).then(() => {
			// ... perform after upload is successful operation
			// uploaders.map((uploader) => {
			// 	uploader.then((response) => {
			// 		setUploadedImages([...uploadedImages, response]);
			// 	});
			// });
			return uploaders;
		});
	};

	const handlePostProduct = async (e) => {
		e.preventDefault();

		try {
			const pic = await handleDrop();

			let imageResponses = await Promise.all(pic);
			// res.status(200).json({ images: imageResponses });
			const productPictures = imageResponses.map((image) => {
				let obj = {};
				obj.res = image.secure_url;
				obj.public = image.public_id;
				return obj;
				// return ({ public_id, secure_url } = image);
			});

			const options = {
				method: "POST",
				headers: { id: session?.user._id },
				body: JSON.stringify({
					name: newProduct.name,
					countInStock: newProduct.countInStock,
					price: newProduct.price,
					description: newProduct.description,
					brand: newProduct.brand,
					category: newProduct.category,
					productPictures,
				}),
			};

			fetch(`${server}/api/db/product/postProduct`, options)
				.then((response) => response.json())
				.then((response) => {
					setProducts([...products, response]);
					setNewProduct({
						name: "",
						countInStock: "",
						price: "",
						description: "",
						brand: "",
						category: "",
					});
					setImages([]);
				})
				.catch((err) => console.error(err));
		} catch (err) {
			console.log(err);
		}
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
				<label htmlFor='my-modal-5' className='btn modal-button'>
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
					<span>Add Product</span>
				</label>

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
										sold
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
										<td className='py-4 px-6'>{product.sold}</td>
										<td className='py-4 px-6'>{product?.rating?.toFixed(2)}</td>
										<td className='py-4 px-6'>
											{moment(product.createdAt).format("MM-DD-YYYY")}
										</td>
										<td className='py-4 px-6 flex cursor-pointer'>
											<label
												htmlFor='my-modal-4'
												onClick={() => {
													handleModal(product);
												}}
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
											<div
												className='ml-3 flex bg-rose-700 rounded-md p-3 text-white items-center cursor-pointer'
												onClick={() => handleDelete(product)}
											>
												{/*  */}

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
														d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
													/>
												</svg>
												<span>delete</span>

												{/*  */}
											</div>
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
					<label
						htmlFor='message'
						className='block mb-2 text-sm font-medium text-white dark:text-gray-400  mt-3'
					>
						images
					</label>
					<div className='flex mt-2'>
						{product.productPictures?.map((pic, index) => {
							return (
								<div key={pic.public} className='ml-3 mb-2'>
									<img
										className='w-[40] h-[40] object-cover rounded-md'
										src={pic.res}
										alt={product.name}
									/>
								</div>
							);
						})}
					</div>

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

			<input type='checkbox' id='my-modal-5' className='modal-toggle' />
			<label htmlFor='my-modal-5' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<form className='space-y-6' action='#'>
						<div>
							<label
								htmlFor='name'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								Product name
							</label>
							<input
								type='text'
								name='name'
								id='name'
								className='bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								placeholder='enter name'
								required
								onChange={handleNewProductChange}
							/>
						</div>
						<div>
							<label
								htmlFor='brand'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								Brand
							</label>
							<input
								type='text'
								name='brand'
								id='brand'
								className='bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								placeholder='enter brand'
								required
								onChange={handleNewProductChange}
							/>
						</div>
						<div>
							<label
								htmlFor='countInStock'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								count In Stock
							</label>
							<input
								type='text'
								name='countInStock'
								id='countInStock'
								className='bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								placeholder='enter Total count In Stock'
								required
								onChange={handleNewProductChange}
							/>
						</div>
						<div>
							<label
								htmlFor='description'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								Description
							</label>
							<textarea
								id='message'
								rows='4'
								className='block p-2.5 w-full text-sm text-black  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='description'
								name='description'
								onChange={handleNewProductChange}
							></textarea>
						</div>
						<div>
							<label
								htmlFor='price'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								Price
							</label>
							<input
								type='number'
								name='price'
								id='price'
								className='bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								placeholder='enter Total price'
								required
								onChange={handleNewProductChange}
							/>
						</div>
						<div className='flex justify-center'>
							<div className='mb-3  w-full'>
								{/* <Dropzone onDrop={handleDrop} multiple accept='image/*'>
									<p>Drop your files or click here to upload</p>
								</Dropzone> */}
								<label
									htmlFor='formFile'
									className='form-label inline-block mb-2 text-white'
								>
									Image upload
								</label>
								<input
									className='form-control block
    w-full
   
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									type='file'
									id='formFile'
									multiple
									// onChange={handleImageUpload}
									onChange={(e) => {
										setImages(e.target.files);
									}}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='category'
								className='block mb-2 text-sm font-medium text-gray-300'
							>
								Category
							</label>
							<input
								type='text'
								name='category'
								id='category'
								className='bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								placeholder='enter Total price'
								required
								onChange={handleNewProductChange}
							/>
						</div>
						<button
							onClick={handlePostProduct}
							type='submit'
							className='w-full text-white bg-rose-700 hover:bg-rose-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						>
							Add this product
						</button>
					</form>
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
