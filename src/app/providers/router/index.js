import { 
    createRouter, 
    createWebHistory,
} from 'vue-router'
import { 
    ROUTE_NAMES, 
} from '@/shared/lib/constants'

const routeOptions = [
    {
        path: '/',
        name: ROUTE_NAMES.MAIN,
    },
    {
        path: '/films',
        name: ROUTE_NAMES.FILMS,
    },
    {
        path: '/serials',
        name: ROUTE_NAMES.SERIALS,
    },
    {
        path: '/:type/:id',
        name: ROUTE_NAMES.CONTENT_DETAILS,
        props: true,
    }
]

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
    ...routeOptions.map((route) => ({ 
        ...route, 
        component: async () => {
            let component = null

            try {
                component = await import(`@/pages/${route.name}Page/${route.name}Page.vue`)
            }catch(e) {
                console.error(e.message)
            }

            return component
        }
    })),
]

const router = createRouter({
    mode: 'history',
  	history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to) {
        return to.hash ? { el: to.hash } : { top: 0 }
    },
})

export default router
