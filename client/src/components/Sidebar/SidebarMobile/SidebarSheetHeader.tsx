import { Button } from '@/components/ui/button'
import { SheetClose, SheetHeader } from '@/components/ui/sheet'
import { X } from 'lucide-react'

type SidebarSheetHeaderProps = {
    headerTitle: string
}

const SidebarSheetHeader = ({ headerTitle }: SidebarSheetHeaderProps) => {
    return (
        <SheetHeader className='flex flex-row justify-between items-center space-y-0 mb-4'>
            <span className='text-lg font-semibold text-foreground mx-3 text-zinc-500 tracking-tight hover:text-zinc-700 hover:cursor-pointer dark:hover:text-zinc-400 duration-200'>
                {headerTitle}
            </span>
            <SheetClose asChild>
                <Button className='h-7 w-7 p-0' variant='ghost'>
                    <X size={15} />
                </Button>
            </SheetClose>
        </SheetHeader>
    )
}

export default SidebarSheetHeader