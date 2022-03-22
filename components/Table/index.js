import React from 'react';
import styled from 'styled-components';
import TableItem from './TableItem';

const Table = ({ tableTitle, tableItems }) => {
	return (
		<WorkspaceTable>
			<TableHeader>
				Workspaces for <strong>{tableTitle}</strong>
			</TableHeader>
			{tableItems &&
				tableItems.map((tableItem) => (
					<TableItem
						key={tableItem.id}
						name={tableItem.data().name}
						image={tableItem.data().name}
						members={tableItem.data().members.length}
						link={`client/${tableItem.id}/cyVesOzt1WunGIOSNO6Z`}
						id={tableItem.id}
						org={tableItem}
					/>
				))}
		</WorkspaceTable>
	);
};

export default Table;

const WorkspaceTable = styled.div`
	border: 1px solid #dddddd;
	border-radius: 4px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	margin-bottom: 32px;
`;

const TableHeader = styled.div`
	padding: 1rem;
	border-bottom: 1px solid #dddddd;
`;
