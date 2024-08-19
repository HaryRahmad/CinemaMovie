import { useEffect, useState } from "react"
import dataApi from "../helpers/dataApi"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import CardPayment from "../components/CardPayment"
import Swal from "sweetalert2"
import axios from "axios"

export default function MyTicket() {
    const [dataTicket, setDataTicket] = useState([])
    async function handleGetMyTicket() {
        try {
            const { data } = await dataApi({
                url: "/myticket",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
            setDataTicket(data)
            MyTicket()
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
    async function deleteTicket(id) {
        // event.preventDefault()
        try {
            const { data } = await axios({
                method: "delete",
                url: `http://localhost:3000/myticket/${id}`,
                headers: {
                    Authorization: `Bearer ` + localStorage.access_token
                }
            })

            handleGetMyTicket()
            // console.log("berhasil delete");
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        }
    }
    const handlePayment = async (id, status) => {
        // console.log(`masookkk-----------`);
        const { data } = await axios({
            method: "post",
            baseURL: "http://localhost:3000/payment",
            headers: {
                Authorization: "Bearer " + localStorage.access_token,
            },
        });
        console.log(data, "<< data");

        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        // window.snap.pay(data.transactionToken, {
        // console.log(window.snap);
        window.snap.pay(data.transactionToken, {
            onSuccess: async function (result) {
                try {
                    let data = await dataApi({
                        method: `patch`,
                        url: `/payment/status/${id}`,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }, data: {
                            id: id,
                            status: status
                        }
                    })
                    console.log(data);
                    handleGetMyTicket()
                } catch (error) {
                    console.log(error);
                }
            },
            onPending: function (result) {
                /* You may add your own implementation here */
                Swal.fire({
                    title: "Close!",
                    text: "waiting your payment!",
                    icon: "error",
                    confirmButtonText: "ok",
                });
                console.log(result);
            },
            onError: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                Swal.fire({
                    title: "Close!",
                    text: "payment failed!",
                    icon: "error",
                    confirmButtonText: "ok",
                });
            },
            onClose: function () {
                /* You may add your own implementation here */
                Swal.fire({
                    title: "Close!",
                    text: "you closed the popup without finishing the payment",
                    icon: "error",
                    confirmButtonText: "ok",
                });
            }
        });
    };
    console.log(dataTicket);
    useEffect(() => {
        handleGetMyTicket()
    }, [])

    return (
        <>
            {dataTicket ?<div className="flex flex-wrap justify-center gap-14">
                {dataTicket.map(el => {
                    return <div key={el.id}>
                        <CardPayment el={el} deleteTicket={deleteTicket} handlePayment={handlePayment}/>
                    </div>
                })}

                {/* <Chatbox/> */}
            </div>: (<h1>Tidak ada Ticket</h1>)}
            {/* {dataTicket ? (<div className="flex flex-wrap justify-center gap-14">
                {dataTicket.map(el => {
                    return <div key={el.id}>
                        <Card el={el} />
                    </div>
                })} */}

            {/* <Chatbox/> */}
            {/* </div>) : (<h1>Tidak ada Ticket</h1>)} */}

        </>
        // <div className="flex flex-wrap justify-center gap-14">

        //     {dataTicket?.map(el => {
        //         return <div>
        //             <Card el={el} />
        //         </div>
        //     })}

        //     {/* <Chatbox/> */}
        // </div>

    )
}