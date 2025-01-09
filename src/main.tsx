import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './component/App.tsx';
import './global.css';

declare module 'valtio' { // https://github.com/pmndrs/valtio/issues/327#issuecomment-1035937848
	function useSnapshot<T extends object>(p: T): T;
}

createRoot(document.getElementById('app') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
