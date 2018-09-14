import { connect } from 'react-redux';
import ProductsDashboard from './ProductsDashboard';
import { productsActions } from 'src/actions'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return {
    products: state.products.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllProducts: bindActionCreators(productsActions.fetchAllProducts, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDashboard);
