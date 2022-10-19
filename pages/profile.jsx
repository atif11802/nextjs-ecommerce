import React from "react";
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { server } from "../config";

const profile = ({ user }) => {
	return (
		<Layout title={user.name} content={"profile page of ecommerce application"}>
			<div className='flex flex-col justify-center items-center '>
				<div className=''>
					{user && (
						<Image src={user.image} alt={user.name} width={300} height={300} />
					)}
				</div>
				<div className='text-gray-700'>
					<p>Name : {user.name}</p>
					<p>Role : {user.role}</p>
					<p>Total Product Buy : {user.TotalBuy}</p>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ req }) {
	// Fetch data from external API

	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	let res = await fetch(`${server}/api/db/${session.user._id}`, {
		headers: {
			cookie: req.headers.cookie || "",
		},
	});

	const user = await res.json();

	// Pass user to the page via props
	return { props: { user } };
}

export default profile;
