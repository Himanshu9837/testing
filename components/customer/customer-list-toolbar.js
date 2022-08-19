import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Customers
      </Typography>
      <Box sx={{ m: 1 }}>
        <Link href="/E4gadmin/create-customer" passHref={true}>
          <button className="savedetails">Add Customer</button>
        </Link>
      </Box>
    </Box>
  </Box>
);
