export const home = {
	en: {
		hello: "Hello World",
		title: "Welcome to my blog",
		description: "A modern blog built with Astro and internationalization support",
		readMore: "Read more",
		latestPosts: "Latest Posts",
		language: "Language"
	},
	"zh-tw": {
		hello: "你好，世界",
		title: "歡迎來到我的部落格",
		description: "使用 Astro 和國際化支援建立的現代部落格",
		readMore: "閱讀更多",
		latestPosts: "最新文章",
		language: "語言"
	},
};

export const locales = {
	en: "English",
	"zh-tw": "繁體中文"
};

export function getHomeTranslations(locale: string) {
	return home[locale as keyof typeof home] || home.en;
}