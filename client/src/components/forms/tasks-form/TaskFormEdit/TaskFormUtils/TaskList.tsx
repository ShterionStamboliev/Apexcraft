import EditWorkItemForm from '@/components/forms/work-items-form/EditWorkItem'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WorkItemSkeleton from '@/components/utils/SkeletonLoader/WorkItems/WorkItemSkeleton'
import { format } from "date-fns"
import { Hourglass } from 'lucide-react'
import { useParams } from 'react-router-dom'

interface TaskListProps {
    tasksData: any
    isFetchingNextPage: boolean
    scrollRef: (node?: Element | null) => void
}

const TaskList = ({ tasksData, isFetchingNextPage, scrollRef }: TaskListProps) => {
    const { id, taskId } = useParams();

    const noResultsFound = !tasksData?.pages || tasksData.pages.every((page: any) => page.length === 0);

    return (
        <div className="mt-10 space-y-4">
            {noResultsFound ? (
                <Card>
                    <CardContent className="p-4 text-center text-lg">
                        There are currently no work items for this task
                    </CardContent>
                </Card>
            ) : (tasksData?.pages && tasksData.pages.map((page: any, pageIndex: any) => (
                <div key={pageIndex} className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {page.map((task: any) => (
                        <Card key={task.id}>
                            <CardHeader>
                                <div className='flex items-center gap-4'>
                                    <CardTitle>{task.name}</CardTitle>
                                    <EditWorkItemForm
                                        task={task}
                                        id={id!}
                                        taskId={taskId!}
                                        workItemId={task.id}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col lg:flex-row gap-2 justify-between text-sm text-muted-foreground">
                                    <div className=''>
                                        <div>
                                            Start: {format(new Date(task.start_date!), 'PP')}
                                        </div>
                                        <div>
                                            End: {format(new Date(task.end_date!), 'PP')}
                                        </div>
                                    </div>
                                    <div className='flex items-end'>
                                        <div>
                                            <span className='mr-2'>Status: </span>
                                            <Badge
                                                variant='outline'
                                                className={`rounded-full ${task.status === 'in_progress'
                                                    ? 'text-yellow-600'
                                                    : 'text-green-500'
                                                    }`}>
                                                {(task.status).charAt(0).toUpperCase() + (task.status).slice(1).replace("_", " ")}
                                                {task.status === 'in_progress'
                                                    ? <Hourglass size={20} />
                                                    : null
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ))
            )}
            <div ref={scrollRef}>
                {isFetchingNextPage && (
                    <WorkItemSkeleton />
                )}
            </div>
        </div>
    )
}

export default TaskList;