import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex navbar bg-slate-700 py-4 border-b-2 mb-3">
            <div className="flex-1 justify-start">
                <Link to={"/menu"} className="btn btn-ghost text-xl">CINEMA MOVIE</Link>
            </div>
            <div className="">
                <Link to={"/myticket"} className="btn btn-ghost text-xl">MyTicket</Link>
            </div>
            <div className="">
                <Link to={"/ask"} className="btn btn-ghost text-xl">ASK</Link>
            </div>
            <div className="flex-none gap-2">
                {/* <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div> */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><Link to={'/login'} onClick={() => localStorage.clear()} className="container" style={{ color: "blue", fontSize: "20px", marginTop: "10px" }}>
                            Logout
                        </Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}