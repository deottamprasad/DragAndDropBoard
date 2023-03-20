import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const itemsApi = createApi({
    reducerPath: "itemsApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3000/"}),
    tagTypes: ["items"],
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: () => "items",
        }),
    }),
});

export const {useGetAllItemsQuery} = itemsApi;