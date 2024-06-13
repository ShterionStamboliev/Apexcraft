import { Control } from 'react-hook-form';
import { User } from '../user-types/userTypes';

export type TableHeaderTypes = {
    id?: number;
    username: 'Потребител';
    name_and_family: 'Име, Фамилия';
    status: 'Статут';
}

export type UserTableFormFieldInputTypes = {
    control: Control<User>
}

export type FormInputType = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
}

export type TableFormSelectType = {
    name: string;
    label: string;
    placeholder: string;
}