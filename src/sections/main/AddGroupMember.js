import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { FetchFriends } from "../../redux/slices/app";
import axios from "../../utils/axios";
import { socket } from "../../socket";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const { friends } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.app);
  const { group_id } = useSelector((state) => state.conversation);
  const groups = useSelector((state) => state.conversation.groups);
  const currentGroup = groups.find((group) => group._id === group_id);
  const dispatch = useDispatch();
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    // members: Yup.array().min(0, "Must have at least 2 members"),
  });

  const defaultValues = {
    title: currentGroup.groupName,
    members: currentGroup.members, // Ensure members is initialized as an array
  };

  console.log(currentGroup, "inside Add group");

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(FetchFriends());
  }, [dispatch]);

  const selectedFriends = methods.watch("members") || [];

  // Filter out users who are already members of the group
  const unselectedFriends = friends.filter(
    (friend) => !currentGroup.members.some((member) => member.id === friend._id)
  );

  const onSubmit = async (data) => {
    try {
      const selectedMembers = data.members || []; // Ensure 'members' contains the selected members
      const newMemberId = selectedMembers[selectedMembers.length - 1]; // Retrieve the newly added member's ID

      if (!newMemberId) {
        console.error("No new member selected");
        return;
      }

      const response = await axios.post(`/user/groups/${group_id}/add-member`, {
        memberId: newMemberId,
      });

      console.log(response.data);

      // Perform any necessary actions after successfully adding the member
    } catch (error) {
      console.error("Error adding member:", error);
      // Handle errors
    }
  };

  //   const onSubmit = async (data) => {
  //     try {
  //       const response = await axios.post(`/user/groups/${group_id}/add-member`, {
  //         memberId: data.newMemberId,
  //       });

  //       console.log(response.data);

  //       // Perform any necessary actions after successfully adding the member
  //     } catch (error) {
  //       console.error("Error adding member:", error);
  //       // Handle errors
  //     }
  //   };

  //   const onSubmit = async (data) => {
  //     try {
  //       const response = await axios.post(`/user/groups/${group_id}/add-member`, {
  //         memberId: data.newMemberId, // Ensure data.newMemberId contains the new user's ID
  //       });

  //       console.log(response.data, "data response");

  //       // Perform any necessary actions after successfully adding the member
  //     } catch (error) {
  //       console.error("Error adding member:", error);
  //       // Handle errors
  //     }
  //   };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Title" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={unselectedFriends.map((friend) => ({
            id: friend._id,
            name: `${friend.firstName} ${friend.lastName}`,
          }))}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setValue("members", newValue)}
        />
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="end"
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Add
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
const AddGroupMembers = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Add New Member"}</DialogTitle>

      <DialogContent sx={{ mt: 4 }}>
        {/* Create Group Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupMembers;
