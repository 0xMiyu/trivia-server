import AccordianFAQ from './AccordianFAQ';

function FAQSection() {
  return (
    <div className="my-20 flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-[40%]">
        <h2 className="text-white text-3xl md:text-5xl font-bold">FAQ.</h2>

        <p className="text-base md:text-lg my-4">
          Here are the answers to the questions that may be wandering in your
          mind. Didn&apos;t find it? Send us a message!
        </p>

        <button className="connect-wallet">Contact Us!</button>
      </div>

      <div className="w-full md:w-[50%] mt-4 md:mt-0">
        <AccordianFAQ />
      </div>
    </div>
  );
}

export default FAQSection;
