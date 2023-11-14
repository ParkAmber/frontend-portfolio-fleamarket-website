import { gql, useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IMutationDeleteUseditemArgs,
  IQuery,
  IQueryFetchUseditemArgs,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../../src/commons/types/generated/types";
import { ChangeEvent, useState } from "react";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});
import ProductDetailUI from "./productDetailComment.presenter";
import {
  CREATE_USED_ITEM_QUESTIONS,
  FETCH_USED_ITEM,
} from "./productDetailComment.queries";

export default function ProductDetail() {
  const [contents, setContents] = useState("");
  const starPoint = [0, 1, 2, 3, 4];
  const router = useRouter();
  const [createQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTIONS);
  const [inputs, setInputs] = useState({
    contents: "",
  });

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    // variables: { useditemId: "64fa40855d6eaa0029f7a5ca" },
    variables: { useditemId: String(router.query.productId) },
  });

  console.log("hihi", data?.fetchUseditem);

  // const { data: dataFaQ } = useQuery<
  //   Pick<IQuery, "fetchUseditemQuestions">,
  //   IQueryFetchUseditemQuestionsArgs
  // >(FETCH_USED_ITEM_QUESTIONS, {
  //   variables: { useditemId: String(router.query.productId) },
  // });
  // console.log("hihi", dataFaQ?.fetchUseditemQuestions);

  const onClickListMove = () => {
    router.push("/flea_market/products/list");
  };
  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });

  // const onChangeContents = (value: string): void => {
  //   // //react-quill만든 사람들이 만든 onChangeh로 event는 쓸수 없음!!
  //   // console.log("나는 에디터임!!", value);
  //   // setValue("contents", value === "<p><br></p>" ? "" : value); //react-quill에서 react-hook-form사용하는 법!!(react-hook-form에서 {...register("writer")}와 같은 기능!)
  //   // trigger("contents"); //react-quill에서 react-hook-form사용해 애러 검증하는법!!=>onChange됐으니까 에러 검증 해달라고 react-hook-form에 알려주는 기능!!(react-hook-form에서 mode: onChange와 같은 기능!)

  // };
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  const onClickCommentSubmit = async (data: any) => {
    console.log(data.contents);

    try {
      if (!contents) {
        alert("no contents");
        return;
      }
      const result = await createQuestion({
        variables: {
          createUseditemQuestionInput: {
            // contents: data.contents,
            contents,
          },
          useditemId: String(router.query.productId),
        },
        // refetchQueries: [
        //   {
        //     query: FETCH_BOARD_COMMENTS,
        //     variables: { boardId: router.query.boardId },
        //   },
        // ],
        //** cache직접 수정하는 법!! */
        update(cache, { data }) {
          //response에서 data먼 뽑아오기!
          cache.modify({
            fields: {
              // data.createBoard //{writer:"Amber",...}
              fetchUseditemQuestions: (prev) => {
                return [data?.createUseditemQuestion, ...prev]; //최신거 먼저 오게!!, prev=> 기존 것
              },
            },
          });
        },
      });

      const { Modal } = await import("antd"); //code-splitting(성능 높여주는 방법중 하나!!)
      Modal.success({ content: "Success!!" });

      const boardId = result.data;
      console.log(boardId);
      setContents("");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    setContents("");
  };
  return (
    <ProductDetailUI
      data={data}
      starPoint={starPoint}
      onClickListMove={onClickListMove}
      onClickCommentSubmit={onClickCommentSubmit}
      onChangeContents={onChangeContents}
      contents={contents}
    />
  );
}
