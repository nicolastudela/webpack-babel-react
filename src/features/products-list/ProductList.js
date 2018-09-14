import React from "react";
import PropTypes from 'prop-types';

const Product = (product) => {
  return (
    <tr key={product.id}>
      <td>
        {product.name}
      </td>
      <td>
        {product.category}
      </td>
      <td>
        {product.price}
      </td>
      <td>
        {product.brand}
      </td>
    </tr>
  );
}

const ProductList = ({ products }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Category
          </th>
          <th>
            Price
          </th>
          <th>
            Brand
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map(Product)}
      </tbody>
    </table>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
