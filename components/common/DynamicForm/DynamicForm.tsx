import { Autocomplete, Group, ScrollArea, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import DynamicAutocomplete from './DynamicAutoComplete';

interface DynamicFormProps {
    formData: [
        {
            path: string, required: boolean, formControl: {
                name: string, type: string, data: [], maxLength: number, label: string, options: [], apiDetails: {}
            }
        }
    ],
    formSubmit: () => void,
    formSubmitButtonJsx: any
}

const DynamicForm = (props: DynamicFormProps) => {
    const { formData, formSubmit, formSubmitButtonJsx } = props
    const formHook = useForm({ initialValues: {} })
    return (
        <div>
            <form onSubmit={formHook.onSubmit(formSubmit)}>
                <ScrollArea style={{ maxHeight: "60vh", paddingRight: '1rem' }} type='always' offsetScrollbars>
                    <Stack>
                        {
                            formData.map(field => {
                                const { path, required, formControl } = field
                                const { name, type, options = [], maxLength, label, apiDetails } = formControl || {}
                                switch (name) {
                                    case "input":
                                        return <TextInput
                                            label={label}
                                            type={type}
                                            required={required}
                                            maxLength={maxLength}
                                            key={formHook.key(path)}
                                            {...formHook.getInputProps(path)}
                                        />
                                    case "select":
                                        return <Autocomplete
                                            label={label}
                                            required={required}
                                            data={options}
                                            key={formHook.key(path)}
                                            {...formHook.getInputProps(path)}
                                        />
                                    case "autosuggest":
                                        return <DynamicAutocomplete
                                            label={label}
                                            apiDetails={apiDetails}
                                            onSelect={(item) => {
                                                formHook.setFieldValue(path, item)
                                            }}
                                        />
                                    default:
                                        break;
                                }
                            })
                        }
                    </Stack>
                </ScrollArea>
                <Group mt={'md'}>
                    {formSubmitButtonJsx}
                </Group>

            </form>
        </div>
    );
};

export default DynamicForm;