import * as yup from "yup"

export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const nodeTypes = [
  { value: "mesh", label: "Mesh (no router)" },
  { value: "hub", label: "Hub (router + radio)" },
];
// TODO convert these to stores
export const dataSchema = [
  {
    name: "Node Label",
    key: "nodeLabel",
    value: "",
    type: yup.string()
  },
  {
    name: "Node Type",
    key: "nodeType",
    value: "",
    type: yup
      .string()
      .oneOf([nodeTypes.map((t) => t.value)])
      .required()
  },
  {
    name: "Installer(s)",
    key: "installers",
    value: [],
    type: yup.array().of(yup.string().email()).required()
  },
  {
    name: "Latitude",
    key: "lat",
    value: 0,
    type: yup.number().moreThan(-90).lessThan(90).required()
  },
  {
    name: "Longitude",
    key: "long",
    value: 0,
    type: yup.number().moreThan(-90).lessThan(90).required()
  },
  {
    name: "Angle",
    key: "angle",
    value: 0,
    type: yup.number().moreThan(0).lessThan(360).required()
  },
  {
    name: "Device",
    key: "device",
    value: "",
    type: yup.string().required()
  },
];

export const formData = Object.fromEntries(dataSchema.map((item) => [item.key, item.value]));
export const formShape = Object.fromEntries(dataSchema.map((item) => [item.key, item.value]));