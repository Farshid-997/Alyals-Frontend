import { baseApi } from './baseApi';

const notification_URL = '/notifications';

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNotification: build.mutation({
      query: (data) => ({
        url: `${notification_URL}`,
        method: 'POST',
        data,
      }),
    }),

    addNotificationToAllUser: build.mutation({
      query: (data) => ({
        url: `${notification_URL}/admin`,
        method: 'POST',
        data,
      }),
    }),

    getNotificationByUserId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${notification_URL}/${id}`,
        method: 'GET',
      }),
    }),

   
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `${notification_URL}/${id}`,
        method: 'DELETE',
      }),
    
    }),
  }),
});

export const {
 useAddNotificationMutation,
 useAddNotificationToAllUserMutation,
 useGetNotificationByUserIdQuery,
 useDeleteNotificationMutation
} = notificationApi;
