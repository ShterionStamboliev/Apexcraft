import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Task } from '@/types/task-types/taskTypes'

type TasksDataLength = {
    data?: Task[]
}
const ProjectTasksSkeleton = ({ data }: TasksDataLength) => {

    return (
        <>
            {data && data.map((_, index) => (
                <Card className='w-[300px]' key={index}>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='w-full h-[1rem]' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-1.5'>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default ProjectTasksSkeleton