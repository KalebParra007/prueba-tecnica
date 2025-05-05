import Login from '../pages/Login.jsx'
import VistaPrincipal from '../pages/VistaPrincipal.jsx'
export let enrutador=[
    {
        path: '/',
        element:<VistaPrincipal/>
    },
    {
        path: '/login',
        element: <Login/>
    }
]
