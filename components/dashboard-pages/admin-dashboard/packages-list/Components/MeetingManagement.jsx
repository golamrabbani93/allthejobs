'use client';

import {useState, useMemo, useEffect} from 'react';
import SearchBar from './SearchBar';
import DataTable from './DataTable';
import RoleFilter from './RoleFilter';
import Pagination from './Pagination';
import Spinner from '@/components/Sppiner/Spinner';
import ItemPerPage from './ItemPerPage';
import StatusFilter from './StatusFilter';
import {useGetCallsAdmin} from '@/app/(others)/video-chat3/hooks/useGetCallsAdmin';

export default function MeetingManagement() {
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(15);
	const [meetingType, setMeetingType] = useState('previous');
	const {upcomingCalls, previousCalls, recordings, isLoading, meetingRequest, role} =
		useGetCallsAdmin();
	console.log(previousCalls);

	const filteredData = useMemo(() => {
		if (meetingType === 'upcoming') {
			// Object.values(item).slice(1,3).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
			return upcomingCalls;
		} else if (meetingType === 'previous') {
			// Object.values(item).slice(1,3).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
			// return previousCalls;
			if (previousCalls.length) {
				console.log('this is real deal', Object.values(previousCalls[0].state.custom).splice(1, 3));
			}
			return previousCalls.filter((item) =>
				Object.values(item.state.custom).some((value) =>
					value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
				),
			);
		}
		// return users.filter(
		//   (item) =>
		//     (roleFilter === "all" || item.role === roleFilter) && (statusFilter === "all" || item.account_status === statusFilter) &&
		//   // search by any property, commented it because some of the properties are null which creates problem when comparing
		//     // Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
		//     // search by first name,email items
		//     // Object.values(item).slice(1,3).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
		//     // only search by email
		//     // Object.values(item)[1].toString().toLowerCase().includes(searchTerm.toLowerCase()),
		// )
	}, [searchTerm, previousCalls, upcomingCalls, ITEMS_PER_PAGE]);

	const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [currentPage, filteredData]);

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleItemPerPageChange = (count) => {
		setITEMS_PER_PAGE(parseInt(count, 10));
	};

	const handleStatusFilter = (status) => {
		setMeetingType(status);
	};
	const handleEdit = (id, data) => {
		setEditingUser(data);
		setIsEditing(true);
	};

	const handleDelete = (id) => {
		// Implement delete functionality here
		const newData = users.filter((item) => item.id !== id);
		// Update users here (in a real app, you'd update the database)
		console.log(`Deleted item with id: ${id}`);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Meeting Management</h1>
			{!filteredData.length ? (
				<div className="widget-content h-96 flex justify-center items-center">
					<Spinner size="sm" />
				</div>
			) : (
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<div className="flex gap-2">
							<SearchBar onSearch={handleSearch} />
							{/* <Button className="bg-green-500 hover:bg-green-600" size="sm" onClick={()=>setCreatingUser(true)}>Add User</Button> */}
						</div>
						<div className="mx-2 flex gap-2">
							<ItemPerPage onFilterChange={handleItemPerPageChange}></ItemPerPage>
							<StatusFilter onFilterChange={handleStatusFilter}></StatusFilter>
						</div>
					</div>
					<DataTable data={paginatedData} meetingType={meetingType} />
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
