import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="py-6 bg-slate-800">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className="flex">
                    <span className="text-white text-2xl font-bold tracking-tight">
                        Project-34
                    </span>
                </Link>

                <Link to='/login' className="text-white text-2xl font-bold tracking-tight hover:cursor-pointer hover:text-yellow-100">
                    Sign in
                </Link>
                
            </div>
        </div>
    )
}

export default Header