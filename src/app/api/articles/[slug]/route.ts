type QiitaArticle = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  body: string;
};

export async function GET(
  request: Request,
  context: { params: { slug: string } },
) {
  console.log({ context });
  const slug = context.params.slug;

  const apiRes = await fetch(
    'https://qiita.com/api/v2/items?page=1&per_page=20&query=user:2355',
  );

  if (!apiRes.ok) {
    throw new Error('Failed to call Qiita API');
  }

  const data = (await apiRes.json()) as QiitaArticle[];

  const article = data.find((a) => a.id === slug);

  if (!article) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(JSON.stringify(article), { status: 200 });
}
