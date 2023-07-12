import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SELLER_BEGIN,
  GET_SELLER_SUCCESS,
  GET_SELLER_ERROR,
  GET_SEARCH_PRODUCTS_SUCCESS,
  GET_SEARCH_PRODUCTS_ERROR,
  GET_MANUFACTURE_SUCCESS,
  GET_MANUFACTURE_BEGIN,
  GET_MANUFACTURE_ERROR,
} from "../action";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_SELLER_BEGIN) {
    return { ...state, seller_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    const trending_products = action.payload.filter(
      (product) => product.tranding === true
    );
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
      trending_products,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, product_loading: false, produts_error: true };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, produts_error: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }

  if (action.type === GET_SELLER_SUCCESS) {
    return {
      ...state,
      seller_loading: false,
      sellerProducts: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  if (action.type === GET_SEARCH_PRODUCTS_SUCCESS) {
    return { ...state, search_product: action.payload };
  }

  if (action.type === GET_SEARCH_PRODUCTS_ERROR) {
    return { ...state, search_product: [] };
  }

  if (action.type === GET_MANUFACTURE_SUCCESS) {
    return {
      ...state,
      menufacture_product: action.payload,
      manufacturer_loading: false,
    };
  }

  if (action.type === GET_MANUFACTURE_BEGIN) {
    return { ...state, manufacturer_loading: true };
  }

  if (action.type === GET_MANUFACTURE_ERROR) {
    return { ...state, manufacturer_loading: false };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
