import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InPayment } from "../slices/checkoutSlice";

const Payment = () => {
	const paymentMethod = useSelector((state) => state.checkout.payment);
	const dispatch = useDispatch();

	return (
		<>
			<div className=' flex flex-col justify-center items-center '>
				<div className='form-control '>
					<label className='label cursor-pointer w-[400px]'>
						<span className='label-text'>online payments?</span>
						<input
							type='radio'
							name='online'
							className='radio checked:bg-red-500'
							onChange={(e) => dispatch(InPayment("online payment"))}
							checked={paymentMethod === "online payment"}
						/>
					</label>
				</div>
				<div className='form-control'>
					<label className='label cursor-pointer w-[400px]'>
						<span className='label-text'>cash on delivery?</span>
						<input
							type='radio'
							name='cash'
							className='radio checked:bg-blue-500'
							onChange={(e) => dispatch(InPayment("cash on delivery"))}
							checked={paymentMethod === "cash on delivery"}
						/>
					</label>
				</div>
			</div>
		</>
	);
};

export default Payment;
