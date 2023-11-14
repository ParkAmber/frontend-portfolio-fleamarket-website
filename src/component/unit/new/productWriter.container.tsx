// import Header from "../../../../src/commons/layout/header";
// image
// import Header from "../../../../src/commons/layout/header";
// image

// import { checkValidationImage } from "../../../../src/commons/01/Uploads01.validation";
// // import Uploads01UI from "./Uploads01.presenter";
// import type { IUploads01Props } from "../../../../src/commons/01/Uploads01.types";
// // import { UPLOAD_FILE } from "../../../../src/commons/01/Uploads01.queries";
// import { Modal } from "antd";
// import {
//   UploadButton,
//   UploadFileHidden,
//   UploadImage,
// } from "../../../../src/commons/01/Uploads01.styles";
// import type { IUploads01UIProps } from "../../../../src/commons/01/Uploads01.types";
//image
import * as S from "../../../../styles/BoardNew.styles";
import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
  IUpdateUseditemInput,
} from "../../../commons/types/generated/types";
// import { Address } from "react-daum-postcode";
// import Autocomplete from "react-google-autocomplete";
// import { checkValidationFile } from "../libraries/validationFile";
// import Uploads01 from "../../commons/01/Uploads01.container";
import ProductWriteUI from "./productWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./productWriter.queries";
export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any; //data?는 있어도 되고 없어도 됨!!=>new page에는 data없고 edit page에는 data있으므로!!
}

