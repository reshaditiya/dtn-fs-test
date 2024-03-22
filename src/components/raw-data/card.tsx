'use client';

import { Box, Card, Center, LoadingOverlay, Stack, Tabs } from '@mantine/core';
import { RawDataUpload } from './upload';
import { RawDataGraph } from './graph';
import { RawDataFilter } from './filter';
import useSWR from 'swr';
import axios from 'axios';
import { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const GraphContext = createContext<any>({});

function RawDataCard() {
	const [filter, setFilter] = useState({
		enodebId: '',
		cellId: '',
		dateRange: [],
	});
	const handlerGraph = useSWR(
		['raw-data', filter],
		(key) =>
			axios
				.get(`${process.env.NEXT_PUBLIC_API}/${key[0]}`, {
					params: {
						enodebId: filter.enodebId,
						cellId: filter.cellId,
						startDate: filter.dateRange[0]
							? dayjs(filter.dateRange[0]).toISOString()
							: undefined,
						endDate: filter.dateRange[1]
							? dayjs(filter.dateRange[1]).toISOString()
							: undefined,
					},
				})
				.then((res) => res.data),
		{ revalidateOnFocus: false, shouldRetryOnError: false }
	);

	return (
		<GraphContext.Provider value={handlerGraph}>
			<Box pos="relative">
				<LoadingOverlay
					visible={handlerGraph.isLoading}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<Card shadow="sm" padding="lg" radius="md" withBorder w={500}>
					<Stack>
						<Card.Section>
							<RawDataGraph />
						</Card.Section>

						<Tabs variant="default" defaultValue="upload">
							<Stack>
								<Center>
									<Tabs.List>
										<Tabs.Tab value="upload">Upload</Tabs.Tab>
										<Tabs.Tab value="filter">Filter</Tabs.Tab>
									</Tabs.List>
								</Center>

								<Tabs.Panel value="upload">
									<RawDataUpload />
								</Tabs.Panel>
								<Tabs.Panel value="filter">
									<RawDataFilter setFilter={setFilter} />
								</Tabs.Panel>
							</Stack>
						</Tabs>
					</Stack>
				</Card>
			</Box>
		</GraphContext.Provider>
	);
}

export default RawDataCard;
