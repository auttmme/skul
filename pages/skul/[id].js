import {
  FormLabel,
  Input,
  Text,
  Box,
  Button,
  Select,
  Flex,
  useToast,
} from "@chakra-ui/react";
import schoolLevel, { schoolType } from "constants/school";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Area from "pages/api/json/area.json";

function Details() {
  const router = useRouter();
  const toast = useToast();
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
  const [city, setCity] = useState("");
  const [isUpdate, setIsUpdated] = useState(false);

  const area = Area?.area;

  useEffect(() => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
    );

    store.read("Sheet1", { search: { id: id } }).then((data) => {
      setData(data);
      return data.forEach((d) => {
        setSchoolName(d.name);
        setType(d.type);
        setLevel(d.level);
        setSchoolAddress(d.address);
        setProvince(d.province);
        setCity(d.city);
      });
    });

    if (isUpdate)
      toast({
        position: "top-right",
        title: "Data Updated Successfully",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
  }, [isUpdate]);

  const onSubmit = () => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
    );

    store
      .edit("Sheet1", {
        search: { id: id },
        set: {
          name: schoolName,
          type: type,
          address: schoolAddress,
          city: city,
          province: province,
          level: level,
        },
      })
      .then((res) => res && setIsUpdated(true));
  };

  const renderProvinces = area.map((a) => (
    <option value={a.province} key={a.index}>
      {a.province}
    </option>
  ));

  const renderCities = province
    ? area
        .find((item) => item.province === province)
        ?.cities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data && (
        <Flex paddingTop="20" justifyContent="center" alignItems="center">
          <Box width="6xl">
            <Box marginBottom="12px">
              <FormLabel htmlFor="school name">Nama Sekolah</FormLabel>
              <Input
                {...register("schoolName")}
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
                value={level}
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
                borderColor="gray.300"
                marginTop="1"
                value={type}
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
                borderColor="gray.300"
                marginTop="1"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                {renderProvinces}
              </Select>
            </Box>
            <Box marginBottom="12px">
              <FormLabel>Kota / Kabupaten</FormLabel>
              <Select
                {...register("City")}
                borderColor="gray.300"
                marginTop="1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {renderCities}
              </Select>
            </Box>
            <Box marginBottom="12px">
              <FormLabel>Alamat</FormLabel>
              <Input
                {...register("schoolAddress")}
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
            <Flex justifyContent="flex-end">
              <Button type="submit" isLoading={isSubmitting}>
                Save
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </form>
  );
}

export default Details;
