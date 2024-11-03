import EditArtisanForm from '@/components/forms/artisans-form/ArtisanFormEdit/EditArtisan';
import { TableCell, TableRow } from '@/components/ui/table';
import { PaginatedArtisans } from '@/types/artisan-types/artisanTypes'

type ArtisansCardProps = {
    artisans: PaginatedArtisans;
}

const ArtisansCard = ({ artisans }: ArtisansCardProps) => {
    return (
        <>
            {
                artisans.data.map((artisan) => (
                    <TableRow key={artisan.id}>
                        <TableCell className='font-semibold'>
                            {artisan.name}
                        </TableCell>
                        <TableCell className='text-end w-[200px]'>
                            <EditArtisanForm
                                artisan={artisan}
                                artisanId={artisan.id!}
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}

export default ArtisansCard