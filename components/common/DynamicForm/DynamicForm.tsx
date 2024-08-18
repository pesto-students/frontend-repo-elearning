import { Autocomplete, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface DynamicFormProps {
    formData: [
        {
            path: string, required: boolean, formControl: {
                name: string, type: string, data: [], maxLength: number, label: string
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
                <Stack>
                    {
                        formData.map(field => {
                            const { path, required, formControl } = field
                            const { name, type, data = [], maxLength, label } = formControl || {}
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
                                        data={data}
                                        key={formHook.key(path)}
                                        {...formHook.getInputProps(path)}
                                    />
                                default:
                                    break;
                            }
                        })
                    }
                </Stack>
                <Group mt={'md'}>
                    {formSubmitButtonJsx}
                </Group>

            </form>
        </div>
    );
};

export default DynamicForm;