import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Task } from '@/types/task-types/taskTypes'

type TasksProps = {
    tasks: Task[] | undefined;
}
const ProjectTasksSkeleton = ({ tasks }: TasksProps) => {
    const taskLength = tasks ? tasks.length : 4;

    return (
        <>
            {
                Array.from({ length: taskLength }).map((_, index) => (
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
                ))
            }
        </>
    )
}

export default ProjectTasksSkeleton