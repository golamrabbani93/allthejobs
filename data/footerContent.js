module.exports = [
	{
		id: 1,
		title: 'For Job Seekers',
		menuList: [
			{name: 'Browse Jobs', route: '/jobs'},
			{name: 'Talent Dashboard', route: '/dashboard/talent'},
			{name: 'Job Alerts', route: '/dashboard/talent'},
			,
			{
				name: 'My Bookmarks',
				route: '/dashboard/talent',
			},
		],
	},
	{
		id: 2,
		title: 'For Employers',
		menuList: [
			{
				name: 'Browse Talents',
				route: '/talents',
			},
			{name: 'Employer Dashboard', route: '/dashboard/employer'},
			{name: 'Post Job', route: '/dashboard/employer'},
			{name: 'Manage Jobs', route: '/dashboard/employer'},
		],
	},
	{
		id: 3,
		title: 'Pages',
		menuList: [
			{name: 'Home', route: '/'},
			{name: 'Jobs', route: '/jobs'},
			{name: 'Talent', route: '/talents'},
			{name: 'Consultants', route: '/consultants'},
		],
	},
	{
		id: 4,
		title: 'Helpful Resources',
		menuList: [
			{name: 'Site Map', route: '/'},
			{name: 'Terms of Use', route: '/terms'},
			{name: 'Privacy Center', route: '/'},
			{name: 'Security Center', route: '/'},
			{name: 'Accessibility Center', route: '/'},
		],
	},
];
