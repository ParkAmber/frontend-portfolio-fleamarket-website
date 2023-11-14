import ProductListUI from "./productList.presenter";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { MouseEvent, ChangeEvent } from "react";
import {
  IQuery,
  IQueryFetchBoardsCountArgs,
  IQueryFetchUseditemsArgs,
} from "../../../../src/commons/types/generated/types";
import { FETCH_BOARDS_COUNT, FETCH_USED_ITEMS } from "./productList.queries";
import _ from "lodash";

export default function ProductList() {
  const [isClickedpage, setIsClickedpage] = useState(1);
  const [startPage, setstartPage] = useState(1);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  // const { data } = useQuery(FETCH_BOARD, {
  //   // variables: { boardId: String(router.query.boardId) },
  //   variables: { boardId: "644ed5f7aef9f000281ba96c" },
  // });
  const [search, setSearch] = useState("");
  const { data: dataBoards, refetch } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS);

  if (dataBoards?.fetchUseditems !== undefined) {
    console.log(dataBoards?.fetchUseditems);
  }
  const { data: dataBoardCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);
  //
  //Math.ceil==> 숫자 올림 해줌!!
  //data가 undefined될땐 10으로 해라!!(==>(10/10) 즉, 1로 해라!!), 10 ==>페이지 1개당 개시물 개수는 10개로 되어있으므로!!
  const lastPage = Math.ceil((dataBoardCount?.fetchBoardsCount ?? 10) / 10);

  const onClickPage = (e: MouseEvent<HTMLButtonElement>): void => {
    void refetch({ page: Number(e.currentTarget.id) }); //여기 page는 변수 $page!!
    console.log(e.currentTarget.id);
    // const isClicked = Number(e.currentTarget.id)
    // setIsClicked(isClicked)
    setIsClickedpage(Number(e.currentTarget.id));
  };
  const getDebounce = _.debounce((aaa) => {
    void refetch({ search: aaa, page: 1 });
    void refetchBoardsCount({ search: aaa });
    setKeyword(aaa);
  }, 500);

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setstartPage(startPage - 10);
    setIsClickedpage(startPage - 10);
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setstartPage(startPage + 10);
      setIsClickedpage(startPage + 10);
      void refetch({ page: startPage + 10 });
    }
  };
  //
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // setIsClickedpage(startPage);
    // setstartPage(1);
    setSearch(e.target.value);
    // getDebounce(e.target.value);
    // setSearch(e.currentTarget.value);
    // //void refetchBoardsCount({ search: e.currentTarget.value });
  };

  const onClickSearch = (): void => {
    // void refetch({
    //   search,
    //   page: 1,
    // });
    // void refetch({
    //   search,
    //   page: 1,
    // });
    // void refetchBoardsCount({ search });
    // console.log(search, dataBoardCount);
    getDebounce(search);
  };

  const starPoint = [0, 1, 2, 3, 4];

  const [isClicked, setIsClicked] = useState("forSale");
  const onClickMoveToDetail = (e: MouseEvent<HTMLDivElement>) => {
    router.push(`/flea_market/products/detailComment/${e.currentTarget.id}`);
  };
  return (
    <ProductListUI
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onChangeSearch={onChangeSearch}
      onClickSearch={onClickSearch}
      dataBoards={dataBoards}
      onClickMoveToDetail={onClickMoveToDetail}
      starPoint={starPoint}
      onClickPrevPage={onClickPrevPage}
      startPage={startPage}
      lastPage={lastPage}
      onClickPage={onClickPage}
      isClickedpage={isClickedpage}
      onClickNextPage={onClickNextPage}
      keyword={keyword}
    />
  );
}
