import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import schoolLevel, { schoolType } from "constants/school";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

export default function FormData({ area }) {
  const SteinStore = require("stein-js-client");
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [schoolName, setSchoolName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [{ province, city }, setData] = useState({});
  const [schoolAddress, setSchoolAddress] = useState("");

  const provinces = area.map((a) => (
    <option value={a.province} key={a.index}>
      {a.province}
    </option>
  ));

  const cities = area
    .find((item) => item.province === province)
    ?.cities.map((city) => (
      <option value={city} key={city}>
        {city}
      </option>
    ));

  const handleProvinceChange = useCallback((e) => {
    setData(() => ({ city: "", province: e.target.value }));
  });

  const handleCityChange = useCallback((e) => {
    setData((data) => ({ ...data, city: e.target.value }));
  });

  function onSubmit(values) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve();
    //   }, 3000);
    // });
    store.append("Sheet1", [
      {
        id: uuid(),
        name: schoolName,
        type: type,
        address: schoolAddress,
        city: city,
        province: province,
      },
    ]);

    setSchoolName("");
    setLevel("");
    setType("");
    setData({});
    setSchoolAddress("");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex paddingTop="20" justifyContent="center" alignItems="center">
        <Box width="6xl">
          <Box marginBottom="12px">
            <FormLabel htmlFor="school name">Nama Sekolah</FormLabel>
            <Input
              {...register("schoolName", {
                required: "Nama sekolah wajib diisi",
              })}
              value={schoolName}
              placeholder="nama sekolah"
              marginTop="1"
              borderColor="gray.300"
              onChange={(e) => setSchoolName(e.target.value)}
            />
            {errors.schoolName && (
              <Text color="tomato" fontSize="sm">
                {errors.schoolName.message}
              </Text>
            )}
          </Box>
          <Box marginBottom="12px">
            <FormLabel>Jenjang Sekolah</FormLabel>
            <Select
              {...register("schoolLevel", {
                required: "Jenjang sekolah wajib dipilih",
              })}
              placeholder="Pilih jenjang sekolah"
              borderColor="gray.300"
              marginTop="1"
              onChange={(e) => setLevel(e.target.value)}
            >
              {schoolLevel.map((jenjang, index) => (
                <option value={jenjang} key={index}>
                  {jenjang}
                </option>
              ))}
            </Select>
            {errors.schoolLevel && (
              <Text color="tomato" fontSize="sm">
                {errors.schoolLevel.message}
              </Text>
            )}
          </Box>
          <Box marginBottom="12px" marginTop="1">
            <FormLabel>Jenis Sekolah</FormLabel>
            <Select
              {...register("schoolType", {
                required: "Jenis sekolah wajib dipilih",
              })}
              placeholder="Pilih jenis sekolah"
              borderColor="gray.300"
              marginTop="1"
              onChange={(e) => setType(e.target.value)}
            >
              {schoolType.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </Select>
            {errors.schoolType && (
              <Text color="tomato" fontSize="sm">
                {errors.schoolType.message}
              </Text>
            )}
          </Box>
          <Box marginBottom="12px">
            <FormLabel>Provinsi</FormLabel>
            <Select
              {...register("Province")}
              placeholder="Pilih Provinsi"
              borderColor="gray.300"
              marginTop="1"
              onChange={handleProvinceChange}
            >
              {provinces}
            </Select>
          </Box>
          <Box marginBottom="12px">
            <FormLabel>Kota / Kabupaten</FormLabel>
            <Select
              {...register("City")}
              placeholder="Pilih Kota / Kabupaten"
              borderColor="gray.300"
              marginTop="1"
              onChange={handleCityChange}
            >
              {cities}
            </Select>
          </Box>
          <Box marginBottom="12px">
            <FormLabel>Alamat</FormLabel>
            <Input
              {...register("schoolAddress", {
                required: "Alamat sekolah wajib diisi",
              })}
              placeholder="alamat sekolah"
              borderColor="gray.300"
              marginTop="1"
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
            />
            {errors.schoolAddress && (
              <Text color="tomato" fontSize="sm">
                {errors.schoolAddress.message}
              </Text>
            )}
          </Box>
          <Flex justifyContent="space-between">
            <Button>Delete</Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  );
}
