import { ModeToggle } from '@/components/Theme/ModeToggle';
import { Separator } from '@/components/ui/separator';
import { Link } from "react-router-dom";

const LayoutHeader = () => {
    return (
        <>
            <div className="py-4 w-full">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div>
                        <Link to='/' className="flex">
                            <span className="text-2xl text-zinc-500 font-bold tracking-tight hover:text-zinc-700 hover:cursor-pointer dark:hover:text-zinc-400 duration-200">
                                Project-34
                            </span>
                        </Link>
                    </div>
                    <div>
                        <Link to='/login'
                            className="text-2xl text-zinc-500 pr-4 font-bold tracking-tight hover:text-zinc-700 hover:cursor-pointer dark:hover:text-zinc-400 duration-200"
                        >
                            Sign in
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </div>
            <Separator />
        </>
    )
}

export default LayoutHeader