import { createBrowserRouter, redirect } from "react-router-dom";
import LoreLayout from "./layouts/LoreLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuLayout from "./layouts/MenuLayout";
import MainMenu from "./pages/MainMenu";
import MyTicket from "./pages/MyTicket";
import Chatbox from "./components/Chatbox";


const router = createBrowserRouter([
    {
        element:<LoreLayout/>,
        loader:() =>{
          if (localStorage.getItem(`access_token`)) {
            return redirect(`/menu`)
          }
          return null
        },
        children:[
            {
                path:"/login",
                element:<Login/>
            },{
                path:"/register",
                element:<Register/>
            }
        ]
    },{
        element:<MenuLayout/>,
        loader:() =>{
          if (!localStorage.getItem(`access_token`)) {
            return redirect(`/login`)
          }
          return null
        },
        children:[
            {
                path:"/menu",
                element:<MainMenu/>
            },{
                path:"/myticket",
                element:<MyTicket/>
            },{
                path:"/ask",
                element:<Chatbox/>
            }
        ]
    }
])
export default router