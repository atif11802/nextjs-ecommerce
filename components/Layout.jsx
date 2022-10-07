import Head from "next/head";
import Script from "next/script";

const Layout = ({ title, content, children }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={content} />
				{/* <link rel='icon' href='/favicon.ico' /> */}

				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				></link>

				<script src='https://unpkg.com/flowbite@1.4.5/dist/flowbite.js'></script>
				{/* <Script
					
					strategy='beforeInteractive'
				></Script> */}
			</Head>

			<div className='container mx-auto px-4 pt-7'>{children}</div>
		</div>
	);
};

export default Layout;
