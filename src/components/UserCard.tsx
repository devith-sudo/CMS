import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  // Get the current year and calculate the academic year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based, 0 = January, 11 = December

  // If the current month is before August (0-6), use the previous year as the academic start
  const academicYearStart = currentMonth >= 7 ? currentYear : currentYear - 1;

  const academicYearString = `${academicYearStart}/${academicYearStart + 1}`;

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {academicYearString}
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
