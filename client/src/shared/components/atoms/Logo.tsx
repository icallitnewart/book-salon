import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { ReactComponent as LogoSvg } from '@assets/svg/logo.svg';

function Logo(): JSX.Element {
	return (
		<div>
			<Link to={ROUTES.MAIN}>
				<LogoSvg />
			</Link>
		</div>
	);
}

export default Logo;
