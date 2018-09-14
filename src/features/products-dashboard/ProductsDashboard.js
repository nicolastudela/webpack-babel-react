import React from "react";
import ProductList from "../products-list/ProductList"
import PropTypes from 'prop-types'

class ProductsDashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    props.fetchAllProducts();
  }

  render() {
    return (<div>
      <ProductList products={this.props.products} />
    </div>);
  };
};

ProductsDashboard.propTypes = {
  products: PropTypes.array.isRequired,
  fetchAllProducts: PropTypes.func.isRequired,
};

export default ProductsDashboard;
