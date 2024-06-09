"use client";

import React from "react";
import { blogsCard } from "@/constants";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const BlogDetail = ({ params }) => {
  const router = useRouter();
  const blog = blogsCard.find((blog) => blog.id.toString() === params.id);

  if (!blog) {
    return <div>Blog not Found</div>;
  }

  return (
    <main>
      <div className="flex gap-2 w-[90%] m-auto text-green-4 cursor-pointer" onClick={() => router.push('/blogs')}>
        <IoArrowBack size={25} />
        <p className="text-base font-medium underline underline-offset-2">
          Back
        </p>
      </div>
      <div className="w-[90%] m-auto mt-10 bg-gray-7 rounded-md h-auto p-6 flex  items-center justify-center flex-col gap-3">
        <h1 className="font-semibold text-lg ">{blog.title}</h1>
        <p className="text-base font-semibold">({blog.name},  {"    "}{blog.date})</p>
        <p className="font-medium text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officiis
          deleniti dignissimos illum quam rem consequuntur blanditiis quia nobis
          cum. Exercitationem commodi eius molestias corporis maxime inventore
          atque, accusantium adipisci veritatis nesciunt a earum? Dolores sit
          distinctio veritatis vel itaque ea laudantium reprehenderit porro,
          incidunt ipsa illum inventore. Enim, ullam aperiam! Blanditiis
          sapiente suscipit iure vitae voluptatum, molestias consectetur
          repellat doloribus assumenda earum exercitationem incidunt iste,
          itaque quisquam a soluta esse dignissimos rerum debitis temporibus
          molestiae tenetur. Aut fuga voluptas cupiditate mollitia laborum est
          obcaecati quam amet accusantium deleniti quidem, odio alias
          perferendis eveniet repellat exercitationem inventore. Culpa dicta
          unde asperiores in accusantium maiores deleniti, alias quisquam
          obcaecati delectus tenetur perferendis pariatur quod, veritatis id.
          Similique voluptates deleniti tenetur rerum impedit numquam sed,
          perferendis dolorem officiis dolor voluptatem quaerat dolore iste.
          Delectus non esse nihil earum natus inventore neque fugiat,
          dignissimos ipsam numquam eius temporibus nesciunt omnis quis dolorum
          dicta quas facilis. Hic consequuntur deleniti eius quibusdam minima
          itaque at voluptatibus vitae earum suscipit dolorem deserunt, porro
          quis, iste, asperiores corrupti illo nesciunt assumenda. Ducimus
          dignissimos deleniti aspernatur quo odio, quia fugiat similique error
          hic quidem facilis dolorem doloremque possimus, eveniet ipsa vitae a.
          Quos minus, repudiandae ab quisquam delectus, cupiditate, eligendi
          dignissimos adipisci harum maxime facilis voluptas nam praesentium
          vero impedit exercitationem consectetur unde aliquam aperiam excepturi
          sit neque! Voluptatibus labore repellat, consectetur neque tempora
          soluta, porro dolores ullam accusantium illum expedita laboriosam
          sequi iusto libero quaerat assumenda natus similique! Ipsam
          consectetur veniam cumque ea odio rerum labore in saepe repudiandae
          temporibus. Alias similique, quibusdam voluptatibus explicabo deserunt
          veniam ratione aperiam aliquid nemo sunt ea qui minus voluptatem
          sapiente nostrum omnis
        </p>
      </div>
    </main>
  );
};

export default BlogDetail;
