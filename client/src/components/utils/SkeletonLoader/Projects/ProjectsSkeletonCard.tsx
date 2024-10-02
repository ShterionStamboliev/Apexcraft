import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Project } from '@/types/project-types/projectTypes'

type ProjectTypeProps = {
    data: Project[];
}

const ProjectsSkeletonCard = ({ data }: ProjectTypeProps) => {

    return (
        <>
            {data && data.map((project) => (
                <Card className='w-[300px]' key={project.id} >
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='w-full h-[1rem]' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-1.5'>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                        <CardDescription>
                            <Skeleton className='w-1/2 h-[1rem]' />
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Skeleton className='h-[2rem] w-[2rem]' />
                    </CardFooter>
                </Card>
            ))}
        </>
    )
}

export default ProjectsSkeletonCard