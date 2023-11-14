import DetailCommentFetchUI from "./productDetailCommentFetch.presenter";
import { gql, useMutation, useQuery } from "@apollo/client";

import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../../src/commons/types/generated/types";
interface IPrev {
  __ref: string;
}
export const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!) {
    fetchUseditemQuestions(useditemId: $useditemId) {
      _id
      contents
      user {
        name
        createdAt
      }
      createdAt
    }
  }
`;
export const DELETE_USED_ITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;
export const UPDATE_USED_ITEM_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
    }
  }
`;
export default function DetailCommentFetch() {
  const [useditemQuestionId, setUseditemQuestionId] = useState("");
  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  //   const [isUpdate, setIsUpdate] = useState(false);
  // contents
  const [contents, setContents] = useState("");

  const router = useRouter();
  const { data: dataFaQ } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.productId) },
  });

  const [deleteComment] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const [updateComment] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const onClickDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      void deleteComment({
        variables: {
          useditemQuestionId: useditemQuestionId,
        },
        // 삭제 후 refetchQueries 다시 안 해주면, db에 저장된 데이터는 삭제가 됬지만, 화면엔 바로 반영이 안됨(=> 새로고침해야만 반영됨)
        //==> refetchQueries해줌!!
        // refetchQueries: [
        //   {
        //     query: FETCH_USED_ITEM_QUESTIONS,
        //     variables: { useditemId: String(router.query.productId) },
        //   },
        // ],
        //** refetch말고 cache직접 수정하는 법!! */
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchUseditemQuestions: (prev, { readField }) => {
                console.log(prev);
                const deletedId = data?.deleteUseditemQuestion; //삭제 완료된 ID
                console.log(deletedId);
                //삭제된 거 빼고 나머지 추리기
                const filterdPrev = prev.filter(
                  (a: any) => readField("_id", a) !== deletedId //readField("_id", a)==> _id라고 되어있는거 뽑아서 a라고 해줘!==>a._id가 됨!!
                );
                console.log(filterdPrev);
                return [...filterdPrev]; //삭제된ID를 제외한 나머지 9개만 리턴하기
              },
            },
          });
        },
      });
      setIsOpen(false);
      setIsDelete(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  console.log("hihi", dataFaQ?.fetchUseditemQuestions);
  const handleCancel = (): void => {
    setIsOpen(false);
  };
  //   const onClickOpenDeleteModal = (e: MouseEvent<HTMLImageElement>) => {
  //     setUseditemQuestionId(e.currentTarget.id);
  //     setIsOpen(true);
  //     setIsDelete(true);
  //   };

  // Edit Comment
  //   const onClickOpenUpdateImg = (e: MouseEvent<HTMLImageElement>) => {
  //     setUseditemQuestionId(e.currentTarget.id);
  //     // setIsOpen(true);
  //     setIsUpdate(true);
  //     setIsDelete(false);
  //   };
  //   const onClickOpenUpdateModal = () => {
  //     // setUseditemQuestionId(e.currentTarget.id);
  //     setIsOpen(true);
  //     // setIsDelete(true);
  //   };
  const onClickUpdate = async (): Promise<void> => {
    if (contents === "") {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      await updateComment({
        variables: {
          updateUseditemQuestionInput: {
            contents: contents,
          },
          useditemQuestionId: useditemQuestionId,
        },
        // 삭제 후 refetchQueries 다시 안 해주면, db에 저장된 데이터는 삭제가 됬지만, 화면엔 바로 반영이 안됨(=> 새로고침해야만 반영됨)
        //==> refetchQueries해줌!!
        // refetchQueries: [
        //   {
        //     query: FETCH_USED_ITEM_QUESTIONS,
        //     variables: { useditemId: String(router.query.productId) },
        //   },
        // ],

        //** cache직접 수정하는 법!! */
        update(cache, { data }) {
          //response에서 data먼 뽑아오기!
          cache.modify({
            fields: {
              // data.createBoard //{writer:"Amber",...}
              fetchUseditemQuestions: (prev) => {
                console.log(prev);
                return [data?.updateUseditemQuestion, ...prev]; //최신거 먼저 오게!!, prev=> 기존 것
              },
            },
          });
        },
      });
      setIsOpen(false);
      //   setIsUpdate(false);
      setContents("");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <DetailCommentFetchUI
      isOpen={isOpen}
      isDelete={isDelete}
      onClickDelete={onClickDelete}
      onClickUpdate={onClickUpdate}
      handleCancel={handleCancel}
      dataFaQ={dataFaQ}
      setUseditemQuestionId={setUseditemQuestionId}
      setIsDelete={setIsDelete}
      setIsOpen={setIsOpen}
      contents={contents}
      setContents={setContents}
    />
  );
}
