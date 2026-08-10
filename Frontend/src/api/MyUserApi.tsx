import { useAuth0 } from "@auth0/auth0-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export type User = {
//   _id: string;
//   auth0Id: string;
//   email: string;
//   name?: string;
//   addressLine1?: string;
//   city?: string;
//   country?: string;
// };

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// =========================
// CREATE USER
// =========================

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (
    user: CreateUserRequest
  ): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/user`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const text = await response.text();

    let data: any = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create user"
      );
    }

    return data;
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyUserRequest,

    onSuccess: () => {
      toast.success("User created successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

// =========================
// GET USER
// =========================

export const useGetMyUser = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const text = await response.text();

    let data: any = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get user"
      );
    }

    return data;
  };

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMyUserRequest,
    enabled: isAuthenticated,
  });

  return {
    currentUser,
    isLoading,
    isError,
  };
};

// =========================
// UPDATE USER
// =========================

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyUserRequest = async (
    user: UpdateMyUserRequest
  ): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    console.log("Updating user:", user);

    const response = await fetch(
      `${API_BASE_URL}/api/my/user`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const text = await response.text();

    let data: any = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }
    }

    if (!response.ok) {
      console.error("Update failed:", data);

      throw new Error(
        data.message || "Failed to update user"
      );
    }

    return data;
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateMyUserRequest,

    onSuccess: (updatedUser) => {
      // Update React Query cache immediately
      queryClient.setQueryData(
        ["currentUser"],
        updatedUser
      );

      toast.success("User Profile Updated!");
    },

    onError: (error) => {
      console.error("Update user error:", error);

      toast.error(
        error.message || "Failed to update user"
      );
    },
  });

  return {
    updateUser,
    isPending,
    isError,
    isSuccess,
  };
};