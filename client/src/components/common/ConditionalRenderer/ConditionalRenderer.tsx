import { LucideProps } from 'lucide-react';
import NoResultsFound from '../FormMessages/NoResultsFound';

type NoResultsFoundProps = {
    title: string;
    description: string;
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ConditionalRendererProps<T> {
    data: T[];
    renderData: (data: T[]) => React.ReactNode;
    noResults: NoResultsFoundProps;
    wrapper?: (content: React.ReactNode) => React.ReactNode;
}

const ConditionalRenderer = <T,>({
    data,
    noResults: { title, description, Icon },
    renderData,
    wrapper
}: ConditionalRendererProps<T>) => {
    const noResultsContent = (
        <NoResultsFound
            title={title}
            description={description}
            Icon={Icon}
        />
    );

    const wrapperContent = wrapper ? wrapper(noResultsContent) : noResultsContent;

    return data.length === 0 ? wrapperContent : renderData(data);
}

export default ConditionalRenderer