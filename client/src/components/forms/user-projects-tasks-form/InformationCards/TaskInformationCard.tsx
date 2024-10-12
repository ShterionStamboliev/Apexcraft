import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ProjectTask } from '@/types/task-types/taskTypes'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'

const TaskInformationCard = ({ project }: { project: ProjectTask }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl text-center'>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <h3 className="font-semibold">Task name</h3>
                    <p className='text-gray-400'>{project.taskProjectData.name}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Measure price</h3>
                    <p className='text-gray-400'>{project.taskProjectData.price_per_measure}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Total work</h3>
                    <p className='text-gray-400'>{project.taskProjectData.total_work_in_selected_measure}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Total price</h3>
                    <p className='text-gray-400'>{project.taskProjectData.total_price}</p>
                </div>
                <Separator />
                <div className="flex items-center pt-4">
                    <CalendarIcon className="mr-2 text-blue-600" />
                    <h3 className='mr-2'>Start:</h3>
                    <span className='text-gray-400'>{format((project.taskProjectData.start_date as string), "PPP")}</span>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="mr-2 text-red-500" />
                    <h3 className='mr-2'>End:</h3>
                    <span className='text-gray-400'>{format((project.taskProjectData.end_date as string), "PPP")}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="mr-2" />
                    <h3 className='mr-2'>Status:</h3>
                    <Badge
                        className={`px-4 text-sm rounded-full 
                                ${project.taskProjectData.project_status === 'active'
                                ? 'text-green-500'
                                : 'text-red-500'}`
                        }
                        variant='outline'>
                        {project.taskProjectData.project_status}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskInformationCard