import styled from '@emotion/styled';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/useStore';
import Pack from './Pack';
import Scale from './Scale';
import StringRow from './StringRow';
import Summation from './Summation';
import Tuning from './Tuning';

export default function Guitar(props: {
	guitarIndex: number;
	guitar: IGuitar;
}) {
	const moveLeft = useStore(s => s.moveLeft);
	const remove = useStore(s => s.remove);
	const changeScale = useStore(s => s.changeScale);
	const changePack = useStore(s => s.changePack);
	const changeTuning = useStore(s => s.changeTuning);

	return <DivGtrBox colorIndex={props.guitarIndex % 7}>
		<DivTopRow>
			<DivTopRowName>Guitar #{props.guitarIndex + 1}</DivTopRowName>
			<DivTopRowBtns>
				{props.guitarIndex > 0 &&
					<button onClick={() => moveLeft(props.guitar)} title='Move left'>⇐</button>
				}
				<button onClick={() => remove(props.guitar)} title='Remove'>✕</button>
			</DivTopRowBtns>
		</DivTopRow>
		<div>
			<Scale scale={props.guitar.scale} onChange={s => changeScale(props.guitar, s)} />
		</div>
		<div>
			<Pack packName={props.guitar.packName} onChange={p => changePack(props.guitar, p)} />
		</div>
		<DivTuningSum>
			<Tuning tuningName={props.guitar.tuningName} onChange={t => changeTuning(props.guitar, t)} />
			<Summation guitar={props.guitar} />
		</DivTuningSum>
		<DivStringRow>
			{props.guitar.strings.map((str, strIdx) =>
				<StringRow key={str._id}
					strIndex={strIdx}
					str={str}
					guitar={props.guitar} />,
			)}
		</DivStringRow>
	</DivGtrBox>;
}

const DivGtrBox = styled.div<{colorIndex: number}>`
	padding: 2px 1px;
	border: 1px solid #ddd;
	border-top-width: 4px;
	border-top-color: ${props => [
		'#36a2eb',
		'#ff6384',
		'#ff9f40',
		'#ffcd56',
		'#4bc0c0',
		'#9966ff',
		'#c9cbcf',
	][props.colorIndex]};

	& > div {
		padding: 3px 6px;
	}
`;
const DivTopRow = styled.div`
	display: flex;
	gap: 6px;
	align-items: baseline;
	justify-content: space-between;
`;
const DivTopRowName = styled.div`
	font-size: 115%;
`;
const DivTopRowBtns = styled.div`
	display: flex;
	gap: 6px;
`;
const DivTuningSum = styled.div`
	display: flex;
	justify-content: space-between;
	padding-right: 9px;
`;
const DivStringRow = styled.div`
	display: grid;
	grid-template-columns: repeat(4, auto);
`;
