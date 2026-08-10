import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import {
  useGetMyUser,
  useUpdateMyUser,
} from "@/api/MyUserApi";

export default function UserProfilePage() {
  const {
    currentUser,
    isLoading: isGetLoading,
    isError,
  } = useGetMyUser();

  const {
    updateUser,
    isPending: isUpdateLoading,
  } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}