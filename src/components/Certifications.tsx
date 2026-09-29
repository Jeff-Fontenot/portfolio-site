import SwiperBadges from "./SwiperBadges";
import { certifications } from "./certifications";

export default function Certifications() {
  return (
    <section className="pt-8 pb-14">
      <div className="text-center">
        <div className="flex justify-center">
          <SwiperBadges items={certifications} />
        </div>
      </div>
    </section>
  );
}
