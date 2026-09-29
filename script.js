// Each column in this object uses the same index to describe one article.
const articles = {
	keys: ["morning-rolls", "cookie-notes", "little-celebrations", "weekend-bread"],
	categories: ["From the oven", "Recipe notes", "Celebrations", "Slow mornings"],
	titles: [
		"A slower morning, a warmer roll",
		"The chocolate chip cookie we keep coming back to",
		"A small cake for a very good reason",
		"Weekend bread, without the rush"
	],
	dates: ["September 18, 2026", "September 12, 2026", "September 04, 2026", "August 28, 2026"],
	readingTimes: ["4 min read", "5 min read", "3 min read", "6 min read"],
	summaries: [
		"Soft centers, golden edges, and a little cardamom in the dough. These breakfast rolls are made for an unhurried cup of coffee and one more minute at the table.",
		"Crisp at the edges and soft in the middle, this is our dependable, share-with-a-friend cookie. A pinch of flaky salt makes every chocolatey bite sing.",
		"No grand occasion needed. This tender vanilla cake, finished with berries and a cloud of cream, makes an ordinary afternoon feel like something to celebrate.",
		"A simple loaf with a crackly crust and a soft, open crumb. Start it the night before, then let the oven do the lovely work in the morning."
	],
	images: [
		"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85",
		"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=85",
		"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=85",
		"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1400&q=85"
	],
	imageAlt: [
		"Freshly baked golden bread rolls",
		"Homemade chocolate chip cookies",
		"A decorated celebration cake",
		"A rustic loaf of freshly baked bread"
	]
};

const storyImage = document.querySelector("#story-image");
const storyCategory = document.querySelector("#story-category");
const storyDate = document.querySelector("#story-date");
const storyReadingTime = document.querySelector("#story-reading-time");
const storyTitle = document.querySelector("#story-title");
const storySummary = document.querySelector("#story-summary");
const slideDots = document.querySelector("#slide-dots");
const recentList = document.querySelector("#recent-list");
let currentArticleIndex = 0;

function showArticle(articleIndex) {
	currentArticleIndex = (articleIndex + articles.keys.length) % articles.keys.length;

	storyImage.src = articles.images[currentArticleIndex];
	storyImage.alt = articles.imageAlt[currentArticleIndex];
	storyCategory.textContent = articles.categories[currentArticleIndex];
	storyDate.textContent = articles.dates[currentArticleIndex];
	storyReadingTime.textContent = articles.readingTimes[currentArticleIndex];
	storyTitle.textContent = articles.titles[currentArticleIndex];
	storySummary.textContent = articles.summaries[currentArticleIndex];

	document.querySelectorAll(".dot-button").forEach((dot, index) => {
		dot.setAttribute("aria-current", String(index === currentArticleIndex));
	});

	document.querySelectorAll(".recent-item").forEach((item) => {
		const isCurrentArticle = item.dataset.articleKey === articles.keys[currentArticleIndex];
		item.setAttribute("aria-current", String(isCurrentArticle));
	});
}

function createArticleControls() {
	articles.keys.forEach((articleKey, index) => {
		const dot = document.createElement("button");
		dot.className = "dot-button";
		dot.type = "button";
		dot.setAttribute("aria-label", `Show article ${index + 1}: ${articles.titles[index]}`);
		dot.addEventListener("click", () => showArticle(index));
		slideDots.append(dot);

		const recentArticle = document.createElement("button");
		recentArticle.className = "recent-item";
		recentArticle.type = "button";
		recentArticle.dataset.articleKey = articleKey;
		recentArticle.innerHTML = `<img src="${articles.images[index]}" alt="" loading="lazy"><span>${articles.titles[index]}</span>`;
		recentArticle.addEventListener("click", () => showArticle(index));
		recentList.append(recentArticle);
	});
}

document.querySelector("#previous-story").addEventListener("click", () => {
	showArticle(currentArticleIndex - 1);
});

document.querySelector("#next-story").addEventListener("click", () => {
	showArticle(currentArticleIndex + 1);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
createArticleControls();
showArticle(currentArticleIndex);
