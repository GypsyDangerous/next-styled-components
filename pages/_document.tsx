import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content="#17181b" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	const styledComponentSheet = new StyledComponentSheets();
	const originalRenderPage = ctx.renderPage;
	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => styledComponentSheet.collectStyles(<App {...props} />),
			});
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: [
				<React.Fragment key="styles">
					{initialProps.styles}
					{styledComponentSheet.getStyleElement()}
				</React.Fragment>,
			],
		};
	} finally {
		styledComponentSheet.seal();
	}
};
