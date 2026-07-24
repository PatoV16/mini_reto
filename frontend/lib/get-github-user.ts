import { GithubUserResponse } from '@/types/github-user';

export async function getGithubUser(
  username: string,
): Promise<GithubUserResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${username}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error(`Error consultando el perfil: ${res.status}`);
  }

  return res.json();
}