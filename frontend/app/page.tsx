import { getGithubUser } from '@/lib/get-github-user';

const GITHUB_USERNAME = 'PatoV16';

export default async function Home() {
  const user = await getGithubUser(GITHUB_USERNAME);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 shadow-xl overflow-hidden border border-gray-800">
        <div className="flex flex-col items-center px-6 py-8">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-28 h-28 rounded-full border-4 border-gray-800 shadow-md"
          />

          <h1 className="mt-4 text-2xl font-bold text-white">
            {user.name ?? user.username}
          </h1>
          <p className="text-gray-400">@{user.username}</p>

          {user.bio && (
            <p className="mt-3 text-center text-gray-300 text-sm">
              {user.bio}
            </p>
          )}

          <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
            <div className="bg-gray-800 rounded-lg py-3">
              <p className="text-xl font-semibold text-white">
                {user.publicRepos}
              </p>
              <p className="text-xs text-gray-400">Repos</p>
            </div>
            <div className="bg-gray-800 rounded-lg py-3">
              <p className="text-xl font-semibold text-white">
                {user.followers}
              </p>
              <p className="text-xs text-gray-400">Seguidores</p>
            </div>
            <div className="bg-gray-800 rounded-lg py-3">
              <p className="text-xl font-semibold text-white">
                {user.following}
              </p>
              <p className="text-xs text-gray-400">Siguiendo</p>
            </div>
          </div>

          <div className="mt-6 w-full space-y-2 text-sm text-gray-300">
            {user.location && <p>📍 {user.location}</p>}
            {user.company && <p>🏢 {user.company}</p>}
            {user.blog && (
              <p>
                🔗{' '}
                <a
                  href={
                    user.blog.startsWith('http')
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {user.blog}
                </a>
              </p>
            )}
            <p>
              📅 Se unió el{' '}
              {new Date(user.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <a
            href={user.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full text-center bg-white text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Ver perfil en GitHub
          </a>
        </div>
      </div>
    </main>
  );
}