import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from './supabase';

import updateTitle from './updateTitle';

import Home from './views/Home.vue';

import Admin from './views/Admin.vue';
import AdminTasks from './components/Admin/Tasks.vue';
import AdminJudge from './components/Admin/Judge.vue';
import AdminParticipant from './components/Admin/Participant.vue';

import Judge from './views/Judge.vue';

import Login from './views/Login.vue';

import Overlay from './views/Overlay.vue';
// import OverlayPlayer from './views/OverlayPlayer.vue';

const DEBUG: boolean = false;

const routes = [
	{
		name: "Главная",
		path: '/',
		component: Home,
		meta: { requiresAuth: false }
	},
	{
		name: "Админ Панель",
		path: '/admin',
		component: Admin,
		meta: { requiresAuth: true },
		children: [
			{
				name: "Задания",
				path: 'tasks',
				component: AdminTasks,
				meta: { requiresAuth: true }
			},
			{
				name: "Судьи",
				path: 'judge',
				component: AdminJudge,
				meta: { requiresAuth: true }
			},
			{
				name: "Участники",
				path: 'participant',
				component: AdminParticipant,
				meta: { requiresAuth: true }
			}
		]
	},
	{
		name: "Участники",
		path: '/judge',
		component: Judge,
		meta: { requiresAuth: false },
		children: [
			{
				name: "Судейство участника",
				path: ':player',
				component: Judge,
				meta: { requiresAuth: false }
			}
		]
	},
	{
		name: "Авторизация",
		path: '/login',
		component: Login,
		meta: { requiresAuth: false }
	},
	{
		name: "Оверлэй",
		path: '/overlay',
		component: Overlay,
		meta: { requiresAuth: false },
		children: [
			{
				name: "Оверлэй участника",
				path: ':player',
				component: Overlay,
				meta: { requiresAuth: false }
			}
		]
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, _from) => {
	if (to.meta.requiresAuth && !(await checkAuth()) && !DEBUG) {
		return {
			path: '/login',
			query: { redirect: to.fullPath },
		}
	}
});

router.afterEach((to, _from) => {
	updateTitle(to.name);
});

export default router;