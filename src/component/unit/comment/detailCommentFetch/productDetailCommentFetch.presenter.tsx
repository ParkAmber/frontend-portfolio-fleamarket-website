import * as S from "../../../../../styles/BoardMain.styles";
import CommentItem from "../../../../../src/component/unit/comment/commentItem.presenter";
import { IProductDetailCommentFetchUIProps } from "../../detail/producDetail.types";
import { useForm } from "react-hook-form";
// interface IPrev {
//   __ref: string;
// }

export default function DetailCommentFetchUI(
  props: IProductDetailCommentFetchUIProps
) {
  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      {props.isOpen && (
        <S.PasswordModal
          title={
            props.isDelete
              ? "Do you want to delete the question?"
              : "Do you want to update the question?"
          }
          // open={props.isOpen}
          open={props.isOpen}
          onOk={props.isDelete ? props.onClickDelete : props.onClickUpdate}
          onCancel={props.handleCancel}
        >
          {props.isDelete ? (
            <>delete!!</>
          ) : (
            <>
              <>edit!!</>
              <br />
            </>
          )}
        </S.PasswordModal>
      )}
      <div className="detail-comment-fetch mt-60">
        {props.dataFaQ?.fetchUseditemQuestions.map((el: any, i: number) => (
          <div key={el._id} style={{ borderBottom: "2px solid #ebebeb" }}>
            {/* <p>{el._id}</p>
            <p>{el.contents}</p>
            <p>{el.user.name}</p>
            <p>{el.user.createdAt}</p> */}
            {/* <p
                    dangerouslySetInnerHTML={{
                      __html: Dompurify.sanitize(String(el.contents)), //Dompurify.sanitize()=>  xss(cross site script)막아주는 라이브러리
                    }}
                  ></p> */}
            {/* <img
                src="/mode-24px.png"
                style={{ width: "20px", cursor: "pointer" }}
                id={el._id}
                onClick={onClickOpenUpdateImg}
              />
              <img
                src="/clear-24px 2.png"
                style={{ width: "20px", cursor: "pointer" }}
                id={el._id}
                onClick={onClickOpenDeleteModal}
                //   onClick={onClickDelete}
              /> */}
            <CommentItem
              el={el}
              setUseditemQuestionId={props.setUseditemQuestionId}
              setIsDelete={props.setIsDelete}
              setIsOpen={props.setIsOpen}
              contents={props.contents}
              dataFaQ={props.dataFaQ}
              setContents={props.setContents}
              register={register}
              //   onClickOpenDeleteModal={onClickOpenDeleteModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
