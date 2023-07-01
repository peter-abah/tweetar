import { InfiniteData } from "react-query";
import { ListResponse } from "../api";

export const concatInfiniteQueryData = <T>(
  data: InfiniteData<ListResponse<T>>
) => {
  return data.pages.reduce((total: T[], group) => total.concat(group.list), []);
};

export const transformData = <T>(data: ListResponse<T>, fields: string[]) => {
  const list = data.list.map((e: any) => {
    return fields.reduce((res: any, field) => ({ ...res, ...e[field] }), {});
  });

  return { ...data, list } as ListResponse<any>;
};

export const findIndices = <T>(dataList: ListResponse<T>[], data: any) => {
  return dataList.reduce(
    (res, page, pageIndex) => {
      const index = page.list.findIndex((e: any) => {
        const idKey = e.data_id ? "data_id" : "id";
        return e[idKey] === data[idKey];
      });
      if (index < 0) return res;
      return { pageIndex, index };
    },
    { pageIndex: -1, index: -1 }
  );
};

export const getUpdatedData = <T>(
  dataList: InfiniteData<ListResponse<T>>,
  data: T
) => {
  const { pageIndex, index } = findIndices(dataList.pages, data);
  if (pageIndex < 0) return dataList;

  const list = [...dataList.pages[pageIndex].list];
  list.splice(index, 1, data);

  const page = { ...dataList.pages[pageIndex], list };
  const pages = [...dataList.pages];
  pages.splice(pageIndex, 1, page);

  return { ...dataList, pages };
};

export const urlToFile = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], 'image', { type: blob.type });
};
