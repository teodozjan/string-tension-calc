import * as c from '@/model/consts';
import {TTuningName} from '@/model/types';

const tuningsByKind: {kind: string; tuningNames: TTuningName[]}[] = [
	{kind: 'Standard', tuningNames: []},
	{kind: 'Drop', tuningNames: []},
];
c.TUNINGS.forEach(defTuning => {
	const kind = (defTuning.name.endsWith('standard')) ? 'Standard' : 'Drop';
	tuningsByKind.find(defTuning => kind === defTuning.kind)!
		.tuningNames.push(defTuning.name);
});

export default function Tuning(props: {
	tuningName: TTuningName;
	onChange(tuningName: TTuningName): void;
}) {
	return <select value={props.tuningName} onChange={e => props.onChange(e.target.value as TTuningName)}>
		{tuningsByKind.map(group =>
			<optgroup key={group.kind} label={group.kind}>
				{group.tuningNames.map(tuning =>
					<option key={tuning} value={tuning}>
						{tuning}
					</option>,
				)}
			</optgroup>,
		)}
	</select>;
}
