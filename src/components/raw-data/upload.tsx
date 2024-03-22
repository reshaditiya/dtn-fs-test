import { Button, Stack, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';

export function RawDataUpload(props: Partial<DropzoneProps>) {
	return (
		<Stack>
			<Dropzone
				onDrop={(files) => console.log('accepted files', files)}
				onReject={(files) => console.log('rejected files', files)}
				accept={[MIME_TYPES.csv]}
				h={214}
				{...props}
			>
				<Stack align="center" justify="center" h={190}>
					<IconUpload size={32} />
					<Text>Drop your csv file here</Text>
				</Stack>
			</Dropzone>
			<Button>Upload</Button>
		</Stack>
	);
}
