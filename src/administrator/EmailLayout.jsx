import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllContacts, updateNavigation } from "../redux/features/user/userSlice";
import {
  InboxIcon,
  DevicePhoneMobileIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { AlertMessage } from "../components/message";

const EmailLayout = () => {
  const dispatch = useDispatch();
  const [emailM, setEmailM] = useState([]);
  const [activeEmail, setActiveEmail] = useState(null);
  const [viewedEmails, setViewedEmails] = useState([]);

  useEffect(() => {
    onLoadFetch();
  }, []);

  const onLoadFetch = async() => {
    // fetch email data from API
    const resultQ = await dispatch(GetAllContacts());
    if (resultQ.meta.requestStatus === "fulfilled") {
      setEmailM(resultQ.payload);
      console.log(resultQ.payload);
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
  }


  const handleEmailClick = (email) => {
    setActiveEmail(email);
    if (!viewedEmails.includes(email.AcontactUsId)) {
      setViewedEmails([...viewedEmails, email.AcontactUsId]);
    }
  };

  useEffect(() => {
    dispatch(updateNavigation("Inquiries"));
  }, []);

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      {/* <aside className="w-full lg:w-1/4 bg-gray-100 p-4 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4">Folders</h2>
        <ul>
          <li className="py-2">
            <a href="#" className="text-gray-700">
              Inbox
            </a>
          </li>
        </ul>
      </aside> */}

      {/* Email List */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <section className="w-full lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-bold p-4 border-b border-gray-200">
            Mailbox
          </h2>
          <ul>
            {emailM.map((email) => (
              <li
                key={email.AcontactUsId}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  !viewedEmails.includes(email.AcontactUsId) ? "font-bold" : ""
                }`}
                onClick={() => handleEmailClick(email)}
              >
                <a href="#" className="block">
                  <h3
                    className={`flex justify-between ${
                      !viewedEmails.includes(email.AcontactUsId)
                        ? "text-black"
                        : "text-gray-700"
                    }`}
                  >
                    {`Contact Us Service Type: ${email.AheaderServices?.HeaderName} `}
                    {!viewedEmails.includes(email.AcontactUsId) && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {`a message from ${email.Name}`}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Email Content */}
        <section className="flex-1 bg-white overflow-y-auto">
          {activeEmail ? (
            <div className="p-4 animate-fade-in">
              <div className="flex items-center mb-4">
                <ClipboardDocumentIcon className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-bold">{`Contact Us Service Type: ${activeEmail.AheaderServices?.HeaderName} `}</h2>
              </div>
              <div className="flex items-center mb-4">
                <InboxIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-lg font-bold">{activeEmail.EmailAddress}</p>
              </div>
              <div className="flex items-center mb-4">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-md font-bold">{activeEmail.ContactUsNumber}</p>
              </div>
              <div className="flex items-center mb-4">
              <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-md font-bold">
                  {activeEmail.AheaderServices?.HeaderName}
              </p>
              </div>
              <p className="text-gray-700 mb-4">{activeEmail.MessageContext}</p>
              {/* Add more content as needed */}
            </div>
          ) : (
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Email Content</h2>
              <p className="text-gray-700 mb-4">
                Select an email to view its content.
              </p>
            </div>
          )}
        </section>
      </main>
      <AlertMessage />
    </div>
  );
};

export default EmailLayout;
