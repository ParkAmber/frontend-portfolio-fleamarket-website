import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";

export interface IProductDetailUIProps {
  data: any;
  onClickListMove: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickEdit: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}
