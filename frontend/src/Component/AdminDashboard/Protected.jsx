import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const Protected = ({ children }) => {
    const navigate = useNavigate()
    const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

    return isAuthenticated ? children : navigate("/admin-log") ;
 
}

export default Protected
