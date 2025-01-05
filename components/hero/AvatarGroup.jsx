import React from 'react';

const AvatarGroup = () => {
	const avatars = [
		{id: 1, src: '/images/avatar/avatar-2.png', alt: 'Person 1'},
		{id: 2, src: '/images/avatar/avatar-1.png', alt: 'Person 2'},
		{id: 3, src: '/images/avatar/avatar-4.png', alt: 'Person 3'},
		{id: 4, src: '/images/avatar/avatar-3.png', alt: 'Person 4'},
	];

	return (
		<div className="relative flex items-center justify-center">
			{avatars.map((avatar, index) => (
				<div
					key={avatar.id}
					className={`absolute w-10 h-10 rounded-full  border border-white overflow-hidden mt-3`}
					style={{left: `${index * 1.8}rem`, zIndex: avatars.length - index}}
				>
					<img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
				</div>
			))}
			{/* "+" Icon */}
			<div
				className="absolute w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full border border-white text-gray-700 font-bold mt-3"
				style={{left: `${avatars.length * 1.8}rem`}}
			>
				+
			</div>
		</div>
	);
};

export default AvatarGroup;
