export type RepoDetailTypes = {
      id: number;
      name: string;
      description: string;
      starsAmount: number;
      owner: {
            login: string;
            avatar_url: string;
      };
}