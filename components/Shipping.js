import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InAddress } from "../slices/checkoutSlice";

const Shipping = () => {
	// const [address, setAddress] = useState("");

	const address = useSelector((state) => state.checkout.address);

	const dispatch = useDispatch();

	return (
		<div className='flex flex-col justify-center mt-9 w-full items-center '>
			<label htmlFor='' className='text-3xl text-rose-400 '>
				Type your address to proceed{" "}
			</label>
			<textarea
				placeholder='Address'
				type='text'
				className='input input-bordered input-error w-full max-w-3xl mt-6'
				onChange={(e) => dispatch(InAddress(e.target.value))}
				value={address}
			/>
			{/* <button className='py-2 px-4 bg-rose-600 text-white rounded-xl m-7 '>
				submit
			</button> */}
		</div>
	);
};

export default Shipping;
