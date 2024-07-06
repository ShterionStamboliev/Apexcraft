import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMeasure } from '@/context/Measure/MeasureContext';
import useMeasureEntityHandlers from '@/components/hooks/MeasuresHooks/useMeasuresEntityHook';
import { useEffect } from 'react';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import EditForm from '@/components/forms/measures-form/MeasureFormEdit/EditMeasure';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';

const MeasuresTableBody = () => {
    const { state, getMeasures, isLoading, isMeasureLoading } = useMeasure();
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
        getMeasures();
    }, [getMeasures, isModified]);

    if (isLoading) {
        return <TableLoadingPage />
    };

    return (
        <>
            <TableBody>
                {state.measure.map((measure, index) => (
                    <TableRow key={index}>
                        <TableCell className='text-right'>
                            {measure.name}
                        </TableCell>
                        <TableCell className='text-center'>
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    id={measure.id}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    id={measure.id}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                    {!isMeasureLoading && selectedMeasure && (
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