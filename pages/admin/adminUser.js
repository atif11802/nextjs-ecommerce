import AdminLayout from "../../layouts/adminLayout";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { server } from "../../config";

const AdminUser = ({ users }) => {
	const [listUsers, setListUsers] = useState([]);
	const [user, setUser] = useState({});
	const [newRole, setNewRole] = useState("");
	const { data: session, status } = useSession();

	useEffect(() => {
		setListUsers(users);
	}, []);

	const handleDeleteUser = (deleteUser) => {
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
					body: JSON.stringify({ id: deleteUser._id }),
				};

				fetch(`${server}/api/db/deleteUser`, options)
					.then((response) => response.json())
					.then((response) => {
						swal("User Deleted!", {
							icon: "success",
						});
						setListUsers(
							listUsers.filter(function (item) {
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

	const handleChangeRole = () => {
		const options = {
			method: "PATCH",
			headers: { id: session?.user._id },
			body: JSON.stringify({ user: user._id, role: newRole }),
		};

		fetch(`${server}/api/db/updateUser`, options)
			.then((response) => response.json())
			.then((response) => {
				setListUsers(
					listUsers.map((item) => {
						return item._id === response._id ? response : item;
					})
				);
			})
			.catch((err) => console.error(err));
	};

	return (
		<Layout
			title={"list of all users"}
			content={"list of users accessed by admin"}
		>
			<div className=' '>
				<h1 className='text-center text-2xl text-rose-900'>
					Total Number of Users {listUsers.length}
				</h1>
				<div className='mt-4'>
					<div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
						<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th scope='col' className='py-3 px-6'>
										id
									</th>
									<th scope='col' className='py-3 px-6'>
										Name
									</th>
									<th scope='col' className='py-3 px-6'>
										Email
									</th>
									<th scope='col' className='py-3 px-6'>
										Role
									</th>
									<th scope='col' className='py-3 px-6'>
										Total buy
									</th>
									<th scope='col' className='py-3 px-6'>
										ACTION
									</th>
								</tr>
							</thead>

							<tbody>
								{listUsers?.map((user) => (
									<tr
										key={user._id}
										className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
									>
										<td className='py-4 px-6'>{user._id}</td>
										<td className='py-4 px-6'>{user.name}</td>
										<td className='py-4 px-6'>{user.email}</td>
										<td className='py-4 px-6'>{user.role}</td>
										<td className='py-4 px-6'>{user.TotalBuy}</td>
										<td className='py-4 px-6 flex items-center cursor-pointer'>
											<div className='flex'>
												<label
													htmlFor='my-modal'
													className='btn modal-button'
													onClick={() => setUser(user)}
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
											</div>
											<div
												className='ml-3 flex items-center cursor-pointer'
												onClick={() => handleDeleteUser(user)}
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
			<input type='checkbox' id='my-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>
						present role of this user is : {user.role}
					</h3>

					<p>
						choose the role you want to assign to this user from the list below
					</p>
					<select
						className='select select-bordered w-full max-w-xs'
						onChange={(e) => {
							setNewRole(e.target.value);
						}}
						defaultValue={user.role}
					>
						{/* <option disabled>select role</option> */}
						<option value='admin'>admin</option>
						<option value='buyer'>buyer</option>
					</select>

					<div className='modal-action'>
						<button
							className='px-2 bg-red-500 text-white rounded-lg '
							onClick={handleChangeRole}
						>
							change role
						</button>
						<label htmlFor='my-modal' className='btn'>
							cancel
						</label>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminUser;

AdminUser.Layout = AdminLayout;

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

	const res = await fetch(`http://localhost:3000/api/db/getAllUser`, {
		method: "GET",
		headers: {
			id: session?.user?._id,

			cookie: req.headers.cookie || "",

			"User-Agent": "*",
			Accept: "application/json; charset=UTF-8",
		},
	});
	const users = await res.json();

	// Pass users to the page via props
	return { props: { users } };
}
