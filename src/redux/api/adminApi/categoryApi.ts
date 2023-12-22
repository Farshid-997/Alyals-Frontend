import { baseApi } from '../baseApi';

const category_URL = '/categories';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allcategorys: build.query({
      query: (arg) => ({
        url: `${category_URL}`,
        method: 'GET', 
        params: arg,
      }),
      
    }),

    // get single category
    categoryId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${category_URL}/${id}`,
        method: 'GET',
      }),
     
    }),
    
    // create a new category
    addcategory: build.mutation({
      query: (data) => ({
        url: `${category_URL}/create-category`,
        method: 'POST',
        data,
      }),
     
    }),
    // update category
    updatecategory: build.mutation({
      query: (data) => ({
        url: `${category_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
     
    }),
    // delete category
    deletecategory: build.mutation({
      query: (id) => ({
        url: `${category_URL}/${id}`,
        method: 'DELETE',
      }),
     
    }),
  }),
});

export const {
  useAllcategorysQuery,
  useCategoryIdQuery,
  useAddcategoryMutation,
  useUpdatecategoryMutation,
  useDeletecategoryMutation,
} = categoryApi;