//이 페이지에는 자바스크립트로 카카오 맵 라이브러리 다운받아줬으므로 카카오 들어있다고(즉, window.kakao 가능하다고)선언해줌!!
// declare const window: typeof globalThis & {
//   google: any;
// };
export default function ProductWrite(props: IBoardWriteProps) {
  const [myFunction] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const [myFunctionEdit] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);

  // const [uploadFile] = useMutation<
  //   Pick<IMutation, "uploadFile">,
  //   IMutationUploadFileArgs
  // >(UPLOAD_FILE);

  const fileRef = useRef<HTMLInputElement>(null);

  const [seller, setSeller] = useState("");
  const [product, setProduct] = useState("");
  const [contents, setContents] = useState("");
  const [price, setPrice] = useState<number>();
  const [tags, setTag] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  // image

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };
  //edit페이지에서 default value로 이미지 있으면? 그 이미지를 보여줘라!!
  useEffect(() => {
    // props.data?.fetchUseditem.images
    const images = props.data?.fetchUseditem.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);

  //image

  const [sellerError, setSellerError] = useState("");
  const [productError, setProductError] = useState("");
  const [contentsError, setContentsError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [tagError, setTagError] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onChangeSeller = (e: ChangeEvent<HTMLInputElement>) => {
    setSeller(e.target.value);
  };
  const onChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const onChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const newTags = [e.target.value];
    // newTags[i] =
    setTag(newTags);
  };

  const onClickSubmit = async () => {
    if (!seller) {
      setSellerError("Please type your email");
    } else {
      setSellerError("");
    }
    if (!product) {
      setProductError("Please type your password");
    } else {
      setProductError("");
    }

    if (!contents) {
      setContentsError("please fill the blank");
    } else {
      setContentsError("");
    }
    if (!price) {
      setPriceError("please fill the blank");
    } else {
      setPriceError("");
    }
    if (seller && product && price && contents) {
      try {
        const result = await myFunction({
          variables: {
            createUseditemInput: {
              name: seller,
              remarks: product,
              contents: contents,
              price: price,
              images: [...fileUrls],
              tags: [...tags],
              useditemAddress: {
                zipcode: zipcode,
                address: address,
                addressDetail: addressDetail,
              },
            },
          },
        });
        alert(result.data?.createUseditem.name);
        console.log(result.data);

        void router.push(
          `/flea_market/products/detail/${result.data?.createUseditem._id}`
        );
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };
  const onCompleteAddressSearch = (data: any): void => {
    setAddress(data?.formatted_address);
    setZipcode(data?.formatted_address);
    setIsOpen((prev) => !prev);
    console.log(data);
  };

  const handleOk = () => {
    setIsOpen((prev) => !prev);
  };
  const handleCancel = () => {
    setIsOpen((prev) => !prev);
  };
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onClickAddressSearch = () => {
    setIsOpen((prev) => !prev);
  };
  //

  // const onClickUpload = (): void => {
  //   fileRef.current?.click();
  // };

  // const [index, setIndex] = useState<number>();
  // const onChangeFile = async (
  //   event: ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   const file = event.target.files?.[0];
  //   const isValid = checkValidationImage(file);
  //   if (!isValid) return;

  //   try {
  //     const result = await uploadFile({ variables: { file } });
  //     fileUrls.map((el, index: number) =>
  //       onChangeFileUrls(result.data?.uploadFile.url, index)
  //     );

  //     console.log(index);
  //   } catch (error) {
  //     if (error instanceof Error) Modal.error({ content: error.message });
  //   }
  // };

  //edit click
  const onClickUpdate = async (): Promise<void> => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchUseditem.images);
    //객채 두개가 완전히 똑같다 하더라도, 서로 저장되있는 주소가 다르므로 false가 나옴!!=> JSON.stringify로 문자화해서 비교해야함!!! **
    const isChangedFiles = currentFiles !== defaultFiles; //객체의 값을 비교해야할때는 JSON.stringify로 문자화해서 비교해야함!!! **

    console.log(isChangedFiles);
    if (
      seller === "" &&
      product === "" &&
      contents === "" &&
      !price &&
      address === "" &&
      addressDetail === "" &&
      zipcode === "" &&
      !isChangedFiles
    ) {
      alert("there are no changes");
      return;
    }
    const myvariables: IUpdateUseditemInput = {};
    if (seller) myvariables.name = seller;
    if (product) myvariables.remarks = product;
    if (contents) myvariables.contents = contents;
    if (price) myvariables.price = price;
    if (isChangedFiles) myvariables.images = fileUrls;

    if (zipcode !== "" || address !== "" || addressDetail !== "") {
      myvariables.useditemAddress = {};
      if (address) myvariables.useditemAddress.address = address;
      if (zipcode) myvariables.useditemAddress.zipcode = zipcode;
      if (addressDetail)
        myvariables.useditemAddress.addressDetail = addressDetail;
    }

    try {
      if (typeof router.query.productId !== "string") {
        alert("there's something wrong with your system");
        return;
      }
      const result = await myFunctionEdit({
        variables: {
          // updateBoardInput: myvariables,
          updateUseditemInput: myvariables,
          useditemId: router.query.productId,
        },
      });
      console.log(result);
      alert(result.data?.updateUseditem._id);
      // alert(result.data?.updateBoard.youtubeUrl);
      // router.push(`/boards/detail/${result.data?.updateUseditem._id}`);
      router.push(
        `/flea_market/products/detail/${result.data?.updateUseditem._id}`
      );
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      // alert(error.message);
    }
  };

  return (
    <ProductWriteUI
      isOpen={isOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      isEdit={props.isEdit}
      data={props.data}
      //   Autocomplete={Autocomplete}
      onCompleteAddressSearch={onCompleteAddressSearch}
      onChangeSeller={onChangeSeller}
      onChangeProduct={onChangeProduct}
      onChangeContents={onChangeContents}
      onChangePrice={onChangePrice}
      onChangeTag={onChangeTag}
      address={address}
      zipcode={zipcode}
      onClickAddressSearch={onClickAddressSearch}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
    />
  );
}
// =================================================================

// // import Header from "../../../../src/commons/layout/header";
// // image
// // import Header from "../../../../src/commons/layout/header";
// // image

// // import { checkValidationImage } from "../../../../src/commons/01/Uploads01.validation";
// // // import Uploads01UI from "./Uploads01.presenter";
// // import type { IUploads01Props } from "../../../../src/commons/01/Uploads01.types";
// // // import { UPLOAD_FILE } from "../../../../src/commons/01/Uploads01.queries";
// // import { Modal } from "antd";
// // import {
// //   UploadButton,
// //   UploadFileHidden,
// //   UploadImage,
// // } from "../../../../src/commons/01/Uploads01.styles";
// // import type { IUploads01UIProps } from "../../../../src/commons/01/Uploads01.types";
// //image
// import * as S from "../../../../styles/BoardNew.styles";
// import { useMutation } from "@apollo/client";
// import { useEffect, useRef, useState } from "react";

// import { useRouter } from "next/router";
// import { ChangeEvent } from "react";
// import {
//   IMutation,
//   IMutationCreateUseditemArgs,
//   IMutationUpdateUseditemArgs,
//   IMutationUploadFileArgs,
//   IUpdateUseditemInput,
// } from "../../../commons/types/generated/types";
// // import { Address } from "react-daum-postcode";
// // import Autocomplete from "react-google-autocomplete";
// // import { checkValidationFile } from "../libraries/validationFile";
// // import Uploads01 from "../../commons/01/Uploads01.container";
// import ProductWriteUI from "./productWrite.presenter";
// import {
//   CREATE_USED_ITEM,
//   UPDATE_USED_ITEM,
//   UPLOAD_FILE,
// } from "./productWriter.queries";
// export interface IBoardWriteProps {
//   isEdit: boolean;
//   data?: any; //data?는 있어도 되고 없어도 됨!!=>new page에는 data없고 edit page에는 data있으므로!!
// }

// //이 페이지에는 자바스크립트로 카카오 맵 라이브러리 다운받아줬으므로 카카오 들어있다고(즉, window.kakao 가능하다고)선언해줌!!
// // declare const window: typeof globalThis & {
// //   google: any;
// // };
// export default function ProductWrite(props: IBoardWriteProps) {
//   const [myFunction] = useMutation<
//     Pick<IMutation, "createUseditem">,
//     IMutationCreateUseditemArgs
//   >(CREATE_USED_ITEM);

//   const [myFunctionEdit] = useMutation<
//     Pick<IMutation, "updateUseditem">,
//     IMutationUpdateUseditemArgs
//   >(UPDATE_USED_ITEM);

//   const [uploadFile] = useMutation<
//     Pick<IMutation, "uploadFile">,
//     IMutationUploadFileArgs
//   >(UPLOAD_FILE);

//   const fileRef = useRef<HTMLInputElement>(null);

//   const [seller, setSeller] = useState("");
//   const [product, setProduct] = useState("");
//   const [contents, setContents] = useState("");
//   const [price, setPrice] = useState<number>();
//   const [tags, setTag] = useState<string[]>([]);
//   const [address, setAddress] = useState("");
//   const [addressDetail, setAddressDetail] = useState("");
//   const [zipcode, setZipcode] = useState("");

//   // const [imageUrl, setImageUrl] = useState("");
//   const [fileUrls, setFileUrls] = useState(["", "", ""]);
//   const [imageUrls, setImageUrls] = useState(["", "", ""]); //미리보기 용
//   const [files, setFiles] = useState<File[]>([]); //데이터 보내기 용
//   // image

//   //미리보기 용
//   const onChangeFileUrls = (fileUrl: string, index: number): void => {
//     const newFileUrls = [...fileUrls];
//     newFileUrls[index] = fileUrl;
//     setFileUrls(newFileUrls);
//     // const newFileUrls = [...imageUrls];
//     // newFileUrls[index] = fileUrl;
//     // setImageUrls(newFileUrls);
//   };
//   //미리보기 용
//   //edit페이지에서 default value로 이미지 있으면? 그 이미지를 보여줘라!!
//   useEffect(() => {
//     // props.data?.fetchUseditem.images
//     const images = props.data?.fetchUseditem.images;
//     if (images !== undefined && images !== null) setFileUrls([...images]);
//   }, [props.data]);

//   //image

//   const [sellerError, setSellerError] = useState("");
//   const [productError, setProductError] = useState("");
//   const [contentsError, setContentsError] = useState("");
//   const [priceError, setPriceError] = useState("");
//   const [tagError, setTagError] = useState("");

//   const [isActive, setIsActive] = useState(false);

//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const onChangeSeller = (e: ChangeEvent<HTMLInputElement>) => {
//     setSeller(e.target.value);
//   };
//   const onChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
//     setProduct(e.target.value);
//   };
//   const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
//     setContents(e.target.value);
//   };
//   const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
//     setPrice(Number(e.target.value));
//   };
//   const onChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
//     const newTags = [e.target.value];
//     // newTags[i] =
//     setTag(newTags);
//   };

//   const onClickSubmit = async () => {
//     if (!seller) {
//       setSellerError("Please type your email");
//     } else {
//       setSellerError("");
//     }
//     if (!product) {
//       setProductError("Please type your password");
//     } else {
//       setProductError("");
//     }

//     if (!contents) {
//       setContentsError("please fill the blank");
//     } else {
//       setContentsError("");
//     }
//     if (!price) {
//       setPriceError("please fill the blank");
//     } else {
//       setPriceError("");
//     }
//     const results = await Promise.all(
//       //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
//       files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
//     );
//     console.log(results); //[resultFile0,resultFile1,resultFile2]
//     const resultUrls = results.map((el) => el.data?.uploadFile.url); //[url0, url1, url2]
//     const filteredResultUrls = resultUrls.filter(
//       (url) => url !== undefined
//     ) as string[];
//     console.log(filteredResultUrls);
//     if (seller && product && price && contents) {
//       try {
//         const result = await myFunction({
//           variables: {
//             createUseditemInput: {
//               name: seller,
//               remarks: product,
//               contents: contents,
//               price: price,
//               // images: [...fileUrls],
//               // images: resultUrls,
//               images: filteredResultUrls,
//               tags: [...tags],
//               useditemAddress: {
//                 zipcode: zipcode,
//                 address: address,
//                 addressDetail: addressDetail,
//               },
//             },
//           },
//         });
//         alert(result.data?.createUseditem.name);
//         console.log(result.data);

//         void router.push(
//           `/flea_market/products/detail/${result.data?.createUseditem._id}`
//         );
//       } catch (error) {
//         if (error instanceof Error) alert(error.message);
//       }
//     }
//   };
//   const onCompleteAddressSearch = (data: any): void => {
//     setAddress(data?.formatted_address);
//     setZipcode(data?.formatted_address);
//     setIsOpen((prev) => !prev);
//     console.log(data);
//   };

//   const handleOk = () => {
//     setIsOpen((prev) => !prev);
//   };
//   const handleCancel = () => {
//     setIsOpen((prev) => !prev);
//   };
//   const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
//     setAddressDetail(event.target.value);
//   };

//   const onClickAddressSearch = () => {
//     setIsOpen((prev) => !prev);
//   };
//   //

//   // const onClickUpload = (): void => {
//   //   fileRef.current?.click();
//   // };

//   // const [index, setIndex] = useState<number>();
//   // const onChangeFile = async (
//   //   event: ChangeEvent<HTMLInputElement>
//   // ): Promise<void> => {
//   //   const file = event.target.files?.[0];
//   //   const isValid = checkValidationImage(file);
//   //   if (!isValid) return;

//   //   try {
//   //     const result = await uploadFile({ variables: { file } });
//   //     fileUrls.map((el, index: number) =>
//   //       onChangeFileUrls(result.data?.uploadFile.url, index)
//   //     );

//   //     console.log(index);
//   //   } catch (error) {
//   //     if (error instanceof Error) Modal.error({ content: error.message });
//   //   }
//   // };

//   //edit click
//   const onClickUpdate = async (): Promise<void> => {
//     console.log("hihi");
//     const results = await Promise.all(
//       //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
//       files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
//     );
//     console.log(results);
//     const resultUrls = results.map((el) => el?.data?.uploadFile.url); //[url0, url1, url2]
//     const filteredResultUrls = resultUrls.filter(
//       (url) => url !== undefined
//     ) as string[];
//     console.log(filteredResultUrls);
//     const currentFiles = JSON.stringify(fileUrls);
//     const currentFiles2 = JSON.stringify(filteredResultUrls);
//     const defaultFiles = JSON.stringify(props.data?.fetchUseditem.images);

//     //객채 두개가 완전히 똑같다 하더라도, 서로 저장되있는 주소가 다르므로 false가 나옴!!=> JSON.stringify로 문자화해서 비교해야함!!! **
//     const isChangedFiles = currentFiles2 !== defaultFiles; //객체의 값을 비교해야할때는 JSON.stringify로 문자화해서 비교해야함!!! **
//     // const results = await Promise.all(
//     //   //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
//     //   files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
//     // );
//     // console.log(results);
//     // const resultUrls = results.map((el) => el.data?.uploadFile.url); //[url0, url1, url2]
//     // const filteredResultUrls = resultUrls.filter(
//     //   (url) => url !== undefined
//     // ) as string[];
//     // console.log(filteredResultUrls);
//     console.log(currentFiles, isChangedFiles, resultUrls);
//     if (
//       seller === "" &&
//       product === "" &&
//       contents === "" &&
//       !price &&
//       address === "" &&
//       addressDetail === "" &&
//       zipcode === "" &&
//       !isChangedFiles
//     ) {
//       alert("there are no changes");
//       return;
//     }

//     const myvariables: IUpdateUseditemInput = {};
//     if (seller) myvariables.name = seller;
//     if (product) myvariables.remarks = product;
//     if (contents) myvariables.contents = contents;
//     if (price) myvariables.price = price;
//     // if (isChangedFiles) myvariables.images = fileUrls;
//     if (isChangedFiles) myvariables.images = filteredResultUrls;

//     if (zipcode !== "" || address !== "" || addressDetail !== "") {
//       myvariables.useditemAddress = {};
//       if (address) myvariables.useditemAddress.address = address;
//       if (zipcode) myvariables.useditemAddress.zipcode = zipcode;
//       if (addressDetail)
//         myvariables.useditemAddress.addressDetail = addressDetail;
//     }

//     try {
//       if (typeof router.query.productId !== "string") {
//         alert("there is something wrong");
//         return;
//       }
//       const result = await myFunctionEdit({
//         variables: {
//           // updateBoardInput: myvariables,
//           updateUseditemInput: myvariables,
//           useditemId: router.query.productId,
//         },
//       });
//       console.log(result);
//       alert(result.data?.updateUseditem._id);
//       // alert(result.data?.updateBoard.youtubeUrl);
//       // router.push(`/boards/detail/${result.data?.updateUseditem._id}`);
//       router.push(
//         `/flea_market/products/detail/${result.data?.updateUseditem._id}`
//       );
//     } catch (error) {
//       if (error instanceof Error) alert(error.message);
//       // alert(error.message);
//     }
//   };

//   return (
//     <ProductWriteUI
//       isOpen={isOpen}
//       handleOk={handleOk}
//       handleCancel={handleCancel}
//       isEdit={props.isEdit}
//       data={props.data}
//       //   Autocomplete={Autocomplete}
//       onCompleteAddressSearch={onCompleteAddressSearch}
//       onChangeSeller={onChangeSeller}
//       onChangeProduct={onChangeProduct}
//       onChangeContents={onChangeContents}
//       onChangePrice={onChangePrice}
//       onChangeTag={onChangeTag}
//       address={address}
//       zipcode={zipcode}
//       onClickAddressSearch={onClickAddressSearch}
//       fileUrls={fileUrls}
//       onChangeFileUrls={onChangeFileUrls}
//       onClickSubmit={onClickSubmit}
//       onClickUpdate={onClickUpdate}
//       setImageUrls={setImageUrls}
//       setFiles={setFiles}
//       imageUrls={imageUrls}
//       files={files}
//       setFileUrls={setFileUrls}
//       // filteredResult={filteredResult}
//     />
//   );
// }
