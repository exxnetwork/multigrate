import React, { useState, useRef } from "react";
import Modal from "../components/Modal/MainModal";
import Button from "components/Button";
import SendIcon from "icons/SendIcon";
import { Close } from "@mui/icons-material";

interface ContactModalProps {
  isOpen: boolean;
  toggleContactModal: () => void;
}

const ContactModal = ({ isOpen, toggleContactModal }: ContactModalProps) => {
  const handleSubmit = (e: any) => e.preventDefault();

  return (
    <Modal
      backgroundColor="transparent"
      isOpen={isOpen}
      onDismiss={toggleContactModal}
      maxWidth={400}
      isFullWidth={true}
      noPadding={true}
    >
      <div className="flex justify-center items-center w-auto">
        <div className="w-full md:w-2/3 py-5 md:pt-8 lg:pt-12 md:pb-6 md:py-10 px-4 md:px-10 xl:w-1/2 bg-white dark:bg-dark4 rounded-2xl h-[82vh] xl:h-auto xl:max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-outfit font-semibold text-xl text-dark dark:text-grey">
                Need help?
              </h1>
              <h1 className="font-outfit font-normal text-sm text-dark dark:text-accent1 mt-3">
                Shoot us a mail and we’ll get back to in the shortest possible
                time
              </h1>
            </div>
            <button onClick={toggleContactModal}>
              <Close className="text-dark dark:text-accent1" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="pt-8 space-y-6">
            <div>
              <h1 className="font-outfit font-normal text-sm text-dark1 dark:text-accent1 text-opacity-50">
                Your Email
              </h1>

              <input
                type="text"
                placeholder="you@email.com"
                className="w-full h-14 flex rounded-2xl bg-accent1 mt-3 px-4 lg:px-6 font-outfit text-sm dark:bg-dark3 text-dark1 dark:text-accent1"
              />
            </div>
            <div>
              <h1 className="font-outfit font-normal text-sm text-dark1 dark:text-accent1 text-opacity-50">
                Your Message
              </h1>

              <div className="w-full mt-3 pt-7 pb-6 px-4 lg:px-6 rounded-2xl bg-accent1 dark:bg-dark3">
                <div className="flex items-center">
                  <h1 className="font-outfit font-normal text-base text-dark1 dark:text-accent1 text-opacity-50">
                    Subject:
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter subject here"
                    className="w-full h-full bg-transparent pl-3 font-outfit text-sm text-dark1 dark:text-accent1"
                  />
                </div>

                <textarea
                  placeholder="Type your message here"
                  className="w-full h-44 bg-transparent mt-8 outline-none font-outfit text-sm text-dark1 dark:text-accent1"
                />

                <Button
                  onClick={toggleContactModal}
                  className="mt-7 ml-auto gap-x-2"
                >
                  <>
                    {" "}
                    <h1 className="font-outfit font-bold text-base text-white">
                      Send
                    </h1>
                    <SendIcon />
                  </>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
