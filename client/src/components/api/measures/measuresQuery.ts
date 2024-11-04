import useToastHook from '@/components/hooks/custom-hooks/useToastHook'
import { MeasureSchema } from '@/components/models/measure/newMeasureSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMeasuresApi from './measuresApi';
import React from 'react';


type DialogStateAction = {
    measureId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMeasuresQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();
    
    const { createMeasure, editMeasure } = useMeasuresApi();
    


    const useCreateMeasure = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (measureData: MeasureSchema) => createMeasure(measureData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['measures']
                });
                fireSuccessToast('Measure created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditMeasure = ({ setIsOpen, measureId }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (measureData: MeasureSchema) => editMeasure(measureId!, measureData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['measures']
                });
                fireSuccessToast('Measure updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    return {
        useCreateMeasure,
        useEditMeasure,
    }
};

export default useMeasuresQuery;