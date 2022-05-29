import { Box, Stack, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

interface PaginationProps {
    rentalsPerPage: number,
    totalRentals: number,
    paginate: (pageNumber: number) => void
}

const PaginationRentals = ({ rentalsPerPage, totalRentals, paginate }: PaginationProps) => {
    const pageNumbers = [];

    const { pageNumber } = useParams();

    for (let i = 1; i <= Math.ceil(totalRentals / rentalsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box textAlign='center'>
            <Stack direction='row' spacing={0.1} justifyContent={"center"} marginBottom={10}>
                {pageNumbers.map((number: number) => (
                    !(totalRentals <= rentalsPerPage) &&
                    <Link to={`/rentals/page/${number}`} key={number} style={{ paddingRight: '0.5rem' }}>
                        <Button
                            color='warning'
                            size='small'
                            variant={(number === Number(pageNumber)) ? 'contained' : 'outlined'}
                            sx={{ maxWidth: '33px', maxHeight: '33px', minWidth: '33px', minHeight: '33px' }}
                            onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </Link>
                ))}
            </Stack >
        </Box >
    );
};

export default PaginationRentals;
