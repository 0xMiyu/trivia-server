import Image from 'next/image';
import ReactModal from 'react-modal';

interface NewUserModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

function NewUserModal(props: NewUserModalProps) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={props.setIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(0.3rem)',
          zIndex: 10000,
        },
        content: {
          width: '60%',
          height: 'auto',
          margin: 'auto',
          backgroundColor: '#212121',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '2rem',
        },
      }}
    >
      <div className="flex text-center flex-col items-center justify-center h-full">
        <h2 className="text-xl md:text-3xl text-[#C5FB00] font-bold">
          What&apos;s all this about !?
        </h2>

        <p>
          Welcome to <span className="text-[#C5FB00]">Trivia Terroir!</span>
        </p>

        <h2 className="text-white text-lg md:text-2xl my-5 md:my-10">
          A New way to Explore DeFi!
        </h2>

        <Image
          className="w-28 h-28 md:w-36 md:h-36"
          src="/icons/clock.svg"
          width={180}
          height={180}
          alt="clock"
        />

        <p className="w-[60%]">
          Trivia Terroir provides you with a completely new way to explore and
          learn the world of DeFi with weekly quizzes that can help you Learn
          and Earn Simultaneously!
        </p>

        <div className="flex w-full justify-center space-x-8  my-10">
          <div className="w-[12%]"></div>
          <button className="connect-wallet">Tell me more!</button>
          <button onClick={props.setIsOpen} className="underline">
            Skip intro &gt;&gt;
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default NewUserModal;
