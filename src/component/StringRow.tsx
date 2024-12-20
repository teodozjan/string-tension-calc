import {useMemo} from 'react';
import styled from 'styled-components';
import {IGuitar, IString} from '@/model/types';
import {useStore} from '@/model/useStore';
import * as c from '@/model/consts';
import Gauge from './Gauge';
import Note from './Note';

export default function StringRow(props: {
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}) {
	const unit = useStore(s => s.unit);
	const changeGauge = useStore(s => s.changeGauge);
	const changeNote = useStore(s => s.changeNote);

	const isModifGauge = useMemo(() => {
		const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
		return pack.gauges[props.strIndex] !== props.str.gauge;
	}, [props.guitar.packName, props.strIndex, props.str.gauge]);

	const isModifNote = useMemo(() => {
		const tuning = c.TUNINGS.find(t => t.name === props.guitar.tuningName)!;
		return tuning.notes[props.strIndex] !== props.str.note;
	}, [props.guitar.tuningName, props.strIndex, props.str.note]);

	const tensionStr = useMemo(() =>
		isNaN(props.str.tension) ? '–' : props.str.tension.toFixed(2),
	[props.str.tension]);

	return <>
		<DivElemName>{c.STRING_NAMES[props.strIndex]}</DivElemName>
		<DivElemModif isModif={isModifGauge}>
			<Gauge gauge={props.str.gauge}
				onChange={g => changeGauge(props.guitar, props.str, g)} />
		</DivElemModif>
		<DivElemModif isModif={isModifNote}>
			{!isNaN(props.str.tension) &&
				<Note strIndex={props.strIndex}
					note={props.str.note}
					onChange={n => changeNote(props.guitar, props.str, n)} />
			}
		</DivElemModif>
		<DivElem>
			<InputTension
				type='text'
				value={tensionStr}
				disabled /> {unit}
		</DivElem>
	</>;
}

const DivElem = styled.div`
	margin: 2px 3px;
`;
const DivElemName = styled(DivElem)`
	width: 26px;
`;
const DivElemModif = styled(DivElem)<{isModif: boolean}>`
	padding: 1px;
	border: 1px solid ${props => props.isModif ? '#f00' : '#fff'};
`;
const InputTension = styled.input`
	width: 3.5em;
	text-align: right;
`;
