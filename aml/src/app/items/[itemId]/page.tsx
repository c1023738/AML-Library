// import { pageTitleStyles } from "@/styles";
// import { eq } from "drizzle-orm";
// import { items } from "@/db/schema";
// import Image from "next/image";
// export default async function ItemPage({
//   params: { itemId },
// }: {
//   params: { itemId: string };
// }) {
//   const item = await database?.query.items.findFirst({
//     where: eq(items.id, parseInt(itemId)),
//   });
//   if (!item) {
//     return (
//       <div>
//         <Image src="/empty.svg" width="200" height="200" alt="Package" />
//         <h1 className={pageTitleStyles}>Item not found</h1>
//       </div>
//     );
//   }

//   return (
//     <main>
//       <div className="container">
//         <h1 className={pageTitleStyles}>
//           <span className="font-normal">Reserve for</span> {item?.name}
//           {/* import image */}
//         </h1>
//         <span className="font-normal">Reserve for</span> {item?.name}
//       </div>
//     </main>
//   );
// }
