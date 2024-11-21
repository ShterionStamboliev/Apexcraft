import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Project } from '@/types/project-types/projectTypes';

type ProjectTypeProps = {
    projects: Project[] | undefined;
}

const ProjectsSkeletonCard = ({ projects }: ProjectTypeProps) => {
    const projectsCardCount = projects ? projects.length : 4;

    return (
        <>
            {
                Array.from({ length: projectsCardCount }).map((_, index) => (
                    <Card className='w-full sm:w-[21rem]' key={index}>
                        <CardHeader className='bg-header rounded-t-lg p-5'>
                            <CardTitle>
                                <Skeleton className='w-full h-[1rem]' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-1.5 p-5'>
                            <Skeleton className='w-1/2 h-[1rem]' />
                            <Skeleton className='w-1/2 h-[1rem]' />
                            <Skeleton className='w-1/2 h-[1rem]' />
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardContent>
                        <CardFooter className='p-1.5 justify-center items-center rounded-b-lg border-t'>
                            <Skeleton className='h-[2rem] w-[2rem]' />
                        </CardFooter>
                    </Card>
                ))
            }
        </>
    )
}

export default ProjectsSkeletonCard