const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称

    },
    {
        title: '模版项',
        key: '/templates',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '网关预览',
                key: '/category',
                icon: 'bars'
            },
            {
                title: '网关审核',
                key: '/gatewayAudit',
                icon: 'bank',
            },
            {
                title: '模版预览',
                key: '/template',
                icon: 'tool'
            },
           /* {
                title: '模版审核',
                key: '/adminAudit',
                icon: 'control',
            },*/
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'user',
        noAuthority: [ 'user'],
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'safety',
        noAuthority: [ 'user','admin','manager'],
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'area-chart',
        noAuthority: [ 'user','admin','manager'],
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'pie-chart'
            },
        ]
    },
]
export default menuList
