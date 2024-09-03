import restClient from "@/app/api/restClient";
import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";

interface ApiDetails {
    onMount: boolean;
    endpoint: string;
    body: Record<string, unknown>;
    resultKey: string;
}

interface DynamicMultiSelectProps {
    apiDetails: ApiDetails;
    onSelect: (value: Array<Record<string, string>>) => void;
    label: string;
    values: Array<Record<string, string>>;
    isEdit: boolean;
}

const DynamicMultiSelect: React.FC<DynamicMultiSelectProps> = ({ apiDetails, onSelect, label, values, isEdit }) => {
    const [options, setOptions] = useState<Array<Record<string, string>>>([]);

    useEffect(() => {
        if (apiDetails.onMount) {
            getOptions();
        }
    }, [apiDetails.onMount]);

    const getOptions = async (keyword?: string) => {
        try {
            const { data } = await restClient.post(
                apiDetails.endpoint,
                apiDetails.onMount ? {} : { ...apiDetails.body, keyword: keyword }
            );
            if (data.length) {
                setOptions(data);
            }
        } catch (error) {
            console.error('Error fetching options:', error);
            return [];
        }
    };

    return (
        <MultiSelect
            label={label}
            placeholder="Pick value"
            data={options.map(item => (item[apiDetails.resultKey] || item.name))}
            defaultValue={isEdit ? values.map(item => (item[apiDetails.resultKey] || item.name)) : []}
            clearable
            searchable
            onSearchChange={(value) => {
                if (!apiDetails.onMount) {
                    getOptions(value);
                }
            }}
            onChange={(selectedValues) => {
                const selectedObjects = options.filter(option =>
                    selectedValues.includes(option[apiDetails.resultKey] || option.name)
                );
                onSelect(selectedObjects);
            }}
        />
    );
};

export default DynamicMultiSelect;