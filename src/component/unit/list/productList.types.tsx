import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";
export interface IProductListUIProps {
  isClicked: string;
  setIsClicked: Dispatch<SetStateAction<string>>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => void;
  dataBoards: any;
  onClickMoveToDetail: (e: MouseEvent<HTMLDivElement>) => void;
  starPoint: number[];
  onClickPrevPage: () => void;
  startPage: number;
  lastPage: number;
  onClickPage: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickNextPage: () => void;
  isClickedpage: number;
  keyword: string;
}
