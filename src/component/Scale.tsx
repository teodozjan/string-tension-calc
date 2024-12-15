import {ChangeEvent} from 'react';
import styled from '@emotion/styled';
import {IScale, TScaleLength, TScaleMode} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	scale: IScale;
	onChange(scale: IScale): void;
}

export default function Scale(props: Props) {
	const isMulti = props.scale.mode === 'multi';

	function onChangeMode(ev: ChangeEvent<HTMLSelectElement>): void {
		props.onChange({
			mode: ev.target.value as TScaleMode,
			lengthLo: props.scale.lengthLo,
			lengthHi: isMulti ? props.scale.lengthHi : props.scale.lengthLo,
		});
	}
	function onChangeLengthLo(ev: ChangeEvent<HTMLSelectElement>): void {
		const lengthLo = parseFloat(ev.target.value) as TScaleLength;
		props.onChange({
			mode: props.scale.mode,
			lengthLo,
			lengthHi: isMulti ? props.scale.lengthHi : lengthLo,
		});
	}
	function onChangeLengthHi(ev: ChangeEvent<HTMLSelectElement>): void {
		props.onChange({
			...props.scale,
			lengthHi: isMulti ? parseFloat(ev.target.value) as TScaleLength : props.scale.lengthLo,
		});
	}

	return <DivScaleRow>
		<select value={props.scale.mode} onChange={onChangeMode}>
			{c.SCALE_MODES.map(mode =>
				<option key={mode} value={mode}>
					{mode}
				</option>,
			)}
		</select>

		<select value={props.scale.lengthLo} onChange={onChangeLengthLo}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}&apos;&apos;
				</option>,
			)}
		</select>
		<DivHideable isMulti={isMulti}>(low)</DivHideable>

		<DivHideable isMulti={isMulti}>to</DivHideable>

		<SelectHideable isMulti={isMulti} value={props.scale.lengthHi} onChange={onChangeLengthHi}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}&apos;&apos;
				</option>,
			)}
		</SelectHideable>
		<DivHideable isMulti={isMulti}>(high)</DivHideable>
	</DivScaleRow>;
}

const DivScaleRow = styled.div`
	display: flex;
	gap: 6px;
	align-items: baseline;
`;
const DivHideable = styled.div<{isMulti: boolean}>`
	display: ${props => props.isMulti ? '' : 'none'};
`;
const SelectHideable = styled.select<{isMulti: boolean}>`
	display: ${props => props.isMulti ? '' : 'none'};
`;
