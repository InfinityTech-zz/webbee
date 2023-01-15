import { CategoryData } from "../Interface/Category";
import { ProductData } from "../Interface/Product";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_CATEGORY  = 'DELETE_CATEGORY';

const categoryId = new Date().valueOf();


export const addCategory = (categoryData: CategoryData) => ({
  type: ADD_CATEGORY,
  payload: {
    categoryID: categoryId,
    categoryData
  }
});

export const addProduct = (productData: ProductData) => ({
    type: ADD_PRODUCT,
    payload: {
      productData
    }
  });

export const updateProduct = (productData: Array<ProductData>) => ({
    type: UPDATE_PRODUCT,
    payload: {
      productData
    }
  });  

  export const deleteProduct = (productData: Array<ProductData>) => ({
    type: DELETE_PRODUCT,
    payload: {
      productData
    }
  }); 

export const deleteCategory = (categoryID: number) => ({
    type: DELETE_CATEGORY,
    payload: {
      categoryID: categoryId,
    }
});