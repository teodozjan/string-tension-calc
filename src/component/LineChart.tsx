import {useEffect, useMemo, useRef, useState} from 'react';
import {Chart, ChartData} from 'chart.js/auto';
import styled from 'styled-components';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/useStore';
import {countValidStrings} from '@/model/funcs';
import * as c from '@/model/consts';

export default function LineChart() {
	const guitars = useStore(s => s.guitars);
	const chartData = useChartData(guitars);
	const canvas = useRef<HTMLCanvasElement | null>(null);
	useChart(guitars, chartData, canvas.current);

	return <DivChart>
		<canvas ref={canvas} />
	</DivChart>;
}

function useChartData(guitars: IGuitar[]) {
	return useMemo(() => {
		const maxNumStrs = Math.max(...guitars.map(gtr => countValidStrings(gtr)));
		const labels = c.STRING_NAMES.slice(0, maxNumStrs).reverse();
		const datasets = guitars.map((gtr, gtrIdx) => ({
			label: 'Guitar #' + (gtrIdx + 1),
			data: gtr.strings.map(str => str.tension).slice(0, maxNumStrs).reverse(),
			tension: .1,
			pointRadius: 8,
			pointHoverRadius: 6,
		}));
		return {labels, datasets};
	}, [guitars]);
}

function useChart(
	guitars: IGuitar[],
	chartData: ChartData<'line', number[], string>,
	canvas: HTMLCanvasElement | null,
) {
	const [chart, setChart] = useState<Chart<'line', number[], string> | null>(null);

	useEffect(() => {
		if (canvas === null) {
			if (chart !== null) {
				chart.destroy();
				setChart(null);
			}
		} else {
			if (chart === null) {
				if (guitars.length > 0) {
					setChart(new Chart(canvas, {
						type: 'line',
						data: {
							labels: [],
							datasets: [],
						},
						options: {
							scales: {
								y: {
									min: 0,
								},
							},
						},
					}));
				}
			} else {
				if (guitars.length === 0) {
					chart.destroy();
					setChart(null);
				} else {
					chart.data = chartData;
					chart.update('none');
				}
			}
		}
	}, [canvas, guitars, chart, chartData]);
}

const DivChart = styled.div`
	max-width: 100vw;
	max-height: 240px;
`;
