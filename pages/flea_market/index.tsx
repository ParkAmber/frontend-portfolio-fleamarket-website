// import "../../styles/style.css";
import * as S from "../../styles/BoardMain.styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { MouseEvent, ChangeEvent } from "react";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../src/commons/types/generated/types";
// import Header from "../../src/commons/layout/header/index";

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String) {
    fetchUseditems(page: $page, search: $search) {
      _id
      name
      remarks
      contents
      tags
      images
      createdAt
      updatedAt
      price
      seller {
        name
      }
      pickedCount
    }
  }
`;
export const BEST_USED_ITEMS = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      contents
      images
      pickedCount
      seller {
        name
      }
      price
    }
  }
`;
export default function FleaMarket() {
  const router = useRouter();
  // const { data } = useQuery(FETCH_BOARD, {
  //   // variables: { boardId: String(router.query.boardId) },
  //   variables: { boardId: "644ed5f7aef9f000281ba96c" },
  // });
  const [search, setSearch] = useState("");
  const { data: dataBoards, refetch } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS, {
    variables: { page: Number(1) },
  });
  if (dataBoards?.fetchUseditems !== undefined) {
    console.log(dataBoards?.fetchUseditems);
  }

  // const onClickPage = (e) => {
  //   //검색에서 refetch할때, search 검색어가 onClickSearch해서 refetch에 이미 저장되어있는 상태이므로 추가로 search 포함하지 않아도 됨!!!!
  //   void refetch({ page: Number(e.currentTarget.id) }); //여기 page는 변수 $page!!
  // };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearch = (): void => {
    void refetch({
      search,
      // page: 2,
    });
  };

  const starPoint = [0, 1, 2, 3, 4];

  const { data: dataBest } = useQuery<
    Pick<IQuery, "fetchUseditemsOfTheBest">,
    IQueryFetchUseditemsArgs
  >(BEST_USED_ITEMS);
  console.log(dataBest?.fetchUseditemsOfTheBest);

  const getDate = (date: string) => {
    // _date => (이렇게 언더바 붙이면 주로 임시라는 뜻!!)
    const _date = new Date(date);
    const yyyy = _date.getFullYear();
    const mm = _date.getMonth() + 1;
    const dd = _date.getDate();
    return `${yyyy}.${mm}.${dd}`;
  };
  const [isClicked, setIsClicked] = useState("forSale");
  return (
    <div className='page-container'>
      {/* <Header /> */}

      <section className='banner mt-120'></section>
      <section className='best-seller'>
        <h2>BEST SELLER</h2>
        <div className='best-seller-item'>
          {/*  */}
          {dataBest?.fetchUseditemsOfTheBest.map((a: any) => (
            <div key={a._id}>
              <img
                className='best-seller-img'
                src={`https://storage.googleapis.com/${a.images[0]}`}
              />
              <p>{a.name}</p>
              <p
                style={{
                  height: "30px",
                  overflow: "hidden",
                }}
                className='text-gray'>
                {a.contents}
              </p>{" "}
              <p className='text-bold'>$ {a.price}</p>
              <div className='thumb-container'>
                <div>
                  <img src='/ic_thumb_up.png' />
                </div>
                <div style={{ paddingLeft: "8px" }}>({a.pickedCount})</div>
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </section>
      <section className='list'>
        <div className='category'>
          <div>
            <button
              style={{
                border:
                  isClicked === "forSale"
                    ? "1px solid #000"
                    : "1px solid #ebebeb",
                color: isClicked === "forSale" ? "#000" : "#7b7b7b",
              }}
              onClick={() => {
                setIsClicked("forSale");
              }}>
              For Sale
            </button>
            <button
              style={{
                border:
                  isClicked === "onSale"
                    ? "1px solid #000"
                    : "1px solid #ebebeb",
                color: isClicked === "onSale" ? "#000" : "#7b7b7b",
              }}
              onClick={() => {
                setIsClicked("onSale");
              }}>
              On Sale
            </button>
          </div>
          <div>
            <input
              type='text'
              placeholder='Search products'
              onChange={onChangeSearch}
              className='search-input'
            />

            <button
              style={{ background: "#000", color: "#fff" }}
              onClick={onClickSearch}>
              Search
            </button>
          </div>
        </div>
        {/*  */}
        <div style={{ display: isClicked === "forSale" ? "block" : "none" }}>
          {dataBoards?.fetchUseditems.map((a: any, i: any) => (
            <div key={a._id}>
              <div className='category-item'>
                {/* <img
                    src={
                      a.images[0] === ""
                        ? `https://storage.googleapis.com/${a[2]?.images[0]}`
                        : `https://storage.googleapis.com/${a.images[0]}`
                    }
                    // src={`https://storage.googleapis.com/${dataBoards?.fetchUseditems[i].images[0]}`}
                    className="category-item-img"
                  /> */}
                {a.images[0] === undefined || null ? (
                  <img src='/banner.jpg' className='category-item-img' />
                ) : (
                  <img
                    src={`https://storage.googleapis.com/${a.images[0]}`}
                    // src={`https://storage.googleapis.com/${dataBoards?.fetchUseditems[i].images[0]}`}
                    className='category-item-img'
                  />
                )}
                <div>
                  <h3>{a.name}</h3>
                  <p>{getDate(a.createdAt)}</p>
                  <p className='text-gray'>{a.contents}</p>
                  <div className='star-wrapper'>
                    <p className='text-gray'>{a.seller?.name}</p>
                    <S.StarWrapperFetch>
                      {starPoint.map((atwo, itwo) => {
                        return (
                          <div key={atwo}>
                            <S.TempStarFetch
                              active={itwo + 1 <= a.pickedCount}
                              // onClick={props.onClickStar}
                              id={String(i + 1)}
                            />{" "}
                          </div>
                        );
                      })}
                      <span className='star-count'>{a.pickedCount} (100)</span>
                    </S.StarWrapperFetch>
                  </div>
                </div>
                <p className='price'>$ {a.price}</p>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
        {/*  */}
        <div style={{ display: isClicked === "onSale" ? "block" : "none" }}>
          {dataBest?.fetchUseditemsOfTheBest.map((a: any, i: any) => (
            <div key={a._id}>
              <div className='category-item'>
                {a.images[0] === undefined ? (
                  <img src='/banner.jpg' className='category-item-img' />
                ) : (
                  <img
                    src={`https://storage.googleapis.com/${a.images[0]}`}
                    // src={`https://storage.googleapis.com/${dataBoards?.fetchUseditems[i].images[0]}`}
                    className='category-item-img'
                  />
                )}

                <div>
                  <h3>{a.name}</h3>
                  <p>{getDate(a.createdAt)}</p>
                  <p className='text-gray'>{a.contents}</p>
                  <div className='star-wrapper'>
                    <p className='text-gray'>{a.seller.name}</p>
                    <S.StarWrapperFetch>
                      {starPoint.map((atwo: number, itwo: number) => {
                        return (
                          <div key={atwo}>
                            <S.TempStarFetch
                              active={itwo + 1 <= a.pickedCount}
                              // onClick={props.onClickStar}
                              id={String(i + 1)}
                            />{" "}
                          </div>
                        );
                      })}
                      <span className='star-count'>{a.pickedCount} (100)</span>
                    </S.StarWrapperFetch>
                  </div>
                </div>
                <p className='price'>$ {a.price}</p>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
        <div className='post-btn-con'>
          <Link href='flea_market/products/new'>
            <button>
              {" "}
              <a>Upload My Product</a>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
