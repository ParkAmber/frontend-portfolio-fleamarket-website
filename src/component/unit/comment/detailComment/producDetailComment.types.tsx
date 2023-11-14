import {
  MouseEvent,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  FormEvent,
} from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
// export interface IProductListUIProps {
//   isClicked: string;
//   setIsClicked: Dispatch<SetStateAction<string>>;
//   onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
//   onClickSearch: () => void;
//   dataBoards: any;
//   onClickMoveToDetail: (e: MouseEvent<HTMLDivElement>) => void;
//   starPoint: number[];
//   onClickPrevPage: () => void;
//   startPage: number;
//   lastPage: number;
//   onClickPage: (e: MouseEvent<HTMLButtonElement>) => void;
//   onClickNextPage: () => void;
//   isClickedpage: number;
//   keyword: string;
// }
type Formdata = {
  contents: string;
};
export interface IProductDetailCommentUIProps {
  data: any;
  starPoint: number[];
  onClickListMove: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickCommentSubmit: SubmitHandler<FieldValues>;
  contents: string;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
