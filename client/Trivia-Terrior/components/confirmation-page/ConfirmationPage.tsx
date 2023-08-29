import Image from 'next/image';
import BG from '../../public/bg/success.png';

function ConfirmationPage() {
  return (
    <div className="w-full relative md:w-[70%] mx-auto px-6 md:px-10 h-[28rem] md:h-[32rem] flex flex-col justify-between text-center">
      <div className="my-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white">You Rock!</h1>

        <p className="my-2">
          You are in the game!{' '}
          <span className="text-[#C5FB00]">Go grab that pot!</span>
        </p>
      </div>

      <div className="h-[50%] relative flex flex-col-reverse">
        <Image
          className="-z-10 absolute top-34 md:-top-32"
          src={BG}
          alt="Success"
          placeholder="blur"
        />

        <p className="font-light text-[#C5FB00]">
          Note: Don&apos;t forget to join the server to automatically get your
          role for this week&apos;s game!
        </p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
