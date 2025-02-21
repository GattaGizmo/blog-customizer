import { useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setAppState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setAppState }: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleFormChange =
		(option: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [option]: value }));
		};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(formState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: asideRef,
		onClose: toggleSidebar,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={asideRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFormChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name={formState.fontSizeOption.className}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFormChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFormChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleFormChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleFormChange('contentWidth')}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
