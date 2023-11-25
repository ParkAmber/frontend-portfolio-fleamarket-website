import Link from "next/link";
import * as S from "../../../../styles/BoardMain.styles";

import { getDate } from "../../libraries/utils";
import { IProductListUIProps } from "./productList.types";
import { v4 as uuidv4 } from "uuid";

export default function ProductListUI(props: IProductListUIProps) {
  return (
    <div className="page-container">
      <section className="list">
        <div className="category">
          <div>
            <button
              style={{
                border:
                  props.isClicked === "forSale"
                    ? "1px solid #000"
                    : "1px solid #ebebeb",
                color: props.isClicked === "forSale" ? "#000" : "#7b7b7b",
              }}
              onClick={() => {
                props.setIsClicked("forSale");
              }}
            >
              For Sale
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search products"
              onChange={props.onChangeSearch}
              className="search-input"
            />

            <button
              style={{ background: "#000", color: "#fff" }}
              onClick={props.onClickSearch}
            >
              Search
            </button>
          </div>
        </div>
        {/*  */}
        {/* <div style={{ display: isClicked === "forSale" ? "block" : "none" }}> */}
        {props.dataBoards?.fetchUseditems.map((a: any, i: any) => (
          <div
            key={a._id}
            id={String(a._id)}
            onClick={props.onClickMoveToDetail}
            style={{ cursor: "pointer" }}
          >
            <div className="category-item">
       
              {a.images[0] === undefined || null ? (
                <img src="/banner.jpg" className="category-item-img" />
              ) : (
                <img
                  src={`https://storage.googleapis.com/${a.images[0]}`}
                  // src={`https://storage.googleapis.com/${dataBoards?.fetchUseditems[i].images[0]}`}
                  className="category-item-img"
                />
              )}
              <div>
                <h3>
                  {/* @#$$==>벡틱${keyword}앞에 똑같은 문자($)연달아 쓰면 작동안됨!!==> 인식을 잘 못하는듯.. */}
                  {a.name
                    .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
                    .split("@#$%")
                    .map((a: any) => (
                      <span
                        key={uuidv4()}
                        style={{ color: a === props.keyword ? "red" : "black" }}
                      >
                        {a}
                      </span>
                    ))}
                </h3>
                <h3>{a.name}</h3>
                <p>{getDate(a.createdAt)}</p>
                <p className="text-gray">{a.contents}</p>
                <div className="star-wrapper">
                  <p className="text-gray">{a.seller.name}</p>
                  <S.StarWrapperFetch>
                    {props.starPoint.map((atwo, itwo) => {
                      return (
                        <div key={uuidv4()}>
                          <S.TempStarFetch
                            active={itwo + 1 <= a.pickedCount}
                            // onClick={props.onClickStar}
                            id={String(i + 1)}
                          />{" "}
                        </div>
                      );
                    })}
                    <span className="star-count">{a.pickedCount} (100)</span>
                  </S.StarWrapperFetch>
                </div>
              </div>
              <p className="price">$ {a.price}</p>
            </div>
          </div>
        ))}
       
      </section>
      <S.ButtonCon>
        <span
          onClick={props.onClickPrevPage}
          style={{
            textAlign: "center",
            cursor: "pointer",
            fontSize: "24px",
            marginRight: "10px",
          }}
        >
          {"<"}
        </span>
        {new Array(10).fill(1).map((_, i) =>
          i + props.startPage <= props.lastPage ? (
            <S.Button2
              key={i + props.startPage}
              id={String(i + props.startPage)}
              onClick={props.onClickPage}
              isClickedpage={i + props.startPage === props.isClickedpage}
            >
              {/* {a} */}
              {i + props.startPage}
            </S.Button2>
          ) : (
            <S.Button2 key={i + props.startPage}></S.Button2>
          )
        )}
        <span
          onClick={props.onClickNextPage}
          style={{
            textAlign: "center",
            cursor: "pointer",
            fontSize: "24px",
            marginLeft: "10px",
          }}
        >
          {">"}
        </span>
      </S.ButtonCon>
    </div>
  );
}
