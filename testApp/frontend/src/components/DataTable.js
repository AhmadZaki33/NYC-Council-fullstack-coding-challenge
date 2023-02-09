import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export function DataTable({ columns, rows, isTopComplaints }) {
  return (
    <div
      style={{
        width: isTopComplaints ? '30%' : '100%',
        backgroundColor: 'lightcyan',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        rowHeight={35}
      />
    </div>
  );
}
