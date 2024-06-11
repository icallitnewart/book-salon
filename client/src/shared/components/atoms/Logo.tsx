import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../../assets/svg/logo.svg';

function Logo(): JSX.Element {
	return (
		<Link to="/">
			<LogoSvg />
		</Link>
	);
}

export default Logo;
