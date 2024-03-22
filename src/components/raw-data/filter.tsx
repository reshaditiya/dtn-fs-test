import { Button, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useContext } from 'react';
import { GraphContext } from './card';
import { SWRResponse } from 'swr';

export function RawDataFilter({ setFilter }: { setFilter: Function }) {
	const graphHandler = useContext<SWRResponse>(GraphContext);
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
				<Button type="submit" loading={graphHandler.isLoading}>
					Apply
				</Button>
			</Stack>
		</form>
	);
}
