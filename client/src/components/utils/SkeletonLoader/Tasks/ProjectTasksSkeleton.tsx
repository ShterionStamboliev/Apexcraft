import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type TasksProps = {
    count: number
}
const ProjectTasksSkeleton = ({ count }: TasksProps) => {

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Card className='w-[300px]' key={index}>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='w-full h-[1rem]' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-1.5'>
                        <Skeleton className='w-1/2 h-[1rem]' />
                        <Skeleton className='w-1/2 h-[1rem]' />
                        <Skeleton className='w-1/2 h-[1rem]' />
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default ProjectTasksSkeleton