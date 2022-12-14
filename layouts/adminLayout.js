import Link from "next/link";

const AdminLayout = ({ children }) => {
	return (
		<div className='md:flex'>
			<aside className='w-64' aria-label='Sidebar'>
				<div className='overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800'>
					<ul className='space-y-2'>
						<li>
							<Link href='/admin/order'>
								<a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
									<svg
										aria-hidden='true'
										className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
									<span className='ml-3'>Order</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href='/admin/adminUser'>
								<a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
										/>
									</svg>

									<span className='ml-3'>Users</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href='/admin/adminProducts'>
								<a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
									<svg
										aria-hidden='true'
										className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
											clipRule='evenodd'
										></path>
									</svg>
									<span className='flex-1 ml-3 whitespace-nowrap'>
										Products
									</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</aside>
			<div className='md:basis-2/3'>{children}</div>
		</div>
	);
};

export default AdminLayout;
