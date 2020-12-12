const cache = new Map();

const cachedGet = url => {
	if (cache.has(url)) {
		return cache.get(url);
	}
	return fetch(url)
		.then(res => res.json())
		.then(data => {
			cache.set(url, data);
			return cache.get(url);
		})
		.catch();
};

export const devto = {
	articles: () => cachedGet('https://dev.to/api/articles?username=lexswed&page=1')
};
