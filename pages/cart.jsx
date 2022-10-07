import Cart from "../components/Cart";
import Layout from "../components/Layout";

const cart = () => {
	return (
		<>
			<Layout title={"cart"} content={"cart page of ecommerce page"}>
				<Cart />
			</Layout>
		</>
	);
};

export default cart;
