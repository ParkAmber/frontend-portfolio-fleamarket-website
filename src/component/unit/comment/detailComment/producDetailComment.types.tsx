import {
  MouseEvent,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  FormEvent,
} from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

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
