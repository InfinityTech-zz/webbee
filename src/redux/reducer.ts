import { ADD_CATEGORY , DELETE_CATEGORY} from './action';
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