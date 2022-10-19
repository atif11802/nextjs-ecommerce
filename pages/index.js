import Script from "next/script";
import { useState } from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";
import { server } from "../config";

export default function Home({ data }) {
	return (
		<>
			<Script
				src='https://unpkg.com/flowbite@1.4.5/dist/flowbite.min.css'
				async
			></Script>
			<Layout content='this is a ecommerce app' title='Ecommerce App'>
				<div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{data?.map((product) => (
						<div className='flex justify-center items-center' key={product._id}>
							<Product product={product} />
						</div>
					))}
				</div>
			</Layout>
		</>
	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${server}/api/db/product/getProducts`);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}
