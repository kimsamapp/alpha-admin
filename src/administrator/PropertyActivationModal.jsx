import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  PriceAdjustmentofProduct,
  UpdateProperty,
  setTFetch,
} from "../redux/features/user/userSlice";
import { toast } from "react-toastify";
import StatusDropdown from "./component/StatusDropdown";

export default function PropertyActivationModal({
  open,
  setOpen,
  sItem,
  setSItem,
  onLoadFetchData,
}) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const STATUS_DROPDOWN = [
    { label: "Draft", value: 1 },
    { label: "Publish", value: 2 },
  ];

  const handleChangeOfItem = (e) => {
    const { name, value } = e.target;
    setSItem({ ...sItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let param = {
      id: sItem.PropertyId,
      data: {
        ...sItem,
      },
      token: null,
    };

    let resultQ = await dispatch(UpdateProperty(param));
    if (resultQ.meta.requestStatus === "fulfilled") {
      toast.success("Activation Adjustment successfully updated.");
      setSItem(null);
      setOpen(false);
      onLoadFetchData();
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
  };

  const closeBtn = (e) => {
    e.preventDefault();
    setSItem(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdjustment({ ...adjustment, [name]: value });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Activation Adjustment for {sItem?.Name}
                      </Dialog.Title>

                      <div className="mt-8 w-full">
                        <StatusDropdown
                          label="Update Activation"
                          name="IsActive"
                          options={STATUS_DROPDOWN}
                          value={sItem?.IsActive}
                          onChange={handleChangeOfItem}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-700 sm:ml-3 sm:w-auto"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeBtn}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
