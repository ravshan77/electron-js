import * as React from 'react';
import { branchesApi } from '@/services/branches.service';
import { BranchType } from './types';

export default function Branches() {
  const [search, setSearch] = React.useState({ branch_name: "" });
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<BranchType[]>([]);

  React.useEffect(() => {
      const fetchData = async () => {
          const result = await branchesApi.getAll({ page, ...search });
          setData(result?.resoult ?? []);
      };
      fetchData();
  }, [search]);

  console.log(data);
  

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md rounded-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Color </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Category </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Price </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-100">
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-100">
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> White </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop PC </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $1999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-100">
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Black </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Black </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Accessories </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $99 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>     </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}


