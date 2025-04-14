import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (fnCallback, options = {}) => {
  return useMutation({
    mutationFn: fnCallback,
    ...options, //truyền các giá trị khác nếu cần
  });
};
