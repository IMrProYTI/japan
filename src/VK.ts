const VKScriptLink: string = "https://vk.com/js/api/openapi.js";

const VKScript = document.createElement('script');
VKScript.setAttribute('type', "text/javascript");
VKScript.setAttribute('src', VKScriptLink);

async function VKenable(): Promise<void> {
	const head = document.getElementsByTagName('head')[0];

	const promise: Promise<void> = new Promise((resolve) => {
		VKScript.addEventListener('loadeddata', () => { resolve() } );
	});

	if (!checkVKScript(head)) head.append(VKScript);
	
	return await promise;
};

function checkVKScript(head: HTMLHeadElement): boolean {
	for (let child of head.children) {
		if (child.getAttribute('src') === VKScriptLink) return true;
	};
	return false;
};

export default VKenable;