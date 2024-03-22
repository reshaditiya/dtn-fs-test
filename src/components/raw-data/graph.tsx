import { AreaChart } from '@mantine/charts';
import { data } from './data';
import { SWRResponse } from 'swr';
import { useContext, useMemo } from 'react';
import dayjs from 'dayjs';
import { GraphContext } from './card';

export function RawDataGraph() {
	const handlerGraph: SWRResponse = useContext(GraphContext);
	const formattedValue = useMemo(() => {
		if (data) {
			return handlerGraph?.data?.map(
				(val: { availDur: number; resultTime: string }) => ({
					...val,
					resultTime: dayjs(val.resultTime).format('DDMMM'),
				})
			);
		}
		return data;
	}, [handlerGraph?.data]);

	return (
		<AreaChart
			h={300}
			data={formattedValue}
			dataKey="resultTime"
			series={[{ name: 'availDur', color: 'blue.6', label: 'Avail Duration' }]}
			curveType="monotone"
			p={24}
			withDots={false}
		/>
	);
}
