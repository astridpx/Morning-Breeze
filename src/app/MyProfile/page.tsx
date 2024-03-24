"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNumberFormatter } from "@/hooks/USeNumberFormat";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/assets/avatar/1.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarangaysOfCities } from "@/utils/Brgy-Lists/Barangays";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  CustomerProfile,
  CustomerChangePassword,
  UpdateDetails,
} from "./services/api";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function MyProfilePage() {
  const { user, setUser } = UserStore();
  const queryClient = useQueryClient();
  const formatNumber = useNumberFormatter();
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    brgy: "",
  });
  const [password, setPassword] = useState({
    accId: user._id,
    currentPass: "",
    password: "",
    cpassword: "",
  });

  const [brgy, setBrgy] = useState<any>();
  const {
    isLoading,
    data: customerProfile,
    isSuccess,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => CustomerProfile({ customerId: user._id }),
  });

  useEffect(() => {
    const brgy = BarangaysOfCities.find(
      (cityData) => cityData.city === data.city
    );

    setBrgy(brgy);
  }, [data.city]);

  // HANDLE EDIT INFO SUBMIT
  const EditProfileSubmit = useMutation({
    mutationFn: async () => await UpdateDetails({ ...data }, user._id),
    onMutate: () => {
      LoadingToast("Updating profile...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      DissmissToast();
      SuccessToast(data?.message);
      setUser(data?.updated_data);
      setData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        street: "",
        city: "",
        brgy: "",
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await EditProfileSubmit.mutateAsync();
  };

  // Handle PASSWORD SUBMIT
  const PasswordChangeSubmit = useMutation({
    mutationFn: () => CustomerChangePassword({ ...password }, user._id),
    onMutate: () => {
      LoadingToast("Updating password...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      DissmissToast();
      SuccessToast(data?.message);
      setPassword({
        accId: user._id,
        currentPass: "",
        password: "",
        cpassword: "",
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(password);
    await PasswordChangeSubmit.mutateAsync();
  };

  return (
    <>
      <PageWrapper>
        <div className="relative">
          <section className="border-2 rounded-md bg-white p-4 flex space-x-4">
            <Avatar className="rounded-sm w-36 h-auto">
              <AvatarImage src={Profile.src} alt="@customer" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h5 className="font-bold text-xl text-slate-800 ">
                {isLoading
                  ? "Loading..."
                  : `${customerProfile[0]?.customer?.first_name} ${customerProfile[0]?.customer?.last_name}`}
              </h5>

              <div className="flex space-x-4 text-slate-400 text-sm font-medium ">
                <p className="flex space-x-1 items-center">
                  <FaUserCircle size={18} /> <span>Guest</span>
                </p>
                <p className="flex space-x-1 items-center">
                  <MdLocationOn size={18} />{" "}
                  <span>
                    {isLoading
                      ? "Loading..."
                      : `${customerProfile[0]?.customer?.brgy}, ${customerProfile[0]?.customer?.city} Laguna`}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-x-4 pt-6 text-slate-800">
                <div className="border rounded py-1 px-2 space-y-1">
                  <p className="font-medium flex items-center gap-x-2 justify-center  ">
                    <span>
                      <IoArrowUpSharp size={15} className="text-green-600" />
                    </span>
                    ₱{formatNumber(10000)}
                  </p>
                  <p className="font-medium text-sm text-slate-400 ">
                    Total Cost
                  </p>
                </div>

                <div className="border rounded py-1 px-2 space-y-1">
                  <p className="font-medium flex items-center gap-x-2 justify-center  ">
                    <span>
                      <IoArrowDownSharp size={15} className="text-red-500" />
                    </span>
                    ₱{formatNumber(10344000)}
                  </p>
                  <p className="font-medium text-sm text-slate-400 ">
                    Total Unpaids
                  </p>
                </div>

                <div className="border rounded py-1 px-2 space-y-1 text-center">
                  <p className="font-medium flex items-center gap-x-2 justify-center  ">
                    {isLoading
                      ? "Loading..."
                      : customerProfile[0]?.customer?.borrowed_gal?.length < 10
                      ? "0" + customerProfile[0]?.customer?.borrowed_gal?.length
                      : customerProfile[0]?.customer?.borrowed_gal?.length}
                  </p>
                  <p className="font-medium text-sm text-slate-400 ">
                    Borrowed
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-2 rounded-md bg-white mt-2">
            <div className="flex gap-x-2 ">
              <div
                className={`cursor-pointer p-2 flex text-center ${
                  tab === "overview" && "select_center"
                }`}
                onClick={() => setTab("overview")}
              >
                <h5>Overview</h5>
              </div>
              <div
                className={`cursor-pointer p-2 flex text-center ${
                  tab === "editinfo" && "select_center"
                }`}
                onClick={() => setTab("editinfo")}
              >
                <h5>Edit Info</h5>
              </div>
              <div
                className={`cursor-pointer p-2 flex text-center ${
                  tab === "password" && "select_center"
                }`}
                onClick={() => setTab("password")}
              >
                <h5>Change Password</h5>
              </div>
            </div>
            <Tabs value={tab} className="p-4 ">
              <TabsContent value="overview" className="flex gap-x-28 ">
                <div className="space-y-4 text-slate-400 font-medium">
                  <h6>Full Name</h6>
                  <h6>Email</h6>
                  <h6>Mobile</h6>
                  <h6>Address</h6>
                  <h6>Role</h6>
                </div>
                <div className="space-y-4 text-slate-800">
                  <p className="">
                    {isLoading
                      ? "Loading..."
                      : `${customerProfile[0]?.customer?.first_name} ${customerProfile[0]?.customer?.last_name}`}
                  </p>
                  <p className="flex items-center gap-x-2">
                    {isLoading
                      ? "Loading..."
                      : customerProfile[0]?.customer?.email}
                    <span className="">
                      <BsPatchCheckFill size={18} className="text-blue-500" />
                    </span>
                  </p>
                  <p className="">
                    {isLoading
                      ? "Loading..."
                      : customerProfile[0]?.customer?.mobile1}
                  </p>
                  <p className="">
                    {isLoading
                      ? "Loading..."
                      : `${customerProfile[0]?.customer?.street} ${customerProfile[0]?.customer?.brgy}, ${customerProfile[0]?.customer?.city}, Laguna`}
                  </p>
                  <p className="">Guest</p>
                </div>
              </TabsContent>

              <TabsContent value="editinfo">
                <form
                  onSubmit={(e) => handleInfoSubmit(e)}
                  className="grid grid-cols-6 gap-4"
                >
                  <div className="col-span-3">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      name="first_name"
                      value={data.first_name}
                      placeholder="First Name"
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={data.last_name}
                      placeholder="Last Name"
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-3 relative">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={data.email}
                      placeholder="Email"
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <span className="absolute bottom-0 right-0 font-medium text-white cursor-pointer bg-blue-500 h-[2.5rem] rounded-e-md px-4 grid place-content-center items-center">
                      Verify
                    </span>
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={data.mobile}
                      placeholder="Mobile"
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      type="text"
                      id="street"
                      name="street"
                      value={data.street}
                      placeholder="Street"
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="city">City</Label>
                    <Select
                      required
                      value={data.city}
                      onValueChange={(e: any) =>
                        setData({
                          ...data,
                          city: e,
                        })
                      }
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Lists of Cities</SelectLabel>
                          {BarangaysOfCities.map((d) => {
                            return (
                              <SelectItem key={d.id} value={d.city}>
                                {d.city}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 ">
                    <Label htmlFor="brgy">Brgy</Label>
                    <Select
                      required
                      value={data.brgy}
                      disabled={data.city.length <= 1}
                      onValueChange={(e: any) =>
                        setData({
                          ...data,
                          brgy: e,
                        })
                      }
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select brgy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <ScrollArea className="h-40">
                            <SelectLabel>
                              Lists of Brgy&apos;s in{" "}
                              {data.city.length ? data.city : ""}
                            </SelectLabel>
                            {brgy?.barangays.map((d: any, index: number) => {
                              return (
                                <SelectItem key={index} value={d}>
                                  {d}
                                </SelectItem>
                              );
                            })}
                          </ScrollArea>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-full flex  justify-end space-x-4 ">
                    <Button
                      type="submit"
                      // disabled={PasswordChangeSubmit.isLoading}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="password">
                <form
                  action=""
                  className="grid grid-cols-3 gap-x-8 gap-y-4 "
                  onSubmit={(e) => handlePasswordSubmit(e)}
                >
                  <div>
                    <Label htmlFor="currentPass">Current Password</Label>
                    <Input
                      type="password"
                      id="currentPass"
                      name="currentPass"
                      required
                      value={password.currentPass}
                      placeholder="Current Password"
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={password.password}
                      placeholder="New Password"
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpassword">Confirm Password</Label>
                    <Input
                      type="password"
                      id="cpassword"
                      name="cpassword"
                      required
                      value={password.cpassword}
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-full flex items- justify-end space-x-4 relative">
                    <p className="text-blue-500 underline cursor-pointer text-[.8rem] absolute left-0 top-0">
                      Forgot Password?
                    </p>
                    <Button
                      type="submit"
                      disabled={PasswordChangeSubmit.isLoading}
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </PageWrapper>
    </>
  );
}
