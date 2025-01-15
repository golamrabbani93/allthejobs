'use client';
import React, {useEffect, useState} from 'react';
import {FaAngleDown, FaRegCreditCard, FaRegHeart} from 'react-icons/fa';
import {MdOutlinePayment} from 'react-icons/md';
import masterCard from '../../public/images/mastercard.png';
import visaCard from '../../public/images/visacard.png';
import amex from '../../public/images/amex.png';
import Image from 'next/image';
import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';
import DefaulHeader2 from '../header/DefaulHeader2';
import Spinner from '../Sppiner/Spinner';
import {useSelector} from 'react-redux';
const PaymentFormData = ({packageId}) => {
	const {talentPackages, loading, userRoleBasedData} = useSelector((state) => state.data);

	const getPackage = talentPackages?.find((item) => item.package_id === Number(packageId));

	const [formData, setFormData] = useState({
		firstName: '',
		email: '',
		mobile: '',
		country: '',
		paymentMethod: '',
		amount: '',
		paymentOptions: '',
		currency: 'usd',
		donationType: 'general',
	});
	//const set default Value
	useEffect(() => {
		if (getPackage || userRoleBasedData) {
			setFormData({
				...formData,
				amount: getPackage.price,
				paymentOptions: 'single',
				donationType: getPackage?.name,
				firstName: userRoleBasedData?.user?.name,
				email: userRoleBasedData?.user?.email,
				mobile: userRoleBasedData?.user?.phone,
				country: userRoleBasedData?.country,
			});
		}
	}, [userRoleBasedData, getPackage]);
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.paymentMethod === 'debit_credit') {
			window.open('https://donate.stripe.com/6oE03x8MLaLVh0I144', '_blank');
		} else if (formData.paymentMethod === 'paypal') {
			// Paypal checkout page link
			window.open('Paypal payment checkout link', '_blank');
		}
	};
	if (loading) {
		<>
			<DefaulHeader2 />
			<div className="flex justify-center items-center h-screen ">
				<Spinner size="md" />
			</div>
		</>;
	}
	return (
		<div className="">
			<DefaulHeader2 />
			{!loading && (
				<div className="flex justify-center items-center my-[150px]">
					<form className="w-full max-w-7xl " onSubmit={handleSubmit}>
						<div className="flex items-start justify-between gap-5  mb-10">
							<div className="relative w-full">
								<select
									name="paymentOptions"
									id="payment-options"
									value={formData.paymentOptions}
									onChange={handleChange}
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
								>
									<option value="single">Single Payment</option>
									{/* <option value="recurring">Recurring Payment</option>
									<option value="installment">Installment Payment</option>
									<option value="custom">Custom Payment Amount</option> */}
								</select>
								<span className="absolute bottom-4 right-4">
									<FaAngleDown />
								</span>
							</div>

							<div className="relative w-full">
								<select
									name="currency"
									id="currency"
									value={formData.currency}
									onChange={handleChange}
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								>
									<option value="usd">$ - USD</option>
									{/* <option value="eur">€ - EUR</option>
                            <option value="gbp">£ - GBP</option>
                            <option value="jpy">¥ - JPY</option>
                            <option value="inr">₹ - INR</option>
                            <option value="cny">¥ - CNY</option> */}
								</select>
								<span className="absolute bottom-4 right-4">
									<FaAngleDown />
								</span>
							</div>

							<input
								className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="amount"
								type="number"
								name="amount"
								disabled={true}
								value={formData.amount}
								onChange={handleChange}
								placeholder="Amount"
							/>

							<div className="relative w-full">
								<select
									name="donationType"
									id="donation-type"
									value={formData.donationType}
									onChange={handleChange}
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								>
									<option value="general">{getPackage?.name}</option>
									{/* <option value="education">Education Fund</option>
                            <option value="medical">Medical Aid</option>
                            <option value="disaster">Disaster Relief</option>
                            <option value="community">Community Development</option>
                            <option value="animal">Animal Welfare</option>
                            <option value="environment">Environmental Protection</option> */}
								</select>
								<span className="absolute bottom-4 right-4">
									<FaAngleDown />
								</span>
							</div>
						</div>

						<h2 className="text-2xl uppercase font-bold mb-6 text-[#0E1B51]">
							Personal Details <span className="text-sm">(optional)</span>
						</h2>
						<div className="flex -mx-3 mb-6 gap-20">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="firstName"
								>
									Name
								</label>
								<input
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="firstName"
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									disabled={true}
								/>
							</div>
							<div className="w-full md:w-1/2 px-3">
								<label
									className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="country"
								>
									Country
								</label>
								<input
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="country"
									type="text"
									name="country"
									value={formData.country}
									disabled={true}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="flex -mx-3 mb-6 gap-20">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="email"
									type="email"
									name="email"
									value={formData.email}
									disabled={true}
									onChange={handleChange}
								/>
							</div>
							<div className="w-full md:w-1/2 px-3">
								<label
									className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="mobile"
								>
									Mobile
								</label>
								<input
									className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="mobile"
									type="text"
									name="mobile"
									value={formData.mobile}
									disabled={true}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="my-10">
							<h2 className="text-2xl uppercase font-bold mb-6 text-[#0E1B51]">
								Select a Payment Method
							</h2>
							<div className="flex -mx-3 mb-6 gap-20 items-center">
								<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										className={`text-xl flex items-center justify-between tracking-wide font-bold mb-2 border rounded-lg py-3 px-4 ${
											formData.paymentMethod === 'debit_credit'
												? 'text-[#0E1B51] border-green-400 bg-green-100'
												: 'text-gray-700  border-red-400 bg-red-100'
										}`}
									>
										<div className="flex items-center gap-2">
											<input
												type="radio"
												name="paymentMethod"
												value="debit_credit"
												checked={formData.paymentMethod === 'debit_credit'}
												onChange={handleChange}
												className="hidden"
												id="debit_credit"
											/>
											<label
												htmlFor="debit_credit"
												className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
													formData.paymentMethod === 'debit_credit'
														? 'bg-white  border-green-500'
														: 'border-gray-400 '
												}`}
											>
												{formData.paymentMethod === 'debit_credit' && (
													<div className="w-3 h-3 bg-green-500 rounded-full"></div>
												)}
											</label>
											<span>Credit/Debit Card</span>
											<div className="flex items-center gap-3 ml-5">
												{/* <img src="./visa-card.png" alt="Visa" className="w-9" /> */}
												{/* <img src={masterCard} alt="MasterCard" className="w-10" /> */}
												<Image
													src={visaCard}
													height={200}
													width={200}
													alt="image"
													className="w-[50px] h-auto hover:scale-110 transform transition duration-300 ease-in-out hover:cursor-pointer"
												/>
												<Image
													src={masterCard}
													height={200}
													width={200}
													alt="image"
													className="w-[50px] h-auto hover:scale-110 transform transition duration-300 ease-in-out hover:cursor-pointer"
												/>
												<Image
													src={amex}
													height={200}
													width={200}
													alt="image"
													className="w-[40px] h-auto hover:scale-110 transform transition duration-300 ease-in-out hover:cursor-pointer"
												/>
												{/* <img src="./amex.png" alt="Amex" className="w-7" /> */}
											</div>
										</div>
										<FaRegCreditCard className="text-yellow-400" />
									</label>
								</div>
								{/* <div className="w-full md:w-1/2 px-3">
          <label
            className={`text-xl flex items-center justify-between tracking-wide font-bold mb-2 border rounded-lg py-3 px-4 ${
              formData.paymentMethod === "paypal"
                ? "text-[#0E1B51] border-green-400 bg-green-100"
                : "text-gray-700 border-gray-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
                className="hidden"
                id="paypal"
              />
              <label
                htmlFor="paypal"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.paymentMethod === "paypal"
                    ? "bg-white border-green-500"
                    : "border-gray-400"
                }`}
              >
                {formData.paymentMethod === "paypal" && (
                  <div className="w-3 h-3  bg-green-500 rounded-full"></div>
                )}
              </label>
              <img src="./PayPal.png" alt="PayPal" className="w-36" />
            </div>
          </label>
        </div> */}
							</div>
						</div>
						<div></div>

						<div className="flex justify-center mt-10">
							{formData.paymentMethod && (
								<button
									type="submit"
									role="link"
									className="btn-style-one font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 "
								>
									<span className="text-2xl">Pay Now</span>{' '}
									<MdOutlinePayment className="text-2xl" />
								</button>
							)}
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default PaymentFormData;
