import { ChangeEvent, MouseEvent, useState } from "react";
import * as S from "../../../../styles/BoardMain.styles";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../libraries/asyncFunc";
import { getDate } from "../../libraries/utils";

export default function CommentItem(props: any) {
  const [isUpdate, setIsUpdate] = useState(false);
  const onClickOpenUpdateImg = (e: MouseEvent<HTMLImageElement>) => {
    props.setUseditemQuestionId(e.currentTarget.id);
    // setIsOpen(true);
    setIsUpdate(true);
    props.setIsDelete(false);
  };
  const onClickOpenUpdateModal = () => {
    // setUseditemQuestionId(e.currentTarget.id);
    props.setIsOpen(true);
    setIsUpdate(false);
    // setIsDelete(true);
  };
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    props.setContents(event.target.value);
  };
  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onClickOpenDeleteModal = (e: MouseEvent<HTMLImageElement>) => {
    props.setUseditemQuestionId(e.currentTarget.id);
    props.setIsOpen(true);
    props.setIsDelete(true);
  };
  return (
    <div style={{ marginTop: "20px" }}>
      {!isUpdate ? (
        <div className="detail-comment-fetch-wrapper">
          <div className="profile-img">
            <img src="/ic_profile-48px.png" />{" "}
          </div>
          <div className="comment-detail">
            <div>
              <h3 style={{ fontSize: "20px" }}>{props.el.user.name}</h3>
              {/* <p>{props.el._id}</p> */}
              <p style={{ margin: "0", padding: "0" }}>{props.el.contents}</p>

              <p
                style={{
                  color: "#7b7b7b",
                  fontSize: "12px",
                  marginTop: "10px",
                  padding: "0",
                }}
              >
                {getDate(props.el.user.createdAt)}
              </p>
            </div>
            <div className="icons">
              <img
                src="/clear-24px 2.png"
                style={{ width: "20px", cursor: "pointer" }}
                id={props.el._id}
                onClick={onClickOpenDeleteModal}
                //   onClick={onClickDelete}
              />
              <img
                src="/mode-24px.png"
                style={{ width: "20px", cursor: "pointer" }}
                id={props.el._id}
                onClick={onClickOpenUpdateImg}
              />{" "}
            </div>
            {/* contents: <input type="text" onChange={onChangeContents} />
          <button onClick={onClickOpenUpdateModal}>submit</button> */}
          </div>
        </div>
      ) : (
        <div>
          {/* <input type="text" /> */}
          <form onSubmit={wrapFormAsync(handleSubmit(onClickOpenUpdateModal))}>
            <S.ContentsArea
              maxLength={100}
              onChange={onChangeContents}
              placeholder="Sharing or requesting personal information, defamation, unauthorized advertising, and the dissemination of illegal information may lead to monitoring and subsequent removal. The publisher is responsible for any legal and criminal liabilities arising from such actions."
              value={props.contents !== "" ? props.contents : ""}
            />
            <div>
              {props.contents !== "" ? props.contents.length : 0}
              /100
            </div>
            <div className="comment-write-btn-con">
              <button
                style={{ position: "relative", zIndex: "100" }}
                className="comment-write-btn"
              >
                Edit
              </button>
            </div>
          </form>
        </div>

        // <div className="detail-comment-fetch mt-60">
        //   {props.dataFaQ?.fetchUseditemQuestions.map((el: any, i: number) => (
        //     <div key={el._id} style={{ border: "2px solid red" }}>
        //       <p>{el._id}</p>
        //       <p>{el.contents}</p>
        //       <p>{el.user.name}</p>
        //       <p>{el.user.createdAt}</p>
        //       {/* <p
        //             dangerouslySetInnerHTML={{
        //               __html: Dompurify.sanitize(String(el.contents)), //Dompurify.sanitize()=>  xss(cross site script)막아주는 라이브러리
        //             }}
        //           ></p> */}
        //       <img
        //         src="/mode-24px.png"
        //         style={{ width: "20px", cursor: "pointer" }}
        //         id={el._id}
        //         onClick={onClickOpenUpdateImg}
        //       />
        //       <img
        //         src="/clear-24px 2.png"
        //         style={{ width: "20px", cursor: "pointer" }}
        //         id={el._id}
        //         onClick={props.onClickOpenDeleteModal}
        //         //   onClick={onClickDelete}
        //       />
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
}
