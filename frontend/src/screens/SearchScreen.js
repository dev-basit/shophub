import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";
import Product from "../components/Product";
import { listProducts } from "../store/products";
import { getQueryParams } from "../utils/functions";

export default function SearchScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
  const dispatch = useDispatch();

  useEffect(() => {
    const productFilters = getQueryParams(window.location.search.substring(1));
    dispatch(listProducts(productFilters));
  }, [dispatch, name]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>

      <div className="row top">
        <div className="col-1">
          {/* <h3>Department</h3> */}
          {loadingCategories ? (
            <LoadingBox />
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <ul>
              {categories.map((item) => (
                <li key={item._id}>
                  <Link className={item === category ? "active" : ""} to={`/search?category=${item.name}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
