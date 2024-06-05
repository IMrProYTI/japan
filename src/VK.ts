const VKScriptLink: string = "https://vk.com/js/api/openapi.js";

const VKScript = document.createElement('script');
VKScript.setAttribute('type', "text/javascript");
VKScript.setAttribute('src', VKScriptLink);

async function VKenable(): Promise<void> {
	const head = document.getElementsByTagName('head')[0];
	if (!checkVKScript(head)) head.append(VKScript);
	VKScript.addEventListener('load', () => { return; } );
};

function checkVKScript(head: HTMLHeadElement): boolean {
	for (let child of head.children) {
		if (child.getAttribute('src') === VKScriptLink) return true;
	};
	return false;
};

export default VKenable;