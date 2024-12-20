import {AnimatePresence, HTMLMotionProps, motion} from 'framer-motion';
import styled from '@emotion/styled';
import {useStore} from '@/model/useStore';
import Guitar from './Guitar';

const animation: HTMLMotionProps<'div'> = {
	initial: {scale: 0},
	animate: {scale: 1},
	exit: {scale: 0},
	transition: {duration: .25},
};

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <AnimatePresence>
		{guitars.map((g, idx) =>
			<DivGtrBlock key={g._id} layout {...animation}>
				<Guitar guitarIndex={idx} guitar={g} />
			</DivGtrBlock>,
		)}
	</AnimatePresence>;
}

const DivGtrBlock = styled(motion.div)`
	display: inline-block;
	vertical-align: top;
	margin: 0 10px 10px 0;
`;
