import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMeasure } from '@/context/Measure/MeasureContext';
import { useEffect } from 'react';
import EditForm from '@/components/forms/measures-form/MeasureFormEdit/EditMeasure';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { Measure } from '@/types/measure-types/measureTypes';
import MeasuresLoader from '@/components/utils/SkeletonLoader/Measures/MeasuresLoader';
import { useMeasureEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';

interface MeasuresTableProps {
    filteredData: Measure[]
}

const MeasuresTableBody = ({ filteredData }: MeasuresTableProps) => {
    const { getEntities, isLoading, isEntityLoading } = useMeasure();
    const {
        selectedEntity: selectedMeasure,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess,
    } = useMeasureEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        getEntities();
    }, [getEntities, isModified]);

    if (isLoading) {
        return <MeasuresLoader />
    };

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
                    filteredData.map((measure, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {measure.name}
                            </TableCell>
                            <TableCell className='text-start w-[200px]'>
                                {onDesktop ? (
                                    <DesktopViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        hoverLabel='measure'
                                        id={measure.id!}
                                    />
                                ) : (
                                    <MobileViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        id={measure.id!}
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
                    {!isEntityLoading && selectedMeasure && (
                        <EditForm
                            measure={selectedMeasure}
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

export default MeasuresTableBody