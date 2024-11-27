import { Task } from '@/types/task-types/taskTypes';
import { useEffect } from 'react';
import { useTaskFormHooks } from './forms/useTaskForm';

export const useEditTaskForm = (task: Task) => {
    const { useEditTaskForm } = useTaskFormHooks();

    const form = useEditTaskForm(task);

    const { reset } = form;

    useEffect(() => {
        if (task) {
            reset({
                name: task.name,
                price_per_measure: task.price_per_measure,
                total_work_in_selected_measure:
                    task.total_work_in_selected_measure,
                artisan: task.artisanName,
                activity: task.activityName,
                measure: task.measureName,
                total_price: task.total_price,
                start_date: task.start_date,
                end_date: task.end_date,
                status: task.status,
                note: task.note,
            });
        }
    }, [task, reset]);

    return form;
};
