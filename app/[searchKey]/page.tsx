import getWikiResults from "@/lib/getWikiResults";
import Item from "./components/Item";
type Props = {
  params: {
    searchKey: string;
  };
};

export async function generateMetadata({ params: { searchKey } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchKey);
  const data = await wikiData;

  const displayTerm = searchKey.replaceAll("%20", " ");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    };
  }
  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
}
export default async function page({ params: { searchKey } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchKey);
  const data = await wikiData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => (
          <Item key={result.pageid} result={result} />
        ))
      ) : (
        <h2 className="p-2 text-xl">{searchKey} Not Found</h2>
      )}
    </main>
  );
  return content;
}
