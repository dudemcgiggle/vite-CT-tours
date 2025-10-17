import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

type MeetingPointProps = {
  addressLine1: string; // e.g., "Sands Space History Center parking area"
  addressLine2?: string; // e.g., "100 Space Port Way, Cape Canaveral, FL"
  note?: string;         // e.g., "Located immediately right of guard lanes..."
  mapsUrl: string;       // full maps link
};

export default function MeetingPoint({
  addressLine1,
  addressLine2,
  note,
  mapsUrl
}: MeetingPointProps) {
  return (
    <section
      aria-label="Meeting point"
      className="
        mt-3
        grid
        grid-rows-[auto_auto_1fr]
        gap-2
        min-h-[180px]
      "
    >
      {/* Row 1: title + directions button */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium tracking-tight flex items-center gap-2">
          <MapPin className="size-4" aria-hidden="true" />
          <span>Meeting Point</span>
        </h4>

        <Button
          asChild
          variant="secondary"
          size="sm"
          className="shrink-0 whitespace-nowrap"
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Navigation className="size-3" aria-hidden="true" />
            Get Directions
          </a>
        </Button>
      </div>

      {/* Row 2: address (2 lines max, always present) */}
      <div className="text-sm leading-6">
        <div>{addressLine1}</div>
        {addressLine2 ? <div>{addressLine2}</div> : null}
      </div>

      {/* Row 3: location note, clamped to keep height consistent */}
      {note ? (
        <p className="text-xs leading-5 opacity-90 line-clamp-3">
          {note}
        </p>
      ) : (
        <div /> /* preserve the row so height stays identical even without note */
      )}
    </section>
  );
}