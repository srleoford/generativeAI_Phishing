import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import { Flex } from '@/once-ui/components'
import classNames from 'classnames';
import { Source_Code_Pro } from 'next/font/google';
import { Jura, Crimson_Text } from 'next/font/google';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";

const primary = Jura({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap'
});

const secondary = Crimson_Text({
	weight: "700",
	variable: '--font-secondary',
	subsets: ['latin'],
	display: 'swap'
});

/** All three fonts must be defined. This is used when one isn't */
type FontConfig = {
    variable: string;
};

// const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<Flex
			as="html" lang="en"
			// fillHeight background="page"
			data-theme="light"
			data-brand="moss"
			data-accent="cyan"
			data-neutral="slate"
			data-border="conservative"
			data-solid="color"
			data-solid-style="plastic"
			data-surface="translucent"
			data-transition="all"
			className={classNames(
				primary.variable,
				secondary ? secondary.variable : '',
				tertiary ? tertiary.variable : '',
				code.variable,
				'root')}>
			<Flex
				as="body"
				fillWidth fillHeight margin="0" padding="0">
				<AppRouterCacheProvider>
					<Flex
						flex={1} direction="column">
						{children}
					</Flex>
				</AppRouterCacheProvider>
			</Flex>
		</Flex>
	);
}