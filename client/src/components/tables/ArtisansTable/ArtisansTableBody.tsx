import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useEffect, } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import useArtisanEntityHandlers from '@/components/hooks/ArtisansHooks/useArtisansEntityHook';
import EditForm from '@/components/forms/artisans-form/ArtisanFormEdit/EditArtisan';
import { useCompany } from '@/context/Company/CompanyContext';
import { useUser } from '@/context/User/UserContext';

const ArtisansTableBody = ({ filteredData }: { filteredData: Artisan[] }) => {
    const { isLoading, getEntities, isEntityLoading } = useArtisan();
    const { getEntities: getCompanies } = useCompany();
    const { getEntities: getUsers } = useUser();

    const {
        selectedEntity: selectedArtisan,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess,
    } = useArtisanEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        getEntities();
        getCompanies();
        getUsers();
    }, [getEntities, isModified]);

    if (isLoading) {
        return <ActivitiesLoader />
    }

    return (
        <>
            <TableBody>
                {filteredData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={2} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredData.map((artisan, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {artisan.name}
                            </TableCell>
                            <TableCell className='text-start w-[200px]'>
                                {onDesktop ? (
                                    <DesktopViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        hoverLabel='artisan'
                                        id={artisan.id!}
                                    />
                                ) : (
                                    <MobileViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        id={artisan.id!}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    )
                    ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                    {!isEntityLoading && selectedArtisan && (
                        <EditForm
                            artisan={selectedArtisan}
                            onSuccess={() => {
                                handleCloseDialog();
                                handleSuccess();
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ArtisansTableBody