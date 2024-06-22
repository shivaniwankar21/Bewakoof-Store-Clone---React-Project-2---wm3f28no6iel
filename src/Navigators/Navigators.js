import { useNavigate } from "react-router-dom";

// Single product Details Navigator
export const gotoProductDetails = (productId) => {
  const navigate = useNavigate();
  return () => navigate(`/productlist/productdetails/${productId}`);
};

//  Product List Accept Category Navigator
export const gotoProductListAsCategory = (CategoryName) => {
  const navigate = useNavigate();
  return () => navigate(`/productlist?type=${CategoryName}`);
};
