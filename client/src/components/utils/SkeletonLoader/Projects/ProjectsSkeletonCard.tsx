import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type ProjectTypeProps = {
    count: number;
}

const ProjectsSkeletonCard = ({ count }: ProjectTypeProps) => {

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Card className='w-[18rem]' key={index}>
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