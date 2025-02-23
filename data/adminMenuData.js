module.exports = [
	{
		id: 1,
		name: 'Dashboard',
		icon: 'la-home',
		routePath: '/dashboard/admin',
		active: 'active',
	},
	{
		id: 2,
		name: 'Meeting Management',
		icon: 'la-video-camera',
		routePath: '/dashboard/admin/meeting-management',
		active: 'active',
	},

	{
		id: 2,
		name: 'My Profile',
		icon: 'la-user',
		active: '',
		routePath: '/dashboard/admin/my-profile',
	},

	{
		id: 3,
		name: 'All Jobs',
		icon: 'la-briefcase',
		routePath: '/dashboard/admin/all-jobs',
		active: 'active',
	},
	{
		id: 33,
		name: 'All Users',
		icon: 'la-user',
		routePath: '/dashboard/admin/all-users',
		active: '',
	},
	{
		id: 4,
		name: 'Change Password',
		icon: 'la-lock',
		routePath: '/dashboard/admin/change-password',
		active: '',
	},
	{
		id: 5,
		name: 'Feedback & Reviews',
		icon: 'la-star',
		routePath: '/dashboard/admin/feedback',
	},

	// {
	// 	id: 3,
	// 	name: 'Packages',
	// 	icon: 'la-box',

	// 	active: '',
	// 	Children: [
	// 		{
	// 			id: 1,
	// 			name: 'Package List',
	// 			icon: 'la-list-alt',
	// 			routePath: '/dashboard/admin/packages-list',
	// 			active: '',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Add Package',
	// 			icon: 'la-plus-circle',
	// 			routePath: '/dashboard/admin/add-package',
	// 			active: '',
	// 		},
	// 	],
	// },
];
