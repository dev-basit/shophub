import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  createProduct,
  deleteProduct,
  listProducts,
} from "../store/products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { isSellerMode } from "../utils/functions";

export default function ProductListScreen(props) {
  const [sellerMode, setSellerMode] = useState(isSellerMode(props));
  const { userInfo } = useSelector((state) => state.userSignin);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    const filters = {};
    if (sellerMode) filters["seller"] = userInfo._id;
    dispatch(listProducts(filters));
  }, [createdProduct, dispatch, props.history, sellerMode, successCreate, successDelete, userInfo._id]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>

      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => props.history.push(`/product/${product._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button type="button" className="small" onClick={() => deleteHandler(product)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
