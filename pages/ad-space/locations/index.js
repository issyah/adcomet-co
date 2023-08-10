/**
 * The main page to manage ad locations for ad space owners 
**/
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Box, Button, Typography } from "@mui/material";
import { getLocationsByCompany } from "@/src/firebase-func";
import { useEffect, useState } from "react";
import { useContextProvider } from "@/context/ContextProvider";
import Link from "next/link";



export default function Location() {
    const [locations, setLocations] = useState([]);
    const { company, loading, setLoading } = useContextProvider();
    useEffect(() => {
        console.log(company);
    }, [company])

    return (
        <Box>
            <Typography variant='h3' fontWeight={900}>Ad Space Locations</Typography>
            <Typography gutterBottom>Manage and add new ad location.</Typography>
            <Button variant='contained' component={Link} href='/ad-space/locations/create'>Add Ad Space</Button>
        </Box>
    )
}


Location.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>