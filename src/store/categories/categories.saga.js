import { takeLatest,call,all,put } from "redux-saga/effects";
import { fetchCategoriesSuccess,fetchCategoriesFailed } from "./categories.action";
import { getCollectionAndDocuments } from "../../utils/firebase.utlis";
import CATEGORIES_ACTION_TYPES from './categories.types'


export function* fetchCategoriesAsync() {
    try {
      const categoriesArray = yield call(getCollectionAndDocuments, 'categories');
      yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      yield put(fetchCategoriesFailed(error));
    }
  }
  
  export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
      fetchCategoriesAsync
    );
  }
  
  export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
  }


// This code here to take the reference :-

// export const fetchCategoriesFailed = (error) =>
//   createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCollectionAndDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };