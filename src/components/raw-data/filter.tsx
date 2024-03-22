import { Button, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

export function RawDataFilter({ setFilter }: { setFilter: Function }) {
	const form = useForm({
		initialValues: {
			enodebId: '',
			cellId: '',
			dateRange: [],
		},
	});

	return (
		<form onSubmit={form.onSubmit((values) => setFilter(values))}>
			<Stack>
				<TextInput label="Enodeb ID" {...form.getInputProps('enodebId')} />
				<TextInput label="Cell ID" {...form.getInputProps('cellId')} />
				<DatePickerInput
					type="range"
					label="Date Range"
					clearable
					{...form.getInputProps('dateRange')}
				/>
				<Button type="submit">Apply</Button>
			</Stack>
		</form>
	);
}
