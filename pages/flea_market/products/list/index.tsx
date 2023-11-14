import { useAuth } from "../../../../src/commons/hooks/customs/useAuth";
import { WithAuth } from "../../../../src/component/apollo/hocs/loginCheck";
import ProductList from "../../../../src/component/unit/list/productList.container";

export default function ProductListPage() {
  useAuth();
  return (
    <>
      <ProductList />
    </>
  );
}
