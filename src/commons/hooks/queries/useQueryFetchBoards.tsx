import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsCountArgs,
  IQueryFetchUseditemsArgs,
} from "../../types/generated/types";

//import { FETCH_BOARDS } from "../../../../units/board/list/BoardList.queries";

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
// 게시물 갯수 query!!
export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;
export const useQueryFetchUsedItems = () => {
  const query = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS);

  return query;
};

export const useQueryFetchCounts = () => {
  const queryCounts = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  return queryCounts;
};

// export const useQueryFetchBoards = () => {
//   const result = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
//     FETCH_BOARDS
//   );

//   return result;
// };
