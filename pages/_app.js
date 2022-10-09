import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const Layout = Component.Layout || EmptyLayout;

	return (
		<div className='bg-red-100 min-h-screen' style={{}}>
			<Provider store={store}>
				<SessionProvider session={session}>
					<Navbar />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SessionProvider>
			</Provider>
		</div>
	);
}

const EmptyLayout = ({ children }) => <>{children}</>;
