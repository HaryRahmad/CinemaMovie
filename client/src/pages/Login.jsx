import { useState } from "react"
import dataApi from "../helpers/dataApi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2"


export default function Login() {
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()
        try {
            const { data } = await dataApi({
                method: `post`,
                url: `/login`,
                data: {
                    email: email,
                    password: password
                }
            })
            localStorage.access_token = data.access_token
            navigate("/menu")
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }
    async function haandleGoogleLogin(res) {
        console.log(res, "-----------");
        try {
            const { data } = await axios({
                method: 'post',
                url: "http://localhost:3000/google-login",
                data: {
                    google_token: res.credential,
                }
            })
            // console.log(data, `---------`);

            localStorage.access_token = data.access_token;
            navigate("/menu")
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


    // function handleCredentialResponse(response) {
    //     console.log("Encoded JWT ID token: " + response.credential);
    // }
    // useEffect(() => {
    //     window.google.accounts.id.initialize({
    //         client_id: "YOUR_GOOGLE_CLIENT_ID",
    //         callback: handleCredentialResponse
    //     });
    //     window.google.accounts.id.renderButton(
    //         document.getElementById("buttonDiv"),
    //         { theme: "outline", size: "large" }  // customization attributes
    //     );
    //     window.google.accounts.id.prompt();
    // }, [])
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div><br />
                            <div id="buttonDiv" className="">
                                <GoogleLogin onSuccess={haandleGoogleLogin}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                    useOneTap
                                />
                            </div>
                            <br />
                            <p>Dont have account? <Link to={`/register`}><span className="text-zinc-200 hover:font-bold">Register</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}