import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";

export interface IProductDetailCommentFetchUIProps {
  isOpen: boolean;
  isDelete: boolean;
  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (e: MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  dataFaQ: any;
  setUseditemQuestionId: Dispatch<SetStateAction<string>>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}
