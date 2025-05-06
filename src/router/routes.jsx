import Login from '../pages/Login.jsx'
import VistaPrincipal from '../pages/VistaPrincipal.jsx'
import PanelItems from '../pages/PanelItems.jsx'
import UserHome from '../pages/UserHome.jsx'
import ProtectedRoute from '../components/ProtectedRouted.jsx'

export let enrutador=[
    {
        path: '/',
        element:<VistaPrincipal/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/panelitems',
        element: <PanelItems/>
    },{
        path:'/userhome',
        element:<ProtectedRoute security={<UserHome/>}/>
    }
]
