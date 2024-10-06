import { EditTaskSchema, taskEditSchema } from '@/components/models/task/newTaskSchema';
import { Task } from '@/types/task-types/taskTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useEditTaskForm = (task: Task) => {
    const form = useForm<EditTaskSchema>({
        resolver: zodResolver(taskEditSchema),
        defaultValues: {
            name: task?.name,
            price_per_measure: task?.price_per_measure,
            total_work_in_selected_measure: task?.total_work_in_selected_measure,
            artisan: task?.artisanName,
            activity: task?.activityName,
            measure: task?.measureName,
            total_price: task?.total_price,
            start_date: task?.start_date,
            end_date: task?.end_date,
            status: task?.status,
            note: task?.note
        },
        mode: 'onChange'
    });

    const { reset } = form;

    useEffect(() => {
        if (task) {
            reset({
                name: task.name,
                price_per_measure: task.price_per_measure,
                total_work_in_selected_measure: task.total_work_in_selected_measure,
                artisan: task.artisanName,
                activity: task.activityName,
                measure: task.measureName,
                total_price: task.total_price,
                start_date: task.start_date,
                end_date: task.end_date,
                status: task.status,
                note: task.note
            });
        }
    }, [task, reset]);

    return form;
};