import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../../../src/commons/types/generated/types";
import ProductWrite from "../../../../../../src/component/unit/new/productWriter.container";
export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      contents
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
export default function BoardEditPage() {
  const router = useRouter();
  console.log(router);
  if (!router || typeof router.query.productId !== "string") return;
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    // variables: { useditemId: "64fa40855d6eaa0029f7a5ca" },
    variables: { useditemId: String(router.query.productId) },
  });
  return (
    <>
      <ProductWrite isEdit={true} data={data} />
    </>
  );
}
