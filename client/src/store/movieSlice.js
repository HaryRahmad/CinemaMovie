import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: []
    },
    reducers: {
        fetchSuccess: (state, action) => {
            state.movies = action.payload
        }
    }
})
export const {
    fetchSuccess
} = movieSlice.actions

export function fetchData() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                baseURL: `http://localhost:3000/menu`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
            // console.log(data, `----------`);
            dispatch(fetchSuccess(data))
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    }
}

export default movieSlice.reducer