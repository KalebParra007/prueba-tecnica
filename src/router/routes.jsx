import Login from '../pages/Login.jsx'
import VistaPrincipal from '../pages/VistaPrincipal.jsx'
import PanelItems from '../pages/PanelItems.jsx'
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
        elemet: <PanelItems/>
    }
]
