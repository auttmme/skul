import React, { useState } from "react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";

function FormData() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const jenjangSekolah = ["SD", "SMP", "SMA"];
  const jenisSekolah = ["Negeri", "Swasta"];

  return (
    <Flex paddingTop="20" justifyContent="center" alignItems="center">
      <Box width="6xl">
        <Box marginBottom="12px">
          <label>Nama Sekolah</label>
          <Input marginTop="1" borderColor="gray.300" />
        </Box>
        <Box marginBottom="12px">
          <label>Jenjang Sekolah</label>
          <Select
            placeholder="Pilih jenjang sekolah"
            borderColor="gray.300"
            marginTop="1"
          >
            {jenjangSekolah.map((jenjang, index) => (
              <option value={jenjang} key={index}>
                {jenjang}
              </option>
            ))}
          </Select>
        </Box>
        <Box marginBottom="12px" marginTop="1">
          <label>Jenis Sekolah</label>
          <Select
            placeholder="Pilih jenis sekolah"
            borderColor="gray.300"
            marginTop="1"
          >
            {jenisSekolah.map((jenis) => (
              <option value={jenis}>{jenis}</option>
            ))}
          </Select>
        </Box>
        <Box marginBottom="12px">
          <label>Provinsi</label>
          <Select
            placeholder="Pilih Provinsi"
            borderColor="gray.300"
            marginTop="1"
          ></Select>
        </Box>
        <Box marginBottom="12px">
          <label>Kecamatan</label>
          <Select
            placeholder="Pilih Kecamatan"
            borderColor="gray.300"
            marginTop="1"
          ></Select>
        </Box>
        <Box marginBottom="12px">
          <label>Alamat</label>
          <Input borderColor="gray.300" marginTop="1" />
        </Box>
        <Flex justifyContent={"space-between"}>
          <Button>Delete</Button>
          <Button>Save</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FormData;
