import { useGetAllFeatureQuery } from "../../Redux/feature/featureApi";
import { useGetFeatureSectionQuery } from "../../Redux/feature/featureSectionApi";

export default function Services() {
  const { data } = useGetAllFeatureQuery();
  const features = data?.data;

  const { data: section } = useGetFeatureSectionQuery();

  return (
    <section className="py-5 sm:py-8 bg-primary/5">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl text-primary font-bold text-center">
          {section?.data?.title || "Our Services"}
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
          {features?.map((feature) => (
            <div
              key={feature?._id}
              className="flex flex-col justify-center text-center"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                  feature?.icon
                }`}
                alt="feature"
                className="w-28 sm:w-40 rounded mx-auto"
              />

              <h2 className="mt-3 text-2xl text-primary font-semibold">
                {feature?.title}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#order"
            className="bg-primary text-base-100 px-4 py-2 rounded"
          >
            Click to order
          </a>
        </div>
      </div>
    </section>
  );
}
