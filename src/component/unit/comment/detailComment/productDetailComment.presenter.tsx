import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import * as S from "../../../../../styles/BoardMain.styles";
import { wrapFormAsync } from "../../../../../src/component/libraries/asyncFunc";
import DetailCommentFetch from "../detailCommentFetch/productDetailCommentFetch.container";
import { IProductDetailCommentUIProps } from "./producDetailComment.types";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function ProductDetailUI(props: IProductDetailCommentUIProps) {
  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });
  return (
    <>
      {/* <div>Detail page</div> */}
      <div className="page-container">
        <div className="detail-comment-wrapper">
          <section className="detail-comment-section mt-60">
            <div className="detail-comment-img">
              <img
                src={`https://storage.googleapis.com/${props.data?.fetchUseditem.images?.[0]}`}
              />
            </div>
            <div className="detail-comment-sub-imgs">
              <div>
                <img
                  src={`https://storage.googleapis.com/${props.data?.fetchUseditem.images?.[1]}`}
                />
              </div>
              <div>
                <img
                  src={`https://storage.googleapis.com/${props.data?.fetchUseditem.images?.[2]}`}
                />
              </div>
              <div>
                <img />
              </div>
            </div>
          </section>
          <section className="detail-comment-comment mt-60">
            <p>Writer: {props.data?.fetchUseditem.seller?.name ?? ""}</p>
            <h3>Product Name: {props.data?.fetchUseditem.name ?? ""}</h3>
            <S.StarWrapperFetch style={{ padding: "0" }}>
              {props.starPoint.map((atwo, itwo) => {
                return (
                  <div key={atwo}>
                    <S.TempStarFetch
                      active={
                        itwo + 1 <=
                        Number(props.data?.fetchUseditem.pickedCount)
                      }
                      // onClick={props.onClickStar}
                      id={String(itwo + 1)}
                    />{" "}
                  </div>
                );
              })}
              <span className="star-count">
                {props.data?.fetchUseditem.pickedCount} (100)
              </span>
            </S.StarWrapperFetch>
            <p className="price">
              <span>$</span> {props.data?.fetchUseditem.price ?? ""}
            </p>
            <hr />
            <p>
              {" "}
              <span className="location" style={{ color: "#7b7b7b" }}>
                {" "}
                Location
              </span>{" "}
              {props.data?.fetchUseditem.useditemAddress?.address ?? ""}
            </p>
            <p className="mt-60">
              product summary: {props.data?.fetchUseditem.contents}
            </p>
            <p className="mt-40 tags">
              #tags #{props.data?.fetchUseditem.tags?.[0]}
            </p>
            <div>
              <button
                className="list-btn detail-comment-list-btn mt-60"
                onClick={props.onClickListMove}
              >
                List
              </button>
            </div>
            {/* <p>Tpronto {data?.fetchUseditem.useditemAddress?.address ?? ""}</p> */}
          </section>
        </div>
        <section className="detail-comment-faq mt-60 mb-120">
          <div>
            <h2>FAQ</h2>
            <form
              onSubmit={wrapFormAsync(handleSubmit(props.onClickCommentSubmit))}
            >
              {/* <ReactQuill
                onChange={onChangeContents}
                style={{ height: "200px" }}
              /> */}
              <S.ContentsArea
                maxLength={100}
                onChange={props.onChangeContents}
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
                  Submit
                </button>
              </div>
            </form>
            <DetailCommentFetch />
          </div>
        </section>
      </div>

    </>
  );
}
