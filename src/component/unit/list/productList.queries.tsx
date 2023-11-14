import { gql } from "@apollo/client";

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
