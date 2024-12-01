import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import UserWorkItemEdit from '@/components/Forms/UserWorkItem/UserWorkItemFormEdit/UserWorkItemEdit';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkItem } from '@/types/work-item-types/workItem';
import { format } from 'date-fns';
import { ClipboardList, Hourglass } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface UserProjectWorkItemsListProps {
    workItemsData: WorkItem[];
}

const UserProjectWorkItemsList = ({
    workItemsData,
}: UserProjectWorkItemsListProps) => {
    const { taskId } = useParams();

    return (
        <div className='mb-20 mt-10 space-y-4'>
            {workItemsData?.length === 0 ? (
                <NoResultsFound
                    title='No work items found'
                    description="It looks like there aren't any added work items yet."
                    Icon={ClipboardList}
                />
            ) : (
                <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-4'>
                    {workItemsData &&
                        workItemsData.map((workItem) => (
                            <Card key={workItem.id}>
                                <CardHeader>
                                    <div className='flex items-center gap-4'>
                                        <CardTitle>{workItem.name}</CardTitle>
                                        <UserWorkItemEdit
                                            taskId={taskId!}
                                            workItem={workItem}
                                            workItemId={workItem.id!}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col lg:flex-row gap-2 justify-between text-sm text-muted-foreground'>
                                        <div className=''>
                                            <div>
                                                Start:{' '}
                                                {format(
                                                    new Date(
                                                        workItem.start_date!
                                                    ),
                                                    'PP'
                                                )}
                                            </div>
                                            <div>
                                                End:{' '}
                                                {format(
                                                    new Date(
                                                        workItem.end_date!
                                                    ),
                                                    'PP'
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex items-end'>
                                            <div>
                                                <span className='mr-2'>
                                                    Status:
                                                </span>
                                                <Badge
                                                    variant='outline'
                                                    className={`rounded-full ${
                                                        workItem.status ===
                                                        'in_progress'
                                                            ? 'text-yellow-600'
                                                            : 'text-green-500'
                                                    }`}
                                                >
                                                    {workItem
                                                        .status!.charAt(0)
                                                        .toUpperCase() +
                                                        workItem
                                                            .status!.slice(1)
                                                            .replace('_', ' ')}
                                                    {workItem.status ===
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
            )}
        </div>
    );
};

export default UserProjectWorkItemsList;
