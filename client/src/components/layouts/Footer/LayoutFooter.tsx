import { Separator } from '@/components/ui/separator'

const LayoutFooter = () => {
    return (
        <>
            <Separator />
            <div className="py-8">
                <div className="container mx-auto flex flex-col justify-between">
                    <span className="text-3xl font-bold tracking-tight text-center">
                        Project-34
                    </span>
                </div>
            </div>
        </>
    )
}

export default LayoutFooter