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
				id: 2,
				name: 'Edit Profile',
				icon: 'la-user-edit',
				routePath: '/dashboard/admin/my-profile',
				active: '',
			},

			{
				id: 12,
				name: 'Change Password',
				icon: 'la-lock',
				routePath: '/dashboard/admin/change-password',
				active: '',
			},
		],
	},

	{
		id: 11,
		name: 'Packages',
		icon: 'la-box',
		routePath: '/dashboard/talent/packages',
		active: '',
	},
];
