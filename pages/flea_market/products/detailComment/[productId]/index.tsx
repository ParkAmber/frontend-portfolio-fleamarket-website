import { useAuth } from "../../../../../src/commons/hooks/customs/useAuth";
import { WithAuth } from "../../../../../src/component/apollo/hocs/loginCheck";
import ProductDetail from "../../../../../src/component/unit/comment/detailComment/productDetailComment.container";
export default function DetailPage() {
  useAuth();
  return <ProductDetail />;
}
