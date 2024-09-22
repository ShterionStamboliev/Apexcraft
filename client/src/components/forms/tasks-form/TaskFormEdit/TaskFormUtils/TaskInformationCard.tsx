import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Task } from '@/types/task-types/taskTypes'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'

const TaskInformationCard = ({ task }: { task: Task }) => {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl text-center'>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-xl">Task name</h3>
                    <p className='text-gray-400'>{task.name}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Price per measure</h3>
                    <p className='text-gray-400'>{task.price_per_measure}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Total work in measure</h3>
                    <p className='text-gray-400'>{task.total_work_in_selected_measure}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Total price</h3>
                    <p className='text-gray-400'>{task.total_price}</p>
                </div>
                <div className="flex items-center pt-4">
                    <CalendarIcon className="mr-2" />
                    <h3 className='mr-2'>Start:</h3>
                    <span className='text-gray-400'>{format((task.start_date as string), "PPP")}</span>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="mr-2" />
                    <h3 className='mr-2'>End:</h3>
                    <span className='text-gray-400'>{format((task.end_date as string), "PPP")}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="mr-2" />
                    <h3 className='mr-2'>Status:</h3>
                    <span className='text-gray-400'>{task.status}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskInformationCard