module.exports = [
	{
		id: 1,
		title: 'For Job Seekers',
		menuList: [
			{name: 'Browse Jobs', route: '#'},
			{name: 'Browse Categories', route: '#'},
			{name: 'Candidate Dashboard', route: '#'},
			{name: 'Job Alerts', route: '#'},
			,
			{
				name: 'My Bookmarks',
				route: '#',
			},
		],
	},
	{
		id: 2,
		title: 'For Employers',
		menuList: [
			{
				name: 'Browse Candidates',
				route: '/candidates-list-v1',
			},
			{name: 'Employer Dashboard', route: '#'},
			{name: 'Add Job', route: '#'},
			{name: 'Job Packages', route: '#'},
		],
	},
	{
		id: 3,
		title: 'About Us',
		menuList: [
			{name: 'About Us', route: '/about'},
			{name: 'Job Page Invoice', route: '#'},
			{name: 'Terms Page', route: '#'},
			{name: 'Blog', route: '#'},
			{name: 'Contact', route: '/contact'},
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
