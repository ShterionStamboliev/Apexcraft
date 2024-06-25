import { Sheet, SheetContent } from '@/components/ui/sheet'
import SidebarSheetTrigger from './SidebarSheetTrigger'
import SidebarSheetHeader from './SidebarSheetHeader'
import SidebarMobileItems from './SidebarMobileItems'

const SidebarMobile = () => {

    return (
        <Sheet>
            <SidebarSheetTrigger />
            <SheetContent
                hide
                side='left'
                className='px-0 py-4 w-[220px]'
            >
                <SidebarSheetHeader
                    headerTitle='Project-34'
                />
                <SidebarMobileItems />
            </SheetContent>
        </Sheet>
    )
}

export default SidebarMobile