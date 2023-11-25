import { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
export interface IProductWriteUIProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onCompleteAddressSearch: (data: any) => void;
  onChangeSeller: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeProduct: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTag: (e: ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
  data: any;
  // isActive: boolean;
  address: string;
  zipcode: string;
  onClickAddressSearch: () => void;
  fileUrls: string[];
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  onClickSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (e: MouseEvent<HTMLButtonElement>) => void;


