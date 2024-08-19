// import { Link, useNavigate } from "react-router-dom"
// import dataApi from "../helpers/dataApi";

// export default function CardPayment(props) {
//     const {el} = props
//     // const navigate = useNavigate()
//     console.log(el.cover,`------------`);
//     // async function handleAddTicket(title, coverFix, id) {
//     //     // event.preventDefault()
//     //     try {
//     //         console.log(el.id,`----------`);
//     //         let {data} = await dataApi({
//     //             method:"post",
//     //             url:`/menu/${el.id}`,
//     //             headers: {
//     //                 "Authorization": `Bearer ${localStorage.getItem('access_token')}`
//     //             },data:{
//     //                 title:el.title,
//     //                 cover:coverFix
//     //             }
//     //         })
//     //         // navigate(`/menu`)
//     //     } catch (error) {
//     //         console.log(error.response);
//     //     }
//     // }
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTicketById } from "../../store/ticketSlice";
// import { fetchDataById } from "../../store/movieSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dataApi from "../helpers/dataApi";



export default function Ticket(props) {
    const { el, deleteTicket, handlePayment } = props
    const navigate = useNavigate();
    // console.log(ticketId);

    // const handlePayment = async () => {
    //     // console.log(`masookkk-----------`);
    //     const { data } = await axios({
    //         method: "post",
    //         baseURL: "http://localhost:3000/payment",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.access_token,
    //         },
    //     });
    //     console.log(data, "<< data");

    //     // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    //     // window.snap.pay(data.transactionToken, {
    //     // console.log(window.snap);
    //     window.snap.pay(data.transactionToken, {
    //         onSuccess: async function (result) {
    //             try {
    //                 let data = await dataApi({
    //                     method: `patch`,
    //                     url: `/payment/status/${el.id}`,
    //                     headers: {
    //                         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //                     }, data: {
    //                         id: el.id,
    //                         status: el.status
    //                     }
    //                 })
    //                 console.log(data);
    //                 navigate('/myticket')
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         },
    //         onPending: function (result) {
    //             /* You may add your own implementation here */
    //             Swal.fire({
    //                 title: "Close!",
    //                 text: "waiting your payment!",
    //                 icon: "error",
    //                 confirmButtonText: "ok",
    //             });
    //             console.log(result);
    //         },
    //         onError: function (result) {
    //             /* You may add your own implementation here */
    //             console.log(result);
    //             Swal.fire({
    //                 title: "Close!",
    //                 text: "payment failed!",
    //                 icon: "error",
    //                 confirmButtonText: "ok",
    //             });
    //         },
    //         onClose: function () {
    //             /* You may add your own implementation here */
    //             Swal.fire({
    //                 title: "Close!",
    //                 text: "you closed the popup without finishing the payment",
    //                 icon: "error",
    //                 confirmButtonText: "ok",
    //             });
    //         }
    //     });
    // };
    // console.log(movies);

    // async function deleteTicket(event) {
    //     event.preventDefault()
    //     try {
    //         const { data } = await axios({
    //             method: "delete",
    //             url: `http://localhost:3000/myticket/${el.id}`,
    //             headers: {
    //                 Authorization: `Bearer ` + localStorage.access_token
    //             }
    //         })

    //         navigate('/myticket')
    //         // console.log("berhasil delete");
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: error.response.data.message,
    //             icon: 'error',
    //             confirmButtonText: 'ok'
    //         })
    //     }
    // }

    // useEffect(() => {
    //     dispatch(fetchTicketById(ticketId));
    // }, [dispatch, ticketId]);

    // useEffect(() => {
    //     if (tickets && tickets.MovieId) {
    //         dispatch(fetchDataById(tickets.MovieId));
    //     }
    // }, [dispatch, tickets]);


    return (
        <div className="card bg-base-100 w-72 h-full shadow-xl rounded-3xl">
            <figure>
                <img
                    src={el.cover}
                    alt="cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title" >{el.title}</h2>
                <p>price: {el.price}</p>
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
                    {/* <button className="btn btn-primary mt-3 container" onClick={() => handleAddTicket(el.id, coverFix)}>Buy Now</button> */}
                    {el.status !== "success" ? (
                        <button
                            onClick={() =>{handlePayment(el.id, el.status)}}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Payment
                        </button>
                    ) : (
                        <button
                            disabled
                            className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
                        >
                            Already Paid
                        </button>

                    )}
                    {el.status !== "success" ? (
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-5" onClick={()=>{deleteTicket(el.id)}}>Delete</button>
                    ) : (
                        <button
                            disabled
                            className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
                        >
                            Cannot Delete
                        </button>

                    )}
                </div>
            </div>
        </div>
    )
}