import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import dataApi from "../helpers/dataApi"
import Swal from "sweetalert2"

export default function Register() {
    const [username, setUsername] = useState(``)
    const [ email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const navigate = useNavigate()

    async function handleRegister(event) {
        event.preventDefault()
        try {
            let {data} = await dataApi({
                method:"post",
                url:"/register",
                data:{
                    username:username,
                    email:email,
                    password:password
                }
            })
            navigate(`/login`)
        } catch (error) {
            console.log(error);
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="username" className="input input-bordered" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
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
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>You have account? <Link to={`/login`}><span className="text-zinc-200 hover:font-bold">Login</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}