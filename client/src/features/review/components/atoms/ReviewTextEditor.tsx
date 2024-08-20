import React from 'react';
import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StyledQuill = styled(ReactQuill)`
	.ql-toolbar {
		background-color: #f9f8f7;
		border-radius: 5px 5px 0px 0px;
		border-color: #ddd;
		box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05);
	}

	.ql-container {
		border-radius: 0px 0px 5px 5px;
		border-color: #ddd;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);

		.ql-editor {
			height: 400px;

			font-family: var(--main-font-kor);
			font-size: 1.6rem;
			line-height: 1.7;
			color: #555;

			&::-webkit-scrollbar {
				width: 13px;
			}

			&::-webkit-scrollbar-track {
				background: transparent;
			}

			&::-webkit-scrollbar-thumb {
				background-color: #ddd;
				border-radius: 20px;
				border: 4px solid transparent;
				background-clip: content-box;
			}
		}
	}
`;

interface IReviewTextEditorProps {
	value: string;
	handleChange: (value: string) => void;
}

function ReviewTextEditor({
	value,
	handleChange,
}: IReviewTextEditorProps): JSX.Element {
	const modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
		],
	};

	const formats = [
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
	];

	return (
		<StyledQuill
			theme="snow"
			modules={modules}
			formats={formats}
			value={value}
			onChange={handleChange}
		/>
	);
}

export default ReviewTextEditor;
