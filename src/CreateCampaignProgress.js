/**
 * The breadcrumb progress indicator*/
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function CreateCampaignProgress(props) {
  const { list } = props;
  return (
    <Box sx={{ bgcolor: "white", px: 2, py: 2, borderRadius: 1 }}>
      <Breadcrumbs separator={<NavigateNextIcon />}>
        {list?.length &&
          list?.map((item, index) =>
            item?.type == "text" ? (
              <Typography {...item}>{item?.label}</Typography>
            ) : (
              <Link {...item}>{item?.label}</Link>
            )
          )}
      </Breadcrumbs>
    </Box>
  );
}
