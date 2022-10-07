import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "../public/android-chrome-512x512.png";
import { useSelector } from "react-redux";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [cart, setCart] = useState([]);
	const { data: session } = useSession();

	const cartItems = useSelector((state) => state.cart.cartItems);

	useEffect(() => {
		setCart(cartItems);

		return () => {};
	}, [cartItems]);

	return (
		<Disclosure as='nav' className='bg-gray-800 sticky top-0 z-50'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<Link href='/'>
										<img
											className='block h-8 w-auto lg:hidden cursor-pointer'
											src={Logo.src}
											alt='Your Company'
										/>
									</Link>{" "}
									<Link href='/'>
										<img
											className='hidden h-8 w-auto lg:block cursor-pointer'
											src={Logo.src}
											alt='Your Company'
										/>
									</Link>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='relative'>
										<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
											<svg
												aria-hidden='true'
												className='w-5 h-5 text-gray-500 dark:text-gray-400'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
												></path>
											</svg>
										</div>
										<input
											type='search'
											id='default-search'
											className='block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='search Products'
											required
										/>
									</div>
								</div>
							</div>

							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<Link href='/cart'>
									<button
										type='button'
										className='rounded-full flex bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
									>
										<span className='sr-only'>cart</span>

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
												d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
											/>
										</svg>
										{cart.length}
									</button>
								</Link>

								{/* Profile dropdown */}
								<Menu as='div' className='relative ml-3'>
									{session ? (
										<>
											<div>
												<Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
													<span className='sr-only'>Open user menu</span>
													<img
														className='h-8 w-8 rounded-full'
														src={session.user.image}
														alt=''
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														{({ active }) => (
															<Link href='/profile'>
																<a
																	className={classNames(
																		active ? "bg-gray-100" : "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}
																>
																	Your Profile
																</a>
															</Link>
														)}
													</Menu.Item>

													{session.user.role === "admin" && (
														<Menu.Item>
															{({ active }) => (
																<Link href='/admin'>
																	<a
																		className={classNames(
																			active ? "bg-gray-100" : "",
																			"block px-4 py-2 text-sm text-gray-700"
																		)}
																	>
																		Admin
																	</a>
																</Link>
															)}
														</Menu.Item>
													)}

													<Menu.Item>
														{({ active }) => (
															<Link href='/api/auth/signout'>
																<a
																	onClick={(e) => {
																		e.preventDefault();
																		signOut();
																	}}
																	className={classNames(
																		active ? "bg-gray-100" : "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}
																>
																	Sign out
																</a>
															</Link>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</>
									) : (
										<>
											<Link href='/api/auth/signin'>
												<div className='flex cursor-pointer'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth={1.5}
														stroke='#999'
														className='w-6 h-6 mr-1'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
														/>
													</svg>

													<a className='text-white'>signin</a>
												</div>
											</Link>
										</>
									)}
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pt-2 pb-3'>
							<div className='relative'>
								<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
									<svg
										aria-hidden='true'
										className='w-5 h-5 text-gray-500 dark:text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
										></path>
									</svg>
								</div>
								<input
									type='search'
									id='default-search'
									className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Search Mockups, Logos...'
									required
								/>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
