import { FormLabel, Input, Text, Box, Button, Select } from "@chakra-ui/react";
import { schoolType } from "constants/school";
import { useRouter } from "next/router";
import InputData from "pages/inputData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Area from "pages/api/json/area.json";

function Details() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [data, setData] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [province, setProvince] = useState("");

  const area = Area?.area;

  console.log("school name", schoolName);

  useEffect(() => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
    );

    store.read("Sheet1", { search: { id: id } }).then((data) => {
      console.log(data);
      setData(data);
      return data.forEach((d) => {
        setSchoolName(d.name);
        setType(d.type);
        setSchoolAddress(d.address);
        setProvince(d.province);
      });
    });
  }, []);

  const onSubmit = () => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
    );

    store
      .edit("Sheet1", {
        search: { id: id },
        set: { name: schoolName, address: schoolAddress },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const filterProvince = () => {
    const arrArea = area.filter((val) => val.province === province);
    console.log("arrArea", arrArea[0]?.province);
    return arrArea[0]?.province;
  };

  const filterCities = () => {
    const filteredBooks = books.filter((val) =>
      val.areas.includes(filterValue)
    );
  };

  const provinces = area.map((a) => (
    <option value={a.province} key={a.index}>
      {a.province}
    </option>
  ));

  // console.log(id);
  // console.log(data);
  console.log("area", Area);
  console.log("filterprov", filterProvince());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map((d) => (
        <div>
          <Box marginBottom="12px" width="50%">
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
          {/* <Box marginBottom="12px">
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
          </Box> */}
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
              value={type}
            >
              {schoolType.map((jenis) => (
                <option value={jenis}>{jenis}</option>
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
              // onChange={handleProvinceChange}
              value={filterProvince()}
            >
              {provinces}
            </Select>
          </Box>
          <p>KOTA: {d.city}</p>
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
        </div>
      ))}
      <Button type="submit">Save</Button>
    </form>
  );
}

export default Details;
