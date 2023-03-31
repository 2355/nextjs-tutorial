import { NextResponse } from 'next/server';

type QiitaArticle = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  body: string;
};

export async function GET(request: Request) {
  const apiRes = await fetch(
    'https://qiita.com/api/v2/items?page=1&per_page=20&query=user:2355',
  );

  if (!apiRes.ok) {
    throw new Error('Failed to call Qiita API');
  }

  const data = await apiRes.json();

  console.log('/articles OK');

  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  // console.log(JSON.stringify({ hoge: 'hoge', fuga: 'fuga' }));

  // return new Response(JSON.stringify({ hoge: 'hoge', fuga: 'fuga' }), {
  //   status: 200,
  // });
  return NextResponse.json(data);
  // return new Response(JSON.stringify(data), { status: 200 });
}
