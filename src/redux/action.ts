import { CategoryData } from "../Interface/Category";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY  = 'DELETE_CATEGORY';

const categoryId = new Date().valueOf()

export const addCategory = (categoryData: CategoryData) => ({
  type: ADD_CATEGORY,
  payload: {
    categoryID: categoryId,
    categoryData
  }
});

export const deleteCategory = (categoryID: number) => ({
    type: DELETE_CATEGORY,
    payload: {
      categoryID: categoryId,
    }
  });