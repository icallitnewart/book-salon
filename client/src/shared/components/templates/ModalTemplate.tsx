import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { styled } from 'styled-components';

const Dialog = styled.dialog`
	max-width: 800px;
	min-width: 300px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	border: none;
	padding: 0;

	&::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}
`;

interface IModalTemplateProps {
	children: React.ReactNode;
	isOpen: boolean;
}

function ModalTemplate({ children, isOpen }: IModalTemplateProps): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (dialogRef.current) {
			if (isOpen) {
				dialogRef.current.showModal();
				document.body.style.overflow = 'hidden';
			} else {
				dialogRef.current.close();
			}
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return ReactDOM.createPortal(
		<Dialog ref={dialogRef}>{children}</Dialog>,
		document.body,
	);
}

export default ModalTemplate;
