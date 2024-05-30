import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

const Homepage = () => {

    const { user, logout, isLoading, role } = useAuth();
    
    if (!user) {
        return <div>Loading...</div>
    }
    
    console.log(role);

    return (
        <div>
            {user && (<div>
                Welcome, {user}
                <Button onClick={logout}>Logout</Button>
            </div>)}
        </div>
    )
}

export default Homepage