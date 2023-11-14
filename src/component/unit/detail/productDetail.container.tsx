import ProductDetailUI from "./productDetail.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteUseditemArgs,
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types";
import { DELETE_USED_ITEM, FETCH_USED_ITEM } from "./productDetail.queries";
import { useAuth } from "../../../commons/hooks/customs/useAuth";

export default function ProductDetail() {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    // variables: { useditemId: "64fa40855d6eaa0029f7a5ca" },
    variables: { useditemId: String(router.query.productId) },
  });

  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  console.log("hihi", data?.fetchUseditem);
  const onClickDelete = () => {
    try {
      deleteUseditem({
        //   variables: {
        //     number: Number(e.target.id),
        //   },
        variables: {
          useditemId: String(router.query.productId),
        },
        // 삭제 후 refetchQueries 다시 안 해주면, db에 저장된 데이터는 삭제가 됬지만, 화면엔 바로 반영이 안됨(=> 새로고침해야만 반영됨)
        //==> refetchQueries해줌!!
        // refetchQueries: [{ query: FETCH_BOARDS }],
      });
      // console.log(data);
      alert("deleted successfully!");
      router.push(`/flea_market`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      // alert(error.message);
    }
  };
  const onClickEdit = () => {
    router.push(
      `/flea_market/products/detail/${String(router.query.productId)}/edit`
    );
    alert(router.query.productId);
  };
  const onClickListMove = () => {
    router.push("/flea_market/products/list");
  };
  useAuth();
  return (
    <ProductDetailUI
      data={data}
      onClickListMove={onClickListMove}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
    />
  );
}
