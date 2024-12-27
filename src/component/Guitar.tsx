import {cn} from '@/model/funcs';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/useStore';
import Pack from './Pack';
import Scale from './Scale';
import StringRow from './StringRow';
import Summation from './Summation';
import Tuning from './Tuning';
import css from './Guitar.module.css';

export default function Guitar(props: {
	guitarIndex: number;
	guitar: IGuitar;
}) {
	const moveLeft = useStore(s => s.moveLeft);
	const remove = useStore(s => s.remove);
	const changeScale = useStore(s => s.changeScale);
	const changePack = useStore(s => s.changePack);
	const changeTuning = useStore(s => s.changeTuning);

	return <div className={cn(css.guitar, css['color' + (props.guitarIndex % 7)])}>
		<div className={css.topRow}>
			<div className={css.name}>Guitar #{props.guitarIndex + 1}</div>
			<div className={css.btns}>
				{props.guitarIndex > 0 &&
					<button onClick={() => moveLeft(props.guitar)} title='Move left'>⇐</button>
				}
				<button onClick={() => remove(props.guitar)} title='Remove'>✕</button>
			</div>
		</div>
		<div>
			<Scale scale={props.guitar.scale} onChange={s => changeScale(props.guitar, s)} />
		</div>
		<div>
			<Pack packName={props.guitar.packName} onChange={p => changePack(props.guitar, p)} />
		</div>
		<div className={css.tuningSumRow}>
			<Tuning tuningName={props.guitar.tuningName} onChange={t => changeTuning(props.guitar, t)} />
			<Summation guitar={props.guitar} />
		</div>
		<div className={css.stringRow}>
			{props.guitar.strings.map((str, strIdx) =>
				<StringRow key={str._id}
					strIndex={strIdx}
					str={str}
					guitar={props.guitar} />,
			)}
		</div>
	</div>;
}
