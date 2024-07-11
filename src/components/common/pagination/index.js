import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PaginationButtons = () => {
    return (
        <div className='flex justify-center'>
            <Stack spacing={2} sx={{ boxShadow: '2px 6px 8px -4px #ccc', padding: '5px 15px', borderRadius: '20px' }}>
                <Pagination count={5} showFirstButton showLastButton />
            </Stack>
        </div>
    );
}