import { WithAuth } from "../../../../src/component/apollo/hocs/loginCheck";
import ProductWrite from "../../../../src/component/unit/new/productWriter.container";
import { useAuth } from "../../../../src/commons/hooks/customs/useAuth";
export default function ProductNewPage() {
	useAuth();
	return <ProductWrite isEdit={false} />;
}
