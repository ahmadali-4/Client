import React from "react";

import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useDispatch } from "react-redux";

import { updateSidebarTypeAction } from "../../redux/slices/app";
import { faker } from "@faker-js/faker";
import { DocMessage, LinkMessage } from "../Conversation/MsgTypes";
import { Links, Shared_Docs } from "../../data";

const SharedMess = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(updateSidebarTypeAction("CONTACT"));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "320px", height: "100vh" }}>
      <Stack p={2} direction={"row"} alignItems={"center"}>
        <IconButton onClick={handleBack}>
          <CaretLeft />
        </IconButton>

        <Typography variant="title">Shared Message</Typography>
      </Stack>

      <Stack p={2} sx={{ width: "100%", ml: "10px" }} alignItems={"center"}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

        <Stack
          sx={{
            width: "100%",
            flexGrow: 1,
            position: "relative",
            // overflowY: "scroll",
          }}
        >
          {(() => {
            switch (value) {
              case 1:
                //links
                return Links.map((item, i) => (
                  <LinkMessage el={item} key={i} />
                ));

              case 2:
                //docs
                return Shared_Docs.map((item, i) => (
                  <DocMessage el={item} key={i} />
                ));
              default:
                return (
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((_, i) => {
                      return (
                        <Grid key={i} item xs={2} sm={4} md={4}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMess;
