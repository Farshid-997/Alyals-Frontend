import { baseApi } from '../baseApi';

const brand_URL = '/brands';

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allbrands: build.query({
      query: (arg) => ({
        url: `${brand_URL}`,
        method: 'GET',
        params: arg,
      }),
    }),

    // get single brand
    brandId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${brand_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // create a new brand
    addbrand: build.mutation({
      query: (data) => ({
        url: `${brand_URL}/create-brand`,
        method: 'POST',
        data,
      }),
    }),

    // update brand
    updatebrand: build.mutation({
      query: (data) => ({
        url: `${brand_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
    }),

    
    // delete brand
    deletebrand: build.mutation({
      query: (id) => ({
        url: `${brand_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddbrandMutation,
  useBrandIdQuery,
  useUpdatebrandMutation,
  useAllbrandsQuery,
  useDeletebrandMutation
} = brandApi;
