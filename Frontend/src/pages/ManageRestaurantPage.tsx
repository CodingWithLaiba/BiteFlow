import { useCreateMyRestaurant } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm'

export default function ManageRestaurantPage() {
    const {createRestaurant, isPending} = useCreateMyRestaurant()
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isPending} />
  )
}
