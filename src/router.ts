import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from './supabase';

import Home from './views/Home.vue';

import Admin from './views/Admin.vue';
import AdminTasks from './components/Admin/Tasks.vue';
import AdminJudge from './components/Admin/Judge.vue';
import AdminParticipant from './components/Admin/Participant.vue';

import Judge from './views/Judge.vue';

import Login from './views/Login.vue';

import Overlay from './views/Overlay.vue';
// import OverlayPlayer from './views/OverlayPlayer.vue';


const routes = [
	{
		path: '/',
		component: Home,
		meta: { requiresAuth: false }
	},
	{
		path: '/admin',
		component: Admin,
		meta: { requiresAuth: true },
		children: [
			{
				path: 'tasks',
				component: AdminTasks,
				meta: { requiresAuth: true }
			},
			{
				path: 'judge',
				component: AdminJudge,
				meta: { requiresAuth: true }
			},
			{
				path: 'participant',
				component: AdminParticipant,
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/judge',
		component: Judge,
		meta: { requiresAuth: false },
		children: [
			{
				path: ':player',
				component: Judge,
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/login',
		component: Login,
		meta: { requiresAuth: false }
	},
	{
		path: '/overlay',
		component: Overlay,
		meta: { requiresAuth: false },
		children: [
			{
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
	if (to.meta.requiresAuth && !(await checkAuth())) {
		return {
			path: '/login',
			query: { redirect: to.fullPath },
		}
	}
})

export default router;