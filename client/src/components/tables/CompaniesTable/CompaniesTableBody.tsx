import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import EditForm from '@/components/forms/companies-form/CompanyFormEdit/EditCompany';
import { useCompanyEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { DialogContent } from '@/components/ui/dialog';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';
import { useCompany } from '@/context/Company/CompanyContext'
import { Company } from '@/types/company-types/companyTypes';
import { Dialog } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const CompaniesTableBody = ({ filteredData }: { filteredData: Company[] }) => {
    const { state, getEntities, isLoading, isEntityLoading } = useCompany();
    const {
        selectedEntity: selectedCompany,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess
    } = useCompanyEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        if (!state.isDataFetched) {
            getEntities();
        }
    }, [state.isDataFetched, getEntities, isModified]);

    if (isLoading) {
        return <CompaniesLoader />
    }

    return (
        <>
            <TableBody>
                {filteredData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredData.map((company, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {company.name}
                            </TableCell>
                            <TableCell className='text-center'>
                                {company.number}
                            </TableCell>
                            <TableCell className='text-center'>
                                {company.mol}
                            </TableCell>
                            <TableCell className="text-end w-[200px]">
                                {onDesktop ? (
                                    <DesktopViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        hoverLabel='company'
                                        id={company.id!}
                                    />
                                ) : (
                                    <MobileViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        id={company.id!}
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
                    {!isEntityLoading && selectedCompany && (
                        <EditForm
                            company={selectedCompany}
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

export default CompaniesTableBody