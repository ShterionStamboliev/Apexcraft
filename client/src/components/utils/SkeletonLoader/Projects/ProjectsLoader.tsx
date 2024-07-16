import { TableBody } from "../../../ui/table"
import ProjectsSkeleton from './ProjectsSkeleton'

const ProjectsLoader = () => {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <ProjectsSkeleton key={i} />
            ))}
        </TableBody>
    )
}

export default ProjectsLoader