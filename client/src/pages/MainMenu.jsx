import { useEffect, useState } from "react"
import dataApi from "../helpers/dataApi"
import Card from "../components/Card";
import Chatbox from "../components/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/movieSlice";
import Swal from "sweetalert2"


export default function MainMenu() {

    const dispatch = useDispatch()
    const { movies } = useSelector((state) => state.movies)

    // const [movie, setMovie] = useState([])

    // async function handleGetData() {
    //     try {
    //         let {data} = await dataApi({
    //             url: "/menu",
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem(`access_token`)}`
    //             }
    //         });
    //         // console.log(dataMov,`------`);
    //         setMovie(data);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // console.log(movie,`----------`);
    useEffect(() => {
        // handleGetData()
        dispatch(fetchData())
    }, [])
    return (
        <div className="flex flex-wrap justify-center gap-14">
            {movies.map(el => {
                return <div key={el.id}>
                    <Card el={el} />
                </div>
            })}
            {/* <Chatbox/> */}
        </div>

    )
}