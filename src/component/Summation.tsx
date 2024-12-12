import {useMemo} from 'react';
import styled from '@emotion/styled';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/useStore';

interface Props {
	guitar: IGuitar;
}

export default function Summation(props: Props) {
	const unit = useStore(s => s.unit);
	const sum = useMemo(() =>
		props.guitar.strings.reduce((accum, str) =>
			accum + (isNaN(str.tension) ? 0 : str.tension), 0),
	[props.guitar.strings]);

	return <div>
		∑ <InputTension
			type='text'
			value={sum.toFixed(2)}
			disabled /> {unit}
	</div>;
}

const InputTension = styled.input`
	width: 3.5em;
	text-align: right;
`;
