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

interface IModalLayoutTemplateProps {
	children: React.ReactNode;
	isOpen: boolean;
	closeModal: () => void;
}

function ModalLayoutTemplate({
	children,
	isOpen,
	closeModal,
}: IModalLayoutTemplateProps): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement>(null);

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		const dialogEl = dialogRef.current;

		if (dialogEl) {
			if (isOpen) {
				dialogEl.showModal();
				document.body.style.overflow = 'hidden';

				const handleBackdropClick = (e: MouseEvent) => {
					if (e.target === dialogEl) {
						closeModal();
					}
				};

				const handleEscapeKey = (e: KeyboardEvent) => {
					if (e.key === 'Escape') {
						closeModal();
					}
				};

				dialogEl.addEventListener('click', handleBackdropClick);
				document.addEventListener('keydown', handleEscapeKey);

				return () => {
					dialogEl.removeEventListener('click', handleBackdropClick);
					document.removeEventListener('keydown', handleEscapeKey);
					document.body.style.overflow = 'auto';
				};
				// eslint-disable-next-line no-else-return
			} else {
				dialogEl.close();
				document.body.style.overflow = 'auto';
			}
		}
	}, [isOpen, closeModal]);

	return ReactDOM.createPortal(
		<Dialog ref={dialogRef}>{children}</Dialog>,
		document.body,
	);
}

export default ModalLayoutTemplate;
