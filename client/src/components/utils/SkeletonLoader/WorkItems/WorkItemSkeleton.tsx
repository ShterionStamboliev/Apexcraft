import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const WorkItemSkeleton = () => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">

            <Card>
                <CardHeader>
                    <div className='flex items-center gap-4'>
                        <Skeleton className='w-[10rem] h-[1rem]' />
                        <Skeleton className='w-[2rem] h-[2rem]' />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='flex items-end justify-between'>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <Skeleton className='w-[7rem] h-[1rem]' />
                            </div>
                            <div>
                                <Skeleton className='w-[7rem] h-[1rem]' />
                            </div>
                        </div>
                        <div>
                            <div>
                                <Skeleton className='w-[10rem] h-[1rem]' />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default WorkItemSkeleton