import { IProductDetailUIProps } from "../comment/detailCommentFetch/producDetailCommentFetch.types";

// import { IProductDetailUIProps } from "./producDetail.types";
export default function ProductDetailUI(props: IProductDetailUIProps) {
  return (
    <>
      {/* <div>Detail page</div> */}
      <div className="page-container">
        <section className="detail-header-section mt-60">
          <p>Writer: {props.data?.fetchUseditem.seller?.name ?? ""}</p>
          <h3>Product Name: {props.data?.fetchUseditem.name ?? ""}</h3>
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
          {/* <p>Tpronto {data?.fetchUseditem.useditemAddress?.address ?? ""}</p> */}
        </section>
        <section className="detail-image-section mt-60">
          <div className="detail-img">
            <img
              src={`https://storage.googleapis.com/${props.data?.fetchUseditem.images?.[0]}`}
            />
          </div>
          <div className="detail-sub-imgs">
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
          <p className="mt-60">
            product summary: {props.data?.fetchUseditem.contents}
          </p>
          <p className="mt-40 tags">
            #tags #{props.data?.fetchUseditem.tags?.[0]}
          </p>
        </section>
        <section className="moving-btns mt-120 mb-120">
          <div>
            <button className="list-btn" onClick={props.onClickListMove}>
              List
            </button>
          </div>
          <div>
            <button className="edit-btn" onClick={props.onClickEdit}>
              Edit
            </button>
          </div>
          <div>
            <button className="delete-btn" onClick={props.onClickDelete}>
              Delete
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
