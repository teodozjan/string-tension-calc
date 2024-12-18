import {useEffect, useRef, useState} from 'react';
import {Chart} from 'chart.js/auto';
import styled from '@emotion/styled';
import {useStore} from '@/model/useStore';
import {countValidStrings} from '@/model/funcs';
import * as c from '@/model/consts';

export default function LineChart() {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	useChart(canvas.current);

	return <DivChart>
		<canvas ref={canvas} />
	</DivChart>;
}

function useChart(canvas: HTMLCanvasElement | null) {
	const unit = useStore(s => s.unit);
	const guitars = useStore(s => s.guitars);
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
					const maxNumStrs = Math.max(...guitars.map(gtr => countValidStrings(gtr)));
					chart.data.labels = c.STRING_NAMES.slice(0, maxNumStrs).reverse();
					chart.data.datasets = guitars.map((gtr, gtrIdx) => ({
						label: 'Guitar #' + (gtrIdx + 1),
						data: gtr.strings.map(str => str.tension).slice(0, maxNumStrs).reverse(),
						tension: .1,
						pointRadius: 8,
						pointHoverRadius: 6,
					}));
					chart.update('none');
				}
			}
		}
	}, [canvas, unit, guitars, chart]);
}

const DivChart = styled.div`
	max-width: 100vw;
	max-height: 240px;
`;
