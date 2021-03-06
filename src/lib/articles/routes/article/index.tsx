import { readdirSync, readFileSync } from 'fs';
import path from "path";
import slugify from 'slugify';
import { articlesRelPath } from '../articles';

export * from "./article";

export const useArticleData = async (articleRelPath: string) => JSON.parse(readFileSync(path.resolve(process.cwd(), articleRelPath), { encoding: "utf-8" }));

export function getArticleMetaByName (name: string) {
  const fileName = `${name}.json`;
  const articleRelPath = `src/lib/articles/content/articles/${fileName}`;
  const articleAbsolutePath = path.resolve(process.cwd(), articlesRelPath);

  return {
    slug: name,
    fileName,
    articleRelPath,
    articleAbsolutePath
  }
}

export async function getAllArticlePaths() {
  const articlesDir = path.resolve(process.cwd(), "./src/lib/articles/content/articles")
  const fileNames = readdirSync(articlesDir);

  return fileNames.map(fileName => {
    const slug = slugify(
      fileName
        .replace(/\.json$/, '')
    );
    const articleRelPath = `src/lib/articles/content/articles/${fileName}`;
    const articleAbsolutePath = path.resolve(process.cwd(), articlesRelPath);
 
    return {
      slug,
      fileName,
      articleRelPath,
      articleAbsolutePath
    }
  });
}
