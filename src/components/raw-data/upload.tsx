import { Box, Button, Center, Stack, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconFile, IconUpload, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useContext } from 'react';
import { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';
import { GraphContext } from './card';
import { notifications } from '@mantine/notifications';

export function RawDataUpload() {
	const graphHandler = useContext<SWRResponse>(GraphContext);

	// upload fetch
	const form = useForm({
		initialValues: {
			file: { name: '' },
		},
		validate: {
			file: (val) => (val.name ? null : 'Please select a file'),
		},
	});
	const { trigger, isMutating } = useSWRMutation(
		'raw-data',
		(key, { arg: triggerArgs }) =>
			axios
				.post(`${process.env.NEXT_PUBLIC_API}/${key}`, triggerArgs)
				.then((res) => res.data),
		{
			onSuccess: () => {
				graphHandler.mutate();
				notifications.show({
					title: 'Upload Success!',
					message: 'The graph has been updated',
				});
				form.reset();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: 'Something went wrong!',
					message: error?.response?.data?.message,
				});
			},
		}
	);

	return (
		<form
			onSubmit={form.onSubmit((values) => {
				const formData = new FormData();

				//typecasting to fix typescript error
				formData.append('file', values.file as unknown as Blob);
				trigger(formData as unknown as null);
			})}
		>
			<Stack>
				<Stack gap="xs">
					<Dropzone
						onDrop={(files) => form.setFieldValue('file', files[0])}
						accept={[MIME_TYPES.csv]}
						h={214}
						maxFiles={1}
						{...form.getInputProps('file')}
					>
						<Stack align="center" justify="center" h={190}>
							{form.values.file?.name ? (
								<>
									<IconFile size={32} />
									<Box w={300}>
										<Text truncate="end">{form.values.file?.name}</Text>
									</Box>
								</>
							) : (
								<>
									<Dropzone.Accept>
										<IconUpload
											size={32}
											style={{ color: 'var(--mantine-color-blue-6)' }}
										/>
									</Dropzone.Accept>
									<Dropzone.Reject>
										<IconX
											size={32}
											style={{ color: 'var(--mantine-color-red-6)' }}
										/>
									</Dropzone.Reject>
									<Dropzone.Idle>
										<IconUpload size={32} />
									</Dropzone.Idle>
									<Text>Drop your csv file here</Text>
								</>
							)}
						</Stack>
					</Dropzone>
					<Center>
						<Text c="red">{form.errors.file}</Text>
					</Center>
				</Stack>
				<Button type="submit" loading={graphHandler.isLoading || isMutating}>
					Upload
				</Button>
			</Stack>
		</form>
	);
}
