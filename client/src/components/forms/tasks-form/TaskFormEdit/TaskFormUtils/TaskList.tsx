import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface TaskItem {
    id: string
    name: string
    start_date: string
    end_date: string
}

interface TaskListProps {
    tasksData: any
    isFetchingNextPage: boolean
    scrollRef: (node?: Element | null) => void
}

const TaskList = ({ tasksData, isFetchingNextPage, scrollRef }: TaskListProps) => {
    return (
        <div className="mt-10 space-y-4">
            {tasksData?.pages && tasksData.pages.map((page: any, pageIndex: any) => (
                <div key={pageIndex} className="space-y-4">
                    {page.map((task: TaskItem) => (
                        <Card key={task.id}>
                            <CardHeader>
                                <CardTitle>{task.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <div>
                                        Start: {format(new Date(task.start_date), 'PP')}
                                    </div>
                                    <div>
                                        End: {format(new Date(task.end_date), 'PP')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ))}
            <div ref={scrollRef}>
                {isFetchingNextPage && (
                    <Card>
                        <CardContent className="p-4 text-center">
                            Loading... {/* IMPLEMENT SPINNER COMPONENT HERE */}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default TaskList;