import * as S from "../../../../styles/BoardNew.styles";
import Autocomplete from "react-google-autocomplete";
import Uploads01 from "../../../commons/01/Uploads01.container";
import { IProductWriteUIProps } from "./productWriter.types";
// import "dotenv/config";
import { useState } from "react";

export default function ProductWriteUI(props: IProductWriteUIProps) {
	const googleApiKey = process.env.NEXT_PUBLIC_GOOGGLE_AUTOCOMPLETE_API_KEY;

	return (
		<>
			<div className='page-container'>
				{props.isOpen && (
					<S.AddressModal
						open={true}
						onOk={props.handleOk}
						onCancel={props.handleCancel}>
						<Autocomplete
							apiKey={googleApiKey}
							language='en'
							style={{ width: "90%", height: "30px" }}
							onPlaceSelected={props.onCompleteAddressSearch}
							options={{
								types: ["(regions)"],
								componentRestrictions: { country: "ca" },
							}}
							// defaultValue="Toronto"
						/>
					</S.AddressModal>
			
				)}
				{/* <Header /> */}
				<section className='new'>
					<h2>Uploading my product</h2>
					<div className='mt-60'>
						<h3>Seller Name</h3>
						<input
							// type="text"
							// placeholder="Please write your name"
							// onChange={props.onChangeSeller}
							type='text'
							placeholder={props.isEdit ? "" : "Please write your name"}
							onChange={props.onChangeSeller}
							defaultValue={props.data?.fetchUseditem.seller?.name ?? ""}
							readOnly={!!props.data?.fetchUseditem.seller?.name}
						/>
					</div>
					<div className='product-name mt-60'>
						<h3>Product Name</h3>
						<input
							type='text'
							placeholder={props.isEdit ? "" : "Please write your product name"}
							onChange={props.onChangeProduct}
							defaultValue={props.data?.fetchUseditem.name ?? ""}
							// readOnly={!!props.data?.fetchUseditem.name}
						/>
					</div>

					<div className='product-summary mt-60'>
						<h3>Summary</h3>
						<input
							type='text'
							placeholder={
								props.isEdit ? "" : "Please write your product detail"
							}
							onChange={props.onChangeContents}
							defaultValue={props.data?.fetchUseditem.contents ?? ""}
							// readOnly={!!props.data?.fetchUseditem.contents}
						/>
					</div>
					<div className='product-price mt-60'>
						<h3>Product Price</h3>
						<input
							type='text'
							placeholder={
								props.isEdit ? "" : "Please write your product price"
							}
							onChange={props.onChangePrice}
							defaultValue={props.data?.fetchUseditem.price ?? ""}
							// readOnly={!!props.data?.fetchUseditem.price}
						/>
					</div>
					<div className='product-tag mt-60'>
						<h3>Tag</h3>
						<input
							type='text'
							placeholder='#Tag'
							onChange={props.onChangeTag}
						/>
					</div>
					<div className='location mt-60'>
						<h3>Location</h3>
						<div className='location-content'>
							{/* <div>
              <img className="location-img" />
            </div> */}
							<div style={{ width: "100%" }}>
								<p>Address Detail</p>
								{/* <input type="text" onChange={onChangeAddressDetail} /> */}
								{/* <input
                type="text"
                // readOnly
                // defaultValue={data && data?.fetchBoard.boardAddress?.address}
              /> */}
								<input
									type='text'
									readOnly
									value={
										props.address !== ""
											? props.address
											: props.data?.fetchUseditem.useditemAddress?.address
									}
								/>

								<div>
									<S.ButtonAddress
										onClick={props.onClickAddressSearch}
										style={{ cursor: "pointer" }}>
										Zip Search
									</S.ButtonAddress>
								</div>
							</div>
						</div>
					</div>
					<div className='photo mt-60'>
						<h3>Photo</h3>
						<div className='photo-img'>
							{/* <div></div> */}
							{props.fileUrls.map((el, index) => (
								<Uploads01
									key={index}
									index={index}
									fileUrl={el}
									onChangeFileUrls={props.onChangeFileUrls}
								/>
							
							))}
						</div>
	
					</div>
					<div className='submit-btn-con mt-120'>
						<button
							className='submit-btn'
							type='submit'
							onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
							// isActive={props.isEdit ? true : props.isActive}
							// onClick={props.onClickSubmit}
						>
							{props.isEdit ? "Edit" : "Submit"}
						</button>
					</div>
				</section>
			</div>
		</>
	);
}


