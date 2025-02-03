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
		name: 'My Profile',
		icon: 'la-user',
		active: '',
		Children: [
			{
				id: 1,
				name: 'Edit Profile',
				icon: 'la-user-edit',
				routePath: '/dashboard/admin/my-profile',
				active: '',
			},

			{
				id: 2,
				name: 'Change Password',
				icon: 'la-lock',
				routePath: '/dashboard/admin/change-password',
				active: '',
			},
		],
	},

	{
		id: 3,
		name: 'Packages',
		icon: 'la-box',

		active: '',
		Children: [
			{
				id: 1,
				name: 'Package List',
				icon: 'la-list-alt',
				routePath: '/dashboard/admin/my-profile',
				active: '',
			},
			{
				id: 2,
				name: 'Add Package',
				icon: 'la-plus-circle',
				routePath: '/dashboard/admin/change-password',
				active: '',
			},
		],
	},
];
