import { useState } from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";

export default function Home({ data }) {
	return (
		<>
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
	const res = await fetch(`http://localhost:3000/api/db/product/getProducts`);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}
