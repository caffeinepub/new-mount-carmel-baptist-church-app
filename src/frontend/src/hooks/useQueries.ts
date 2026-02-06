import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MemberProfile, Livestream, LivestreamType } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<MemberProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (displayName: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.upsertMyProfile(displayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetLivestream(type: LivestreamType) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Livestream | null>({
    queryKey: ['livestream', type],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLivestream(type);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveLivestream() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, embedCode }: { type: LivestreamType; embedCode: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveLivestream(type, embedCode);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['livestream', variables.type] });
    },
  });
}
