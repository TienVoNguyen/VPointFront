import Vue from "vue";
import Router from "vue-router";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import UserLayout from "@/components/user/layout/UserLayout";
import AddMark from "@/components/admin/Add";
import UserManager from "@/components/admin/UserManager";
import ImportExcel from "@/components/admin/ImportExcel";
import departmentManager from "@/components/admin/department-manager";
// import ScoringRules from "@/components/admin/ScoringRules";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [

        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import("@/components/auth/Login"),
        },
        {
            path: '/access',
            component: () => import("@/components/auth/AccessRights"),
        },
        {
            path: '/locked',
            component: () => import("@/components/auth/Locked"),
        },
        {
            path: '/admin',
            redirect: 'admin/home',
            component: AdminLayout,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import("@/components/admin/layout/HomeComponent"),
                },
                {
                    path: 'v-point-manager',
                    name: 'VPointManager',
                    component: () => import("@/components/admin/VPointManager"),
                },
                {
                    path: 'detail/:idUser/:year',
                    name: 'detail',
                    component: () => import("@/components/admin/Detail"),
                },
                {
                    path: 'AdminSeeDetailVPoint/:year/:month/:idUser',
                    name: 'DetailPoint',
                    component: () => import("@/components/admin/DetailPoint"),
                },
                {
                    path: 'user-manager',
                    name: 'UserManager',
                    component: UserManager
                },
                {
                    path: 'scoring-rules',
                    name: 'ScoringRules',
                    component: () => import("@/components/admin/ScoringRules")
                },

                {
                    path: 'department-manager',
                    name: 'DepartmentManager',
                    component: departmentManager
                },
                {
                    path: 'mark/:id',
                    name: 'addMark',
                    component: AddMark
                },
                {
                    path: 'addstaff',
                    name: 'addStaff',
                    component: () => import("@/components/admin/AddStaff")
                },
                {
                    path: 'myvpoint',
                    alias: 'my-v-point',
                    name: 'MyVPoint',
                    component: () => import("@/components/admin/HomeAdmin")
                },
                {
                    path: 'import',
                    alias: 'import-v-point-from-excel',
                    name: 'ImportFileExcel',
                    component: ImportExcel
                },
                {
                    path: 'export',
                    alias: 'export-v-point-to-excel',
                    name: 'ExportFileExcel',
                    component: () => import("@/components/admin/ExportExcel")
                }
            ]
        },
        {
            path: '/user',
            redirect: 'user/home',
            component: UserLayout,
            children: [
                {
                    path: 'home',
                    name: 'UserHome',
                    component: () => import("@/components/user/Home")
                },
                {
                    path: 'api/mark/:year/:month',
                    name: 'UserDetailPoint',
                    component: () => import("@/components/user/DetailPoint"),
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    const user = JSON.parse(loggedIn)

    // if (!loggedIn && user === 'User has locked'){
    //     next('/access');
    // }
     if (authRequired && !loggedIn) {
        next('/login');
    } else {
        if (to.path.startsWith('/admin')) {
            if (user !== null && user.roles[0].authority === 'ROLE_ADMIN' && user.status === true) {
                next();
            } else {
                next('/access');
            }
        } else {
            next()
        }
    }

});
export default router
