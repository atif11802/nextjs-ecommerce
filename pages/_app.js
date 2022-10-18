import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
// 1. import `ChakraProvider` component
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
	components: {
		Steps,
	},
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const Layout = Component.Layout || EmptyLayout;

	return (
		<div className='bg-red-100 min-h-screen' style={{}}>
			<Provider store={store}>
				<SessionProvider session={session}>
					<ChakraProvider theme={theme}>
						<Navbar />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ChakraProvider>
				</SessionProvider>
			</Provider>
		</div>
	);
}

const EmptyLayout = ({ children }) => <>{children}</>;
