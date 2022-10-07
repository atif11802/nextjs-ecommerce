import AdminLayout from "../../layouts/adminLayout";
import Link from "next/link";
import { getSession } from "next-auth/react";

const index = () => {
	return (
		<div className='flex basis-2/3 justify-center text-center items-center'>
			<h1 className='text-2xl text-red-700'>Admin panel</h1>
		</div>
	);
};

export default index;

index.Layout = AdminLayout;
