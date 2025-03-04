import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetFaqQuery } from "../../Redux/faq/faq";
import { useGetFaqSectionQuery } from "../../Redux/faq/faqSectionApi";

export default function FAQ() {
  const { data } = useGetFaqQuery();
  const { data: FaqSection } = useGetFaqSectionQuery();

  const faqs = data?.data;
  let section = FaqSection?.data?.title;

  const [toggleFAQ, setToggleFAQ] = useState(null);
  const handelToggleFAQ = (i) => {
    if (toggleFAQ === i) {
      return setToggleFAQ(null);
    }
    setToggleFAQ(i);
  };

  return (
    <div className="py-5">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl text-primary font-semibold text-center sm:w-3/4 mx-auto">
          {section}
        </h2>

        <div className="mt-6 sm:w-2/3 mx-auto">
          {faqs?.map((faq, i) => (
            <div key={i} className="mb-2">
              <button
                onClick={() => handelToggleFAQ(i)}
                className="w-full flex justify-between items-center p-4 bg-primary/30 font-semibold text-primary rounded text-sm sm:text-base text-start"
              >
                <p>{faq?.qus}</p>
                <span>
                  {toggleFAQ === i && "activeFAQ" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </button>

              {/* Content/Ans */}
              <div
                className={`text-justify text-primary duration-500 faq-content ${
                  toggleFAQ === i && "activeFAQ"
                }`}
              >
                <p className="pb-5 p-3 text-sm sm:text-base">{faq?.ans}</p>
              </div>
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
    </div>
  );
}
