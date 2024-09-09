import { TableBody } from "../../../ui/table"
import ProjectsSkeleton from './ProjectsSkeleton'

const ProjectsLoader = () => {
    return (
        <>
            {Array.from({ length: 7 }).map((_, i) => (
                <ProjectsSkeleton key={i} />
            ))}
        </>
    )
}

export default ProjectsLoader