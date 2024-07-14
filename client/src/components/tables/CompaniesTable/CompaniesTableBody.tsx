import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import EditForm from '@/components/forms/companies-form/CompanyFormEdit/EditCompany';
import useCompanyEntityHandlers from '@/components/hooks/CompaniesHooks/useCompaniesEntityHook';
import { DialogContent } from '@/components/ui/dialog';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';
import { useCompany } from '@/context/Companies/CompanyContext'
import { Company } from '@/types/company-types/companyTypes';
import { Dialog } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface CompaniesTableProps {
    filteredData: Company[];
}

const CompaniesTableBody = ({ filteredData }: CompaniesTableProps) => {
    const { getCompanies, isLoading, isCompanyLoading } = useCompany();
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
        getCompanies();
    }, [getCompanies, isModified]);

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
                                {company.company_name}
                            </TableCell>
                            <TableCell>
                                {company.company_number}
                            </TableCell>
                            <TableCell>
                                {company.company_mol}
                            </TableCell>
                            <TableCell className="text-start w-[200px]">
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
                    {!isCompanyLoading && selectedCompany && (
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