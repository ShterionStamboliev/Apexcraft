import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import EditWorkItemForm from '@/components/forms/work-items-form/WorkItemFormEdit/EditWorkItem';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WorkItemSkeleton from '@/components/utils/SkeletonLoader/WorkItems/WorkItemSkeleton';
import { format } from 'date-fns';
import { ClipboardList, Hourglass } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface WorkItemsListProps {
    workItemsData: any;
    isFetchingNextPage?: boolean;
    scrollRef?: (node?: Element | null) => void;
    isWorkItemsLoading?: boolean;
}

const WorkItemsList = ({
    workItemsData,
    isFetchingNextPage,
    isWorkItemsLoading,
    scrollRef,
}: WorkItemsListProps) => {
    const { id, taskId } = useParams();

    const noResultsFound =
        !workItemsData?.pages ||
        workItemsData.pages.every((page: any) => page.length === 0);

    return (
        <div className='mt-10 mb-16 space-y-4'>
            {noResultsFound ? (
                <NoResultsFound
                    title='No work items found'
                    description="It looks like you haven't added any work items yet."
                    Icon={ClipboardList}
                />
            ) : (
                workItemsData?.pages &&
                workItemsData.pages.map((page: any, pageIndex: any) => (
                    <div
                        key={pageIndex}
                        className='grid sm:grid-cols-2 md:grid-cols-2 gap-4'
                    >
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
                                    <div className='flex flex-col lg:flex-row gap-2 justify-between text-sm text-muted-foreground'>
                                        <div className=''>
                                            <div>
                                                Start:{' '}
                                                {format(
                                                    new Date(task.start_date!),
                                                    'PP'
                                                )}
                                            </div>
                                            <div>
                                                End:{' '}
                                                {format(
                                                    new Date(task.end_date!),
                                                    'PP'
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex items-end'>
                                            <div>
                                                <span className='mr-2'>
                                                    Status:{' '}
                                                </span>
                                                <Badge
                                                    variant='outline'
                                                    className={`rounded-full ${
                                                        task.status ===
                                                        'in_progress'
                                                            ? 'text-yellow-600'
                                                            : 'text-green-500'
                                                    }`}
                                                >
                                                    {task.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        task.status
                                                            .slice(1)
                                                            .replace('_', ' ')}
                                                    {task.status ===
                                                    'in_progress' ? (
                                                        <Hourglass size={20} />
                                                    ) : null}
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
                {(isFetchingNextPage || isWorkItemsLoading) && (
                    <WorkItemSkeleton />
                )}
            </div>
        </div>
    );
};

export default WorkItemsList;
