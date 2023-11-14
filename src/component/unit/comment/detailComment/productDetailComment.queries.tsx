import { gql } from "@apollo/client";
export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      contents
      pickedCount
      price
      tags
      images
      useditemAddress {
        zipcode
        address
        addressDetail
      }
      seller {
        _id
        name
      }
    }
  }
`;
// export const FETCH_USED_ITEM_QUESTIONS = gql`
//   query fetchUseditemQuestions($useditemId: ID!) {
//     fetchUseditemQuestions(useditemId: $useditemId) {
//       _id
//       contents
//       user {
//         name
//         createdAt
//       }
//       createdAt
//     }
//   }
// `;
export const CREATE_USED_ITEM_QUESTIONS = gql`
  mutation createUseditemQuestion(
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
    $useditemId: ID!
  ) {
    createUseditemQuestion(
      createUseditemQuestionInput: $createUseditemQuestionInput
      useditemId: $useditemId
    ) {
      _id
      contents
      useditem {
        _id
        seller {
          name
        }
      }
      createdAt
    }
  }
`;
