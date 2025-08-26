import * as React from 'react';
import { ClientsType } from './types';
import { clientsApi } from '@/services/clients.service';
import { inital_meta, Meta } from '@/types/type';

export default function Clients() {
  const [search, setSearch] = React.useState({ client_name: "" });
  const [page, setPage] = React.useState(1);
  const [meta, setMeta] = React.useState<Meta>(inital_meta);
  const [data, setData] = React.useState<ClientsType[]>([]);

  React.useEffect(() => {
      const fetchData = async () => {
          const result = await clientsApi.getAll({ page, ...search });
          setData(result?.resoult?.data ?? []);
          setMeta(result?.resoult?.meta ?? inital_meta);
      };
      fetchData();
  }, [search, page]);

  console.log(data);

  function onPaginate(newPage: number) {
      setPage(newPage);
  }

  return (
    <div className='p-2 border h-full'>
      <div className="relative h-[600px] overflow-x-auto shadow-md rounded-sm border dark:border-gray-500">
        <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 text-xs text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name  kfdjkjfdj</th>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Color </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Category </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Price </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
                <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(20)].map((_, i) => (
              <tr className="bg-white dark:bg-gray-800 hover:bg-lime-50 dark:hover:bg-gray-600 dark:text-gray-100" key={i}>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
                <td className="px-1.5 py-1.5 border dark:border-gray-400"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> </td>
              </tr>
              ))}
            </tbody>
        </table>
      </div>
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"> Jami: <span className="font-semibold text-gray-900 dark:text-white">{meta.total}</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {meta.links &&  meta.links.map((link, index) => {

              if (index === 0) {
                return <li> 
                  <button type='button' onClick={() => onPaginate(meta.current_page - 1)} disabled={meta.current_page === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> 
                    <span dangerouslySetInnerHTML={{ __html: "&laquo;" }} />  Ortga
                  </button> 
                </li>
              } else if(meta.links.length - 1 === index) {
                return <li> 
                  <button type='button' onClick={() => onPaginate(meta.current_page + 1)} disabled={meta.current_page === meta.last_page} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Keyingi <span dangerouslySetInnerHTML={{ __html: "&raquo;" }} />
                  </button> 
                </li>
              } else if (link.label === "...") {
                  return <li key={index}>
                    <button type='button' disabled className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      {link.label}
                  </button>
                  </li>;
              }

                return <li key={index}> 
                  <button type='button' onClick={() => onPaginate(Number(link?.label))} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${link.active ? 'bg-blue-500 text-gray-100 dark:bg-blue-500 dark:text-white' : '' }`} >
                    {link.label}
                  </button>
              </li>
              })
          } 
        </ul>
      </nav>
    </div>
  );
}






// (
//     <div className='p-2 border h-full'>
//       <div className="relative overflow-x-auto shadow-md rounded-sm border dark:border-gray-500">
//         <table className="w-full text-sm text-left">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Product name </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Color </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Category </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Price </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
//                 <th className="px-6 py-3 border dark:border-gray-400"> Action </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-100">
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Silver </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> Laptop </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> $2999 </td>
//                 <td className="px-1.5 py-1.5 border dark:border-gray-400"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> </td>
//               </tr>
              
//             </tbody>
//         </table>
//       </div>
//       <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
//         <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"> Jami: <span className="font-semibold text-gray-900 dark:text-white">{meta.total}</span></span>
//         <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
//             { meta.links.map((link, index) => {

//               if (index === 0) {
//                 return <li> 
//                   <button type='button' onClick={() => onPaginate(meta.current_page - 1)} disabled={meta.current_page === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> 
//                     <span dangerouslySetInnerHTML={{ __html: "&laquo;" }} />  Ortga
//                   </button> 
//                 </li>
//               } else if(meta.links.length - 1 === index) {
//                 return <li> 
//                   <button type='button' onClick={() => onPaginate(meta.current_page + 1)} disabled={meta.current_page === meta.last_page} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//                     Keyingi <span dangerouslySetInnerHTML={{ __html: "&raquo;" }} />
//                   </button> 
//                 </li>
//               } else if (link.label === "...") {
//                   return <li key={index}>
//                     <button type='button' disabled className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//                       {link.label}
//                   </button>
//                   </li>;
//               }

//                 return <li key={index}> 
//                   <button type='button' onClick={() => onPaginate(Number(link?.label))} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${link.active ? 'bg-blue-500 text-gray-100 dark:bg-blue-500 dark:text-white' : '' }`} >
//                     {link.label}
//                   </button>
//               </li>
//               })
//           } 
//         </ul>
//       </nav>
//     </div>
//   );