import React from "react";
import Layout from "../components/Layout";
import { Center, Box, Button } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import { useSelector, useDispatch } from "react-redux";
import CheckoutComponent from "../components/CheckoutComponent";

const Checkout = () => {
	const address = useSelector((state) => state.checkout);

	const {
		nextStep,
		prevStep,
		// reset,
		activeStep,
	} = useSteps({
		initialStep: 0,
	});

	console.log(activeStep);

	return (
		<Layout title='checkout' content='checkout page of user'>
			<Box width='100%'>
				<Steps activeStep={activeStep}>
					<Step label={"Shipping Address"} key={1}>
						<Shipping />
					</Step>
					<Step label={"Payment"} key={2}>
						<Payment />
					</Step>
					<Step label={"checkout"} key={3}>
						<CheckoutComponent />
					</Step>
				</Steps>
				<Center>
					{activeStep > 0 && activeStep !== 2 && (
						<button
							className='py-2 px-4 bg-slate-600  text-white rounded-xl m-7 hover:bg-slate-800 duration-200'
							onClick={() => {
								prevStep(1);
							}}
						>
							Previous
						</button>
					)}

					<Box pl={5}></Box>
					{activeStep !== 2 && (
						<button
							onClick={() => {
								nextStep(1);
							}}
							className='py-2 px-4 bg-rose-600 text-white rounded-xl m-7  hover:bg-rose-800 duration-200'
						>
							next
						</button>
					)}
				</Center>
			</Box>
		</Layout>
	);
};

export default Checkout;
