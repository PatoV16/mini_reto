export interface GithubUserResponse {
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitterUsername: string | null;
  githubUrl: string;
  createdAt: string;
}