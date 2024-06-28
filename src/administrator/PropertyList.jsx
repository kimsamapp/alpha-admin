import { Fragment, useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  FlagIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
  GetAllProducts,
  GetAllProperty,
  updateNavigation,
} from "../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  BanknotesIcon,
  EyeSlashIcon,
  FolderPlusIcon,
  PencilIcon,
  PhotoIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PriceAdjustment from "./PropertyStatusModal";
import { AlertMessage } from "../components/message";
import {
  GetPropertyActivation,
  GetPropertyStatus,
  formatToPhilippineCurrency,
} from "../json/commons";
import RemovePropertyModal from "./RemovePropertyModal";
import PropertyStatusModal from "./PropertyStatusModal";
import PropertyActivationModal from "./PropertyActivationModal";

const TABLE_HEAD = [
  "Property Code",
  "Property Name",
  "Price",
  "Service Avail Type",
  // "Date Created",
  "Status",
  "Activation",
  "",
];

export function PropertyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sItem, setSItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSAdjustment, setOpenSAdjustment] = useState(false);
  const [openAAdjustment, setOpenAAdjustment] = useState(false);
  const [openStockAdjustmentModal, setOpenStockAdjustmentModal] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState([]);
  const itemsPerPage = 10;
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = list.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const modalToDisplay = (e, type, item) => {
    e.preventDefault();
    setSItem(item);
    if (type === 1) {
      setOpenSAdjustment(true);
    } else if (type === 3) {
      setOpenModal(true);
    } else if (type === 4) {
      navigate(`/property/management/form/${item.PropertyId}?type=2`);
    } else if (type === 10) {
      setOpenAAdjustment(true);
    } else if (type === 100) {
      navigate(`/property/management/upload/${item.PropertyId}`);
    }
    else if (type === 1000) {
      navigate(`/property/management/amenity/${item.PropertyId}`);
    }
    else if (type === 10000) {
      navigate(`/property/management/inclusion/${item.PropertyId}`);
    }
    
  };

  useEffect(() => {
    onLoadFetchData();
  }, []);

  const onLoadFetchData = async () => {
    dispatch(updateNavigation("Property Management"));
    GetAll();
  };

  const GetAll = async () => {
    let resultQ = await dispatch(GetAllProperty());
    if (resultQ.meta.requestStatus === "fulfilled") {
      console.log(resultQ.payload);
      setList(resultQ.payload);
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "" || e.target.value === null) {
      return onLoadFetchData();
    } else {
      const filteredItems = list.filter((item) =>
        item.Name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setList(filteredItems);
    }
  };

  return (
    <Fragment>
      <Card className="h-full w-full">
        {/* Card Header */}
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Property Management List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are the list of properties in our database.
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e)}
                  placeholder="Search for Code / Name"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              {/* <Button
                className="flex items-center gap-3 bg-yellow-600 text-black shadow-sm hover:bg-yellow-700"
                size="sm"
                onClick={() => downloadExcel()}
              >
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Download
              </Button> */}
            </div>
            <div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <Button
                  className="flex items-center gap-3 bg-yellow-600 text-black shadow-sm hover:bg-yellow-700"
                  size="sm"
                  onClick={() => navigate("/property/management/form/?type=1")}
                >
                  <HiOutlinePlus strokeWidth={2} className="h-4 w-4" /> Add
                  Property
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        {/* Card Body */}
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((Properties, index) => {
                const isLast = index === list.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={Properties.PropertyId}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {"PROPERTY-000" + Properties.PropertyId}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Properties.Name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatToPhilippineCurrency(Properties?.PriceAmount)}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={Properties.AheaderServices?.HeaderName}
                          color={"yellow"}
                        />
                      </div>
                    </td>

                    {/* <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(Properties.DateCreated).toLocaleString(
                          "lookup"
                        )}
                      </Typography>
                    </td> */}

                    <td className={classes}>
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={GetPropertyStatus(Properties?.IsStatus)}
                        color={Properties.IsStatus === 1 ? "green" : "red"}
                      />
                    </td>

                    <td className={classes}>
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={GetPropertyActivation(Properties?.IsActive)}
                        color={Properties.IsActive === 1 ? "red" : "green"}
                      />
                    </td>

                    <td className={classes}>
                      <Tooltip content="View Property">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 1, Properties)}
                        >
                          <EyeSlashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Property Image">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 100, Properties)}
                        >
                          <PhotoIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Edit Property">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 4, Properties)}
                        >
                          <PencilIcon className="h-4 w-4 " />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Remove Property">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 3, Properties)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Update Property Status">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 1, Properties)}
                        >
                          <FlagIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Amenities">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 1000, Properties)}
                        >
                          <FolderPlusIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Inclusions">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 10000, Properties)}
                        >
                          <FolderPlusIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Activation Property">
                        <IconButton
                          variant="text"
                          onClick={(e) => modalToDisplay(e, 10, Properties)}
                        >
                          <StarIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <IconButton
                key={index}
                variant={currentPage === index + 1 ? "outlined" : "text"}
                size="sm"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      <PropertyStatusModal
        setOpen={setOpenSAdjustment}
        open={openSAdjustment}
        sItem={sItem}
        setSItem={setSItem}
        onLoadFetchData={onLoadFetchData}
      />
      <PropertyActivationModal
        setOpen={setOpenAAdjustment}
        open={openAAdjustment}
        sItem={sItem}
        setSItem={setSItem}
        onLoadFetchData={onLoadFetchData}
      />
      <RemovePropertyModal
        setOpen={setOpenModal}
        open={openModal}
        sItem={sItem}
        setSItem={setSItem}
        onLoadFetchData={onLoadFetchData}
      />
      <AlertMessage />
    </Fragment>
  );
}
