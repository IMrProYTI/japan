import { RouteRecordName } from "vue-router";

function updateTitle(title: RouteRecordName | null | undefined) {
	const titleElement = document.getElementsByTagName('title')[0];
	if (title ?? false) {
		titleElement.textContent = String(title) + ` | Клуб Японской Культуры`;
	};
};

export default updateTitle;