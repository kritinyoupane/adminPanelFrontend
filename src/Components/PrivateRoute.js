import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({onlyAdmin, children}) => {

    const {userInfo, isSuperUser} = useContext(AuthContext)
    
    const host = window.location.host
    const pathAndParams = window.location.href.split(host+"/")[1]
    const loginRedirectUrl = `/login?redirect_to=${pathAndParams}`

    // if (userInfo) {
    //   if (!onlyAdmin) {
    //     return children;
    //   }
    //   return isSuperUser ? children : <Navigate to="/accessDenied" />
      
    // }

    if (userInfo) {
        console.log(userInfo);
        switch (userInfo.approvalStatus) {
            case "Approved":
                if (!onlyAdmin) {
                    return children;
                }
                return isSuperUser ? children : <Navigate to="/accessDenied" />;
            case "Pending":
                return <>Pending</>;

            case "Rejected":
                return <>Rejected</>;

            default:
                return <>Error</>;
        }
    }

    return <Navigate to={loginRedirectUrl} />

}

export default PrivateRoute;