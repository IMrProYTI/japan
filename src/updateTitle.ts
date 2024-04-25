import { RouteRecordName } from "vue-router";

function updateTitle(title: RouteRecordName | null | undefined) {
	const titleElement = document.getElementsByTagName('title')[0];
	if (title ?? false) {
		titleElement.textContent = `Клуб Японской Культуры | ` + String(title);
	};
};

export default updateTitle;