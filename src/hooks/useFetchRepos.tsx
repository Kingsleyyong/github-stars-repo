// src/hooks/useFetchRepos.js
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { RepoDetailTypes } from '../types/commonTypes';

const CREATED_AFTER = '2024-07-15';

export const useFetchRepos = () => {
  const [repos, setRepos] = useState<RepoDetailTypes[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const didRunRef = useRef(false);

  const fetchRepos = async (pageNumber: number) => {
      setLoading(true);
      try {
            const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}?q=created:>${CREATED_AFTER}&sort=stars&order=desc&page=${pageNumber}`
            );
            const newRepos = response.data.items ;
            const formattedRepos = newRepos.map((repo: { id: number; name: string; description: string; stargazers_count: number; owner: { login: string; avatar_url: string; }; }) => ({
                  id: repo.id,
                  name: repo.name,
                  description: repo.description || 'No description available',
                  starsAmount: repo.stargazers_count,
                  owner: {
                        login: repo.owner.login,
                        avatar_url: repo.owner.avatar_url,
                  },
            })) as unknown as RepoDetailTypes[];

            setRepos((prev) => [...prev, ...formattedRepos]);
            setHasMore(newRepos.length > 0);
      } catch (err) {
            console.error('Error fetching repositories:', err);
      } finally {
            setLoading(false);
      }
      };

      useEffect(() => {
            if (didRunRef.current || page * 30 <= repos.length) return;

            fetchRepos(page);
                  didRunRef.current = true;

      }, [page, repos]);

      const loadMore = () => {
            setPage((prev) => prev + 1);
            didRunRef.current = false;
      }

      return { repos, loading, hasMore, loadMore, page, setPage };
};
