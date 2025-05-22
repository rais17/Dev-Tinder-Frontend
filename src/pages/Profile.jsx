import React, { useEffect, useState } from "react";
import {
  useGetCurrentUserProfileQuery,
  useUpdateCurrentUserProfileMutation,
} from "../services/api/profileApi";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import Dropdown from "../components/Dropdown";
import InputField from "../components/InputField";
import { showAlert } from "../store/alertSlice";
import MultipleInputField from "../components/MultipleInputField";
import { useDispatch } from "react-redux";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

const Profile = () => {
  const { data, isLoading, isError } = useGetCurrentUserProfileQuery();
  const [updateCurrentUserProfile] = useUpdateCurrentUserProfileMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    about: "",
    age: "",
    skills: [],
    phoneNumber: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (data?.response) {
      const response = data.response;
      setFormData({
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        gender: response.gender || "",
        about: response.about || "",
        age: response.age || "",
        skills: response.skills || [],
        phoneNumber: response.phoneNumber || "",
        photoUrl: response.photoUrl || "",
      });
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // TODO: VALIDATE DATA
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSelect(option, type) {
    setFormData((prevState) => ({
      ...prevState,
      [type]: option,
    }));
  }

  async function handleSubmit() {
    try {
      const response = await updateCurrentUserProfile(formData).unwrap();
      dispatch(showAlert({ message: "Successfully Updated", type: "success" }));
    } catch (err) {
      console.error(
        "Something Went Wrong While Updating Profile",
        err?.data?.message || err?.error
      );
      dispatch(
        showAlert({
          message:
            err?.data?.message ||
            err?.error ||
            "Something Went Wrong | Profile Update",
          type: "error",
        })
      );
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100dvh-64px)] gap-9">
      <div className="card w-96 bg-base-100 card-sm shadow-sm">
        <div className="card-body gap-3">
          <h2 className="card-title text-2xl">Profile</h2>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3.5">
              <InputField
                type="text"
                name="firstName"
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-3.5">
              <InputField
                type="number"
                name="age"
                label="Age"
                placeholder="23"
                value={formData.age}
                onChange={handleChange}
              />

              <InputField
                type="text"
                name="phoneNumber"
                label="Phone"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <MultipleInputField
              name="skills"
              label="Skills"
              placeholder="Choose Your Skills"
              onClick={handleSelect}
              options={formData.skills}
            />

            <div className="flex gap-3.5">
              <Dropdown
                name="gender"
                label="Gender"
                placeholder="Choose Your Gender"
                option={formData.gender}
                options={["Male", "Female", "Other"]}
                onSelect={handleSelect}
                className="w-1/2"
              />

              <InputField
                type="url"
                name="photoUrl"
                label="Photo Url"
                placeholder="https://via.placeholder.com/300x200"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-1/2"
              />
            </div>

            <Textarea
              placeholder="About"
              value={formData.about}
              onChange={handleChange}
              name="about"
            />
          </div>

          <Button
            className="w-1/2 flex place-items-center place-self-center"
            variant="btn-primary"
            text="Submit"
            submit={handleSubmit}
          />
        </div>
      </div>

      <UserCard item={formData} isLoggedInUser={true} />
    </div>
  );
};

export default Profile;
