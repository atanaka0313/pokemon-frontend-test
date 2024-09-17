import Image from "next/image";
import { cn } from "#/lib/utils";
import { Card } from "#/components/ui/card";
import { SkeletonImage, SkeletonText } from "#/components/Skeletons";
import { useRandomColor } from "#/hooks/useRandomColor";
import { Skeleton } from "./ui/skeleton";

type CardProps = React.ComponentProps<typeof Card> & {
  name: string;
  image?: string;
  weight?: number;
  height?: number;
  experience?: number;
  types?: { type: { name: string } }[];
};

export function PokemonCard({
  className,
  name,
  image,
  weight,
  height,
  experience,
  types,
  ...props
}: CardProps) {
  const borderColor = useRandomColor();
  const textColor = useRandomColor();

  return (
    <Card
      className={cn(
        "w-full rounded-lg border-8 bg-white p-4 shadow-lg",
        className,
      )}
      style={{ border: `8px solid ${borderColor}` }}
      {...props}
    >
      <Header name={name} textColor={textColor} />
      <ImageSection image={image} name={name} />
      <ContentSection name={name} types={types} image={image} />
      <FooterSection weight={weight} height={height} experience={experience} />
    </Card>
  );
}

const Header: React.FC<{ name: string; textColor: string }> = ({
  name,
  textColor,
}) => (
  <div className="mb-2 flex items-center justify-between">
    <div className="text-xl font-bold" style={{ color: textColor }}>
      {name}
    </div>
  </div>
);

const ImageSection: React.FC<{ image?: string; name: string }> = ({
  image,
  name,
}) => (
  <div className="flex h-48 items-center justify-center bg-gray-200">
    {image ? (
      <Image src={image} alt={name} width={150} height={150} />
    ) : (
      <SkeletonImage />
    )}
  </div>
);

const ContentSection: React.FC<{
  name: string;
  image?: string;
  types?: { type: { name: string } }[];
}> = ({ name, image, types }) => (
  <div className="mt-4">
    <div className="text-md mb-2 text-gray-500">
      {types && types.length ? (
        types.map((el) => el.type.name).join(", ")
      ) : (
        <Skeleton className="mb-2 h-4 w-1/2" />
      )}
    </div>
    <hr className="mb-2 border-gray-300" />
    <div className="text-sm">
      <p className="mb-2 font-bold">{name}</p>
      <div className="text-gray-600">
        {image ? (
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        ) : (
          <div className="flex flex-col">
            <SkeletonText />
            <SkeletonText />
          </div>
        )}
      </div>
    </div>
  </div>
);

const FooterSection: React.FC<{
  weight?: number;
  height?: number;
  experience?: number;
}> = ({ weight, height, experience }) => (
  <div className="mt-5 flex justify-between text-xs text-gray-500">
    <div>
      <p>
        <span className="font-bold">Weight:</span> {weight ?? "-"}
      </p>
      <p>
        <span className="font-bold">Height:</span> {height ?? "-"}
      </p>
    </div>
    <div>
      <p>
        <span className="font-bold">Experience:</span> {experience ?? "-"}
      </p>
    </div>
  </div>
);
