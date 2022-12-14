import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';
import { BookingModel } from '../models/bookingModel';
import { UserModel } from '../models/userModel';
import dotenv from 'dotenv';


export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000',
    prepareHeaders:  (headers, { getState }) => {
      const token = ( getState() as RootState).userState.token
      console.log('states: ', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}` );
      }
        return headers;
      
  }
  }),
  
tagTypes: ['Users','Bookings'],
  endpoints: (builder) => ({
     getUsers: builder.query<UserModel[], void>({
      query: ()  => '/users',
        providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Users' as const, id })),
                { type: 'Users', id: 'USER' },
              ] : [{ type: 'Users', id: 'USER' }],
    }),
  
    getUser: builder.query<UserModel, any>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id: any) =>  [{ type:'Users', id }],  
    }),
     signinUser: builder.mutation<UserModel, Partial<UserModel>>({
      query(body) {
        return {
        url: '/users/signin',
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),
     googleSignIn: builder.mutation<UserModel, Partial<UserModel>>({
      query(body) {
        return {
        url: '/users/googleSignIn',
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),
     signupUser: builder.mutation<UserModel, Partial<UserModel>>({
      query: (body) => {
        return {
        url: '/users/signup', 
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),

     updateUser: builder.mutation<UserModel, Partial<UserModel>>({
      query(data) {
        const { id, ...body} = data;
        return {
        url: `/users/${id}`,
        method: 'PATCH',
        body,  
        }
       },
       transformResponse: (response: { data: UserModel }, meta, arg) => response.data,
      
       invalidatesTags:  (result, error, {id}) => [{ type: 'Users', id: 'USER'  }],
     }),
     
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
          // credentials: 'include'
        }
      },
     invalidatesTags: (result, error, id) => [{ type: 'Users', id: 'USER' }],
       }),

       getBookings: builder.query<BookingModel[], void>({
        query: ()  => '/bookings',
          providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Bookings' as const, id })),
                  { type: 'Bookings', id: 'BOOK' },
                ] : [{ type: 'Bookings', id: 'BOOK' }],
      }),
    
      getBooking: builder.query<BookingModel, any>({
        query: (id) => `/bookings/${id}`,
        providesTags: (result, error, id: any) =>  [{ type:'Bookings', id }],  
      }),
      getBookingsByUser: builder.query<BookingModel, any>({
        query: (userId) => `/bookings/userBookings/${userId}`,
        providesTags: (result, error, id: any) =>  [{ type:'Bookings', id: 'BOOK' }],  
      }),
      addBooking: builder.mutation<BookingModel, Partial<BookingModel>>({
        query(body) {
          return {
          url: '/bookings',
          method: 'POST',
          body,            
        }
         },
          invalidatesTags: [{type: 'Bookings', id: 'BOOK'}],
       }),
      updateBooking: builder.mutation<BookingModel, Partial<BookingModel>>({
        query(data) {
          const { id, ...body} = data;
          return {
          url: `/bookings/${id}`,
          method: 'PATCH',
          body,  
          }
         },
         transformResponse: (response: { data: BookingModel }, meta, arg) => response.data,
        
         invalidatesTags:  (result, error, {id}) => [{ type: 'Bookings', id: 'BOOK'  }],
       }),

       deleteBooking: builder.mutation<{ success: boolean; id: number | string }, number | string>({
        query(id) {
          return {
            url: `bookings/${id}`,
            method: 'DELETE',
          }
        },
       invalidatesTags: (result, error, id) => [{ type: 'Bookings', id: 'BOOK' }],
         }),
        }),
})

export const { 
    useGetUsersQuery,
    useGetUserQuery, 
    useSigninUserMutation, 
    useSignupUserMutation, 
    // useLogoutUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGoogleSignInMutation,
    useGetBookingsQuery,
    useGetBookingQuery,
    useGetBookingsByUserQuery,
    useAddBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation
 } = API

