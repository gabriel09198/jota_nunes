import React from "react";
import Link from "next/link";

interface CardProps {
  name: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ name, link }) => {
  const lines = name.split("\n");

  return (
    <Link href={"engenheiro/stepTwo"}>
      <div className="bg-white p-6 h-40 flex flex-col items-center justify-center text-center rounded-xl shadow-md transform transition-transform hover:scale-105 hover:bg-gray-50 cursor-pointer">
        <h3 className="text-lg font-medium text-gray-800">
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
