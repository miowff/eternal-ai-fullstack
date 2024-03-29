"use client";
import { Individual } from "@/models/individuals";
import "./IndividualCard.css";
import Image from "next/image";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
interface Props {
  individual: Individual;
}
export const IndividualCard = ({ individual }: Props) => {
  const { name, career, photoPath } = individual;
  const { isOpened: isNavOpen } = useIsPopUpOpen();
  return (
    <Link
      className="individual-card"
      href={`/chat?individual=${name}&portrait=${photoPath}&career=${career}`}
      tabIndex={isNavOpen ? -1 : 0}
    >
      <div
        className={`individual-portrait-container ${name.replace(
          /[.\s]/g,
          ""
        )}-bg `}
      >
        <Image
          className="individual-portrait"
          src={`/individuals/${photoPath}`}
          alt="portrait"
          width={269}
          height={279}
          priority={false}
        />
      </div>
      <div className="individual-card-info">
        <p className="individual-card-name">{name}</p>
        <p className="individual-card-career">{career}</p>
      </div>
    </Link>
  );
};
