import { Link, useNavigate } from "react-router-dom"
import dataApi from "../helpers/dataApi";
import Swal from "sweetalert2"

export default function Card(props) {
    const { el } = props
    const navigate = useNavigate()

    async function handleAddTicket(title, coverFix, id) {
        // event.preventDefault()
        try {
            // console.log(el.id,`----------`);
            let { data } = await dataApi({
                method: "post",
                url: `/menu/${el.id}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }, data: {
                    id:el.id,
                    title: el.title,
                    cover: coverFix
                }
            })

            // navigate(`/menu`)
        } catch (error) {
            console.log(error.response);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    let coverFix = "https://image.tmdb.org/t/p/original" + el.poster_path

    return (
        <div className="card bg-base-100 w-72 h-full shadow-xl rounded-3xl">
            <figure>
                <img
                    src={coverFix}
                    alt="cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title" >{el.original_title}</h2>
                <p>Release date: {el.release_date}</p>
                {/* <div className="card-actions m-5">
                    <Link onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-primary container bg-red-600">Trailer</Link>
                </div>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box w-full max-w-fit">
                    <iframe width="850" height="550" src="https://www.youtube.com/embed/iRYDYrj3Bfw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog> */}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary mt-3 container" onClick={() => handleAddTicket(el.id, coverFix)}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}