import { CSSProperties, useState } from 'react';
import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppState={setAppState} />
			<Article />
		</main>
	);
};