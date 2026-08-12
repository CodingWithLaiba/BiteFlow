import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isPending}
    />
  );
}
