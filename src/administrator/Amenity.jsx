import React, { useEffect, useState } from "react";
import {
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  DeleteAmenity,
  GetAmenityById,
  SaveAmenity,
  UpdateAmenity,
  updateNavigation,
} from "../redux/features/user/userSlice";
import Loading from "./component/Loading";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertMessage } from "../components/message";
import ConfirmationModal from "./component/ConfirmationModal";

const Amenities = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { id } = useParams();
  const [isModalReportOpen, setIsModalReporOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNavigation("Property Management - Amenity"));
    onLoadFetchData();
  }, []);

  const handleCloseRModal = () => {
    setIsModalReporOpen(false);
  };

  const onLoadFetchData = async () => {
    setLoading(true);
    let param = {
      id: id,
    };
    let res = await dispatch(GetAmenityById(param));
    if (res.meta.requestStatus === "fulfilled") {
      setNames(res?.payload);
      console.log(res.payload)
    } else if (res.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
    setLoading(false);
  };

  const addName = async () => {
    setLoading(true);
    let parameter = {
      data: {
        propertyId: id,
        name: newName,
      },
    };
    let res = await dispatch(SaveAmenity(parameter));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Amenity successfully added.");
    } else if (res.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
    setLoading(false);
    setNewName("");
    onLoadFetchData();
  };

  const updateName = async (objectValue) => {
    console.log(objectValue)
    let parameter = {
      data: {
        propertyId: objectValue.PropertyId,
        name: editingName,
        apropertyAmenityId: objectValue.ApropertyAmenityId,
      },
      id: objectValue.ApropertyAmenityId,
    };
    let res = await dispatch(UpdateAmenity(parameter));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Amenity successfully updated.");
    } else if (res.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
    setLoading(false);
    setEditingIndex(null);
    setEditingName("");
    onLoadFetchData();
  };

  const deleteNameAPI = async () => {
    let parameter = {
      id: idToDelete,
    };

    let res = await dispatch(DeleteAmenity(parameter));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Amenity successfully deleted.");
    } else if (res.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
    setLoading(false);
    setEditingIndex(null);
    onLoadFetchData();
  };

  const deleteName = (index) => {
    setIsModalReporOpen(true);
    setIdToDelete(index.ApropertyAmenityId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const editMode = (index, name) => {
    setEditingIndex(index);
    setEditingName(name.Name);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingName("");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredNames = names?.filter((name) =>
    name.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNames.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNames.length / itemsPerPage);

  return (
    <div className="mx-auto mt-2 p-5">
      <div className="mb-4">
        <Input
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for Code / Name"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left side: Input section */}
        <div className="w-full md:w-1/2">
          <div className="mb-4 flex items-end gap-2">
            <div className="flex-grow">
              <label
                htmlFor="newName"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Add Inclusion
              </label>
              <Textarea
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
                className="w-full h-24 px-3 py-2 text-base placeholder-gray-300 border border-black-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2 bg-yellow-600 text-black shadow-sm hover:bg-yellow-700"
              size="sm"
              onClick={addName}
            >
              <HiOutlinePlus strokeWidth={2} className="h-4 w-8" /> Add
              Amenity
            </Button>
          </div>
        </div>

        {/* Right side: Table section */}
        <div className="w-full md:w-1/2">
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Amenity
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((name, index) => {
                    const isLast = index === currentItems.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={indexOfFirstItem + index}>
                        <td className={classes}>
                          {editingIndex === indexOfFirstItem + index ? (
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="border p-2"
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name.Name}
                            </Typography>
                          )}
                        </td>
                        <td className={classes}>
                          {editingIndex === indexOfFirstItem + index ? (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => updateName(name)}
                                className="bg-green-500 text-white p-2 rounded"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={cancelEdit}
                                className="bg-red-500 text-white p-2 rounded"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Tooltip content="Edit Name">
                                <IconButton
                                  variant="text"
                                  onClick={() =>
                                    editMode(indexOfFirstItem + index, name)
                                  }
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Name">
                                <IconButton
                                  variant="text"
                                  onClick={() => deleteName(name)}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        No data available
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <Button
                className="mx-1"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, pageIndex) => (
                <Button
                  key={pageIndex + 1}
                  className={`mx-1 ${
                    currentPage === pageIndex + 1 ? "bg-gray-300" : ""
                  }`}
                  onClick={() => paginate(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </Button>
              ))}
              <Button
                className="mx-1"
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </CardBody>
        </div>
      </div>
      <Loading isLoading={loading} />
      <AlertMessage />
      <ConfirmationModal
        isOpen={isModalReportOpen}
        onClose={handleCloseRModal}
        deleteApi={deleteNameAPI}
      />
    </div>
  );
};

export default Amenities;
