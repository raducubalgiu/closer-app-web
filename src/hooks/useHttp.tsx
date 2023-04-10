import axios from "axios";
import { useAuth } from "../../context/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

const BASE_ENDPOINT = `http://localhost:8000/api/v1`;

type PostProps = {
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  config?: {};
};

export function usePost<T>({
  uri,
  onSuccess,
  onError,
  config = {},
}: PostProps) {
  const { user } = useAuth();

  const mutations = useMutation(
    (body: T) =>
      axios.post(`${BASE_ENDPOINT}${uri}`, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError,
      ...config,
    }
  );

  return mutations;
}

type GetProps = {
  model: string;
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  enabled?: boolean;
  enableId?: string;
  others?: {};
};

export const useGet = ({
  model,
  uri,
  onSuccess,
  onError,
  enabled = true,
  enableId = "",
  others = {},
}: GetProps) => {
  const { user } = useAuth();

  const response = useQuery(
    [model, uri, enabled && enableId],
    async ({ signal }) => {
      return await axios.get(`${BASE_ENDPOINT}${uri}`, {
        signal,
        headers: { Authorization: `Bearer ${user?.token}` },
      });
    },
    {
      onSuccess,
      onError,
      enabled,
      ...others,
    }
  );

  return {
    ...response,
    data: response?.data?.data,
  };
};
