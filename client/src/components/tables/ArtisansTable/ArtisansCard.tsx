import EditArtisanForm from '@/components/forms/artisans-form/ArtisanFormEdit/EditArtisan';
import { TableCell, TableRow } from '@/components/ui/table';
import { Artisan } from '@/types/artisan-types/artisanTypes'

type ArtisansCardProps = {
    artisans: Artisan[];
}

const ArtisansCard = ({ artisans }: ArtisansCardProps) => {
    return (
        <>
            {
                artisans.map((artisan) => (
                    <TableRow key={artisan.id}>
                        <TableCell>
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