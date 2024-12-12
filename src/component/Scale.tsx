import {ChangeEvent, useRef} from 'react';
import styled from '@emotion/styled';
import {IScale, TScaleLength, TScaleMode} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	scale: IScale;
	onChange(scale: IScale): void;
}

export default function Scale(props: Props) {
	const cmbMode = useRef<HTMLSelectElement| null>(null);
	const cmbLenLo = useRef<HTMLSelectElement| null>(null);
	const cmbLenHi = useRef<HTMLSelectElement| null>(null);
	const isMulti = props.scale.mode === 'multi';

	function change(_ev: ChangeEvent<HTMLSelectElement>): void {
		const mode = cmbMode.current!.value as TScaleMode;
		const lengthLo = parseFloat(cmbLenLo.current!.value) as TScaleLength;
		const lengthHi = (mode === 'normal')
			? lengthLo
			: parseFloat(cmbLenHi.current!.value) as TScaleLength;
		props.onChange({mode, lengthLo, lengthHi});
	}

	return <DivScaleRow>
		<select ref={cmbMode} value={props.scale.mode} onChange={change}>
			{c.SCALE_MODES.map(mode =>
				<option key={mode} value={mode}>
					{mode}
				</option>,
			)}
		</select>

		<select ref={cmbLenLo} value={props.scale.lengthLo} onChange={change}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}&apos;&apos;
				</option>,
			)}
		</select>
		<DivHideable isMulti={isMulti}>(low)</DivHideable>

		<DivHideable isMulti={isMulti}>to</DivHideable>

		<SelectHideable isMulti={isMulti}
			ref={cmbLenHi}
			value={props.scale.lengthHi}
			onChange={change}>
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
