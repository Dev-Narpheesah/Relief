import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

const useAuthRedirect = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])
    // const { user } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("login")
        }
    }, [user, navigate])
};

// export const useAuthRedirect = useAuthRedirect();

export default useAuthRedirect