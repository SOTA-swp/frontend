"use client";
import Image from "next/image";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import Popover from "@/components/popover/Popover";

type ImageSelectorProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  name: string;
  onSelect?: (src: string) => void;
};

const IMAGES = [
  "/img/image_selector/animal.jpeg",
  "/img/image_selector/apart.jpeg",
  "/img/image_selector/beach.jpeg",
  "/img/image_selector/bokujo.jpeg",
  "/img/image_selector/book.jpeg",
  "/img/image_selector/building.jpeg",
  "/img/image_selector/buss.jpeg",
  "/img/image_selector/cinema.jpeg",
  "/img/image_selector/food.jpeg",
  "/img/image_selector/game.jpeg",
  "/img/image_selector/hotel.jpeg",
  "/img/image_selector/hune.jpeg",
  "/img/image_selector/kouya.jpeg",
  "/img/image_selector/mountain.jpeg",
  "/img/image_selector/musium.jpeg",
  "/img/image_selector/onsen.jpeg",
  "/img/image_selector/park.jpeg",
  "/img/image_selector/parking.jpeg",
  "/img/image_selector/plane.jpeg",
  "/img/image_selector/restaurant.jpeg",
  "/img/image_selector/river.jpeg",
  "/img/image_selector/sabaku.jpeg",
  "/img/image_selector/school.jpeg",
  "/img/image_selector/shine.jpeg",
  "/img/image_selector/shop.jpeg",
  "/img/image_selector/snow.jpeg",
  "/img/image_selector/stadium.jpeg",
  "/img/image_selector/station.jpeg",
  "/img/image_selector/yuenchi.jpeg",
];

export default function ImageSelector({
  anchorEl,
  handleClose,
  name,
  onSelect,
}: ImageSelectorProps) {
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="right-start"
        open={!!anchorEl}>
        <ModalContent closeModal={handleClose}>
          <ModalTitle>画像を選択</ModalTitle>
          <div className="grid grid-cols-3 gap-4 p-4">
            {IMAGES.map((src) => (
              <div
                key={src}
                className="relative cursor-pointer aspect-video"
                onClick={() => {
                  if (onSelect) {
                    onSelect(src);
                  } else {
                    const event = new CustomEvent("imageSelected", {
                      detail: { name, src },
                    });
                    window.dispatchEvent(event);
                  }
                  handleClose();
                }}>
                <Image
                  src={src}
                  fill
                  alt="選択可能な画像"
                  className="object-cover rounded-lg hover:scale-101 hover:shadow-md transition-all"
                />
              </div>
            ))}
          </div>
        </ModalContent>
      </Popover>
    </>
  );
}
