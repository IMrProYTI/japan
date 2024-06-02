import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from './supabase';


import Admin from './views/Admin.vue';
import AdminTasks from './components/Admin/Tasks.vue';
import AdminJudge from './components/Admin/Judge.vue';
import AdminParticipant from './components/Admin/Participant.vue';

import ErrorPage from './views/ErrorPage.vue';

import Home from './views/Home.vue';

import Judge from './views/Judge.vue';

import Leaderboard from './views/Leaderboard.vue';

import Login from './views/Login.vue';

import Overlay from './views/Overlay.vue';


import updateTitle from './updateTitle';


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
		name: "Судейство",
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
		name: "Лидерборд",
		path: '/leaderboard',
		component: Leaderboard,
		meta: { requiresAuth: false }
	},
	{
		name: "Оверлэй",
		path: '/overlay',
		component: Overlay,
		meta: { requiresAuth: false }
	},
	{
	  name: 'Страница не найдена',
	  path: '/:catchAll(.*)',
	  component: ErrorPage,
		meta: { requiresAuth: false }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, _from) => {
	if (!DEBUG && to.meta.requiresAuth && !(await checkAuth())) {
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