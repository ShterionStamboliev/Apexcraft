import { useGetInfiniteData } from '@/hooks/useQueryHook';
import { CircleAlert, ClipboardList } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { PaginatedWorkItems } from '@/types/work-item-types/workItem';
import { useEffect } from 'react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';
import WorkItemCard from './WorkItemCard';
import CreateWorkItem from '@/components/Forms/WorkItems/WorkItemFormCreate/CreateWorkItem';

const WorkItemsTableBody = () => {
    const { ref, inView } = useInView();

    const { id, taskId } = useParams();

    const {
        data: workItems,
        fetchNextPage,
        isFetchingNextPage,
        isPending,
        isError,
    } = useGetInfiniteData<PaginatedWorkItems>({
        URL: `/projects/${id}/tasks/${taskId}`,
        queryKey: ['projects', id, 'tasks', taskId, 'work-items'],
    });

    if (isError) {
        return <ErrorMessage title='Oops...' Icon={CircleAlert} />;
    }

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <>
            <div className='flex flex-col border rounded-lg mt-8 mx-8 space-y-4 p-4 backdrop-blur-sm bg-slate-900/20'>
                <CreateWorkItem />
            </div>
            <div className='flex flex-col border rounded-lg mt-8 mb-24 md:mt-0 mx-8 p-4 backdrop-blur-sm bg-slate-900/20'>
                <div className='flex flex-wrap sm:w-full gap-4'>
                    <ConditionalRenderer
                        data={workItems as PaginatedWorkItems}
                        renderData={(workItems) => (
                            <WorkItemCard
                                workItems={workItems as PaginatedWorkItems}
                            />
                        )}
                        noResults={{
                            title: 'No work items found',
                            description:
                                "It looks like you haven't added any projects yet",
                            Icon: ClipboardList,
                        }}
                    />
                </div>
            </div>
            <div ref={ref}>{isFetchingNextPage || isPending}</div>
        </>
    );
};

export default WorkItemsTableBody;
