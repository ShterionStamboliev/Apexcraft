import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PaginatedWorkItems } from '@/types/work-item-types/workItem';
import { useMemo } from 'react';

type TaskItemCardProps = {
    workItems: PaginatedWorkItems;
};

const TaskItemCard = ({ workItems }: TaskItemCardProps) => {
    const taskDetails = useMemo(() => {
        if (!workItems) {
            return null;
        }

        const workItemsPages = workItems.pages.flat();

        const taskName = new Set(workItemsPages.map((task) => task.task_name));
        const artisanName = new Set(
            workItemsPages.map((task) => task.artisan_name)
        );
        const measurePrice = new Set(
            workItemsPages.map((task) => task.price_per_measure)
        );
        const totalWork = new Set(
            workItemsPages.map((task) => task.total_work_in_selected_measure)
        );
        const totalPrice = new Set(
            workItemsPages.map((task) => task.total_price)
        );
        const taskStatus = new Set(
            workItemsPages.map((task) => task.task_status)
        );

        return {
            taskName: Array.from(taskName),
            artisanName: Array.from(artisanName),
            measurePrice: Array.from(measurePrice),
            totalPrice: Array.from(totalPrice),
            taskStatus: Array.from(taskStatus),
            totalWork: Array.from(totalWork),
        };
    }, [workItems]);

    return (
        <>
            {taskDetails && (
                <div className='flex flex-col mt-44 border rounded-lg mx-8 space-y-4 p-4 backdrop-blur-sm bg-slate-900/20'>
                    <h1 className='text-2xl font-bold mb-2 text-foreground text-center motion-preset-shrink motion-duration-1000'>
                        {taskDetails.taskName}
                    </h1>
                    <Separator />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Task name
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.taskName}`}
                                className='mt-2'
                            />
                        </div>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Artisan name
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.artisanName}`}
                                className='mt-2'
                            />
                        </div>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Measure price
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.measurePrice}`}
                                className='mt-2'
                            />
                        </div>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Total price
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.totalPrice}`}
                                className='mt-2'
                            />
                        </div>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Task status
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.taskStatus}`}
                                className='mt-2'
                            />
                        </div>
                        <div>
                            <Label htmlFor='text' className='font-bold text-md'>
                                Total work
                            </Label>
                            <Input
                                disabled
                                type='text'
                                placeholder={`${taskDetails.totalWork}`}
                                className='mt-2'
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskItemCard;
