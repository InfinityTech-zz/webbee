import { ADD_CATEGORY , ADD_PRODUCT, DELETE_CATEGORY, DELETE_PRODUCT, UPDATE_PRODUCT} from './action';
import { CategoryData } from '../Interface/Category';
import { TotalState } from '../Interface/totalState';

const initialState: TotalState = {
    categories: [],
    products: []
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const { categoryID, categoryData } = action.payload;
      const { categoryName, categoryFields } = categoryData;
      if(categoryData.castegoryID){
        const { categoryID } = categoryData
        return {
            ...state,
            categories: [ ...state.categories, { categoryID, categoryName, categoryFields }]
        };
      } else {
        return {
            ...state,
            categories: [ ...state.categories, { categoryID, categoryName, categoryFields }]
          };
      }
    }
    case ADD_PRODUCT: {
        const { productData } = action.payload;
        const { productName, productDetails, categoryID } = productData;
        const productID = new Date().valueOf()
        return {
            ...state,
            products: [ ...state.products, { productID, productName, productDetails, categoryID }]
        };
      }
    case UPDATE_PRODUCT: {
        const { productData } = action.payload;
        return {
            ...state,
            products: productData
        };
      }  
    case DELETE_PRODUCT: {
        const { productData } = action.payload;
        return {
            ...state,
            products: productData
        };
      }
    case DELETE_CATEGORY: {
        const { categoryID } = action.payload;
        let foundCategories = [...state.categories];
        foundCategories = foundCategories.filter(item => item.categoryID !== categoryID);
        return {
          ...state,
          categories: foundCategories
        };
    }
    default:
      return state;
  }
}

export default inventoryReducer;